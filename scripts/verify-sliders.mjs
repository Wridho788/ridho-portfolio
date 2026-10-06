// Uses the same static-preview / dedicated-Chrome setup as verify-motion.mjs.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const base = process.env.MOTION_BASE_URL || 'http://127.0.0.1:4173';
const debug = process.env.CDP_URL || 'http://127.0.0.1:9222';
const info = await fetch(`${debug}/json/version`).then(response => response.json());
const socket = new WebSocket(info.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  clearTimeout(request.timer);
  if (message.error) request.reject(new Error(JSON.stringify(message.error)));
  else request.resolve(message.result);
});
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
  const id = ++sequence;
  const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 20000);
  pending.set(id, { resolve, reject, timer });
  socket.send(JSON.stringify({ id, method, params, sessionId }));
});
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const cdp = (method, params) => send(method, params, sessionId);
const evaluate = async expression => {
  const result = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const waitFor = async expression => {
  for (let i = 0; i < 150; i++) {
    try { if (await evaluate(expression)) return; } catch { /* Document may be navigating. */ }
    await pause(100);
  }
  throw new Error(`Condition not reached: ${expression}`);
};
const viewport = width => cdp('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: width < 768 });
const region = label => `document.querySelector('.mobile-slider[aria-label="${label}"]')`;
const track = label => `${region(label)}.querySelector('.mobile-slider-track')`;
const status = label => `${region(label)}.querySelector('[role="status"]').textContent`;
const key = async name => {
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: name });
  await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: name });
};
const scrollTo = async label => {
  await evaluate(`window.scrollTo({top:${track(label)}.getBoundingClientRect().top+scrollY-110,behavior:'instant'})`);
};
const swipeLeft = async () => {
  await cdp('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y: 240 }] });
  for (const x of [260, 220, 180, 140, 100, 60]) {
    await cdp('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: 240 }] });
    await pause(40);
  }
  await cdp('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};
const screenshot = async (label, filename) => {
  const clip = await evaluate(`(() => { const r=${region(label)}.getBoundingClientRect();return {x:10,y:r.top+scrollY-5,width:innerWidth-20,height:r.height+10,scale:1}; })()`);
  const { data } = await cdp('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
  await writeFile(`preview-sliders-${filename}.png`, Buffer.from(data, 'base64'));
};

try {
  await cdp('Page.enable');
  await cdp('Page.bringToFront');
  await cdp('Runtime.enable');
  await viewport(390);
  await cdp('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await cdp('Page.navigate', { url: base });
  await waitFor("document.querySelectorAll('.slider-controls button').length === 6");
  const expected = [['Selected work', 9], ['Capabilities', 3], ['Writing', 5]];
  // Writing stays a slider on desktop too; the others become grids from 768px.
  const alwaysSliders = ['Writing'];
  for (const [label, count] of expected) {
    await scrollTo(label);
    assert.equal(await evaluate(`${track(label)}.children.length`), count, `${label}: all content is retained`);
    assert.equal(await evaluate(`${region(label)}.querySelector('button').disabled`), true);
    const size = await evaluate(`(() => {const r=${track(label)}; const c=r.children[0]; return {rail:r.clientWidth,card:c.getBoundingClientRect().width,overflow:r.scrollWidth>r.clientWidth};})()`);
    assert.ok(size.overflow && size.card < size.rail, `${label}: next card peeks into view`);
    await evaluate(`${region(label)}.querySelector('button:last-child').click()`);
    await waitFor(`${status(label)}.includes('item 2 of ${count}')`);
    await pause(650);
    await screenshot(label, label.toLowerCase().replaceAll(' ', '-'));
    await evaluate(`${track(label)}.focus()`);
    await key('End');
    await waitFor(`${status(label)}.includes('item ${count} of ${count}')`);
    assert.equal(await evaluate(`${region(label)}.querySelector('button:last-child').disabled`), true);
    await key('Home');
    await waitFor(`${status(label)}.includes('item 1 of ${count}')`);
    await key('ArrowRight');
    await waitFor(`${status(label)}.includes('item 2 of ${count}')`);
    await key('Home');
    await waitFor(`${status(label)}.includes('item 1 of ${count}')`);
    console.log(`PASS: ${label} buttons, position, keyboard and boundaries`);
  }

  // A real touch gesture, not a programmatic scroll, proves swipe support.
  await scrollTo('Capabilities');
  await pause(650);
  await swipeLeft();
  await waitFor(`${status('Capabilities')}.includes('item 2 of 3')`);
  assert.ok(await evaluate(`${status('Selected work')}.includes('item 1 of 9')`), 'Sliders move independently');
  await pause(650);
  const settled = await evaluate(`${track('Capabilities')}.scrollLeft`);
  await pause(1000);
  assert.ok(Math.abs(await evaluate(`${track('Capabilities')}.scrollLeft`) - settled) < 2, 'No autoplay');

  await scrollTo('Writing');
  await evaluate(`${track('Writing')}.children[1].querySelector('a').focus()`);
  await waitFor(`${status('Writing')}.includes('item 2 of 5')`);
  assert.ok(await evaluate("document.activeElement.getBoundingClientRect().left >= 0 && document.activeElement.getBoundingClientRect().right <= innerWidth"), 'Focused links are fully visible');

  for (const width of [320, 390, 767, 768, 1440]) {
    await viewport(width);
    await pause(250);
    assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `No page overflow at ${width}px`);
    for (const [label] of expected) {
      if (width < 768) assert.ok(await evaluate(`${track(label)}.scrollWidth > ${track(label)}.clientWidth`));
      else if (alwaysSliders.includes(label)) {
        assert.ok(await evaluate(`${track(label)}.scrollWidth > ${track(label)}.clientWidth`), `${label}: desktop keeps its slider`);
        assert.notEqual(await evaluate(`getComputedStyle(${region(label)}.querySelector('.slider-controls')).display`), 'none', `${label}: desktop shows controls`);
      } else {
        assert.ok(await evaluate(`${track(label)}.scrollWidth <= ${track(label)}.clientWidth + 1`), `${label}: desktop is not clipped`);
        assert.equal(await evaluate(`getComputedStyle(${region(label)}.querySelector('.slider-controls')).display`), 'none');
      }
    }
    if (width >= 768) assert.equal(await evaluate(`getComputedStyle(${track('Capabilities')}).gridTemplateColumns.split(' ').length`), 3);
  }

  await viewport(390);
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await waitFor("document.querySelectorAll('.slider-controls button').length === 6");
  await evaluate(`${track('Capabilities')}.focus()`);
  await key('Home');
  await waitFor(`${status('Capabilities')}.includes('item 1 of 3')`);
  assert.ok(await evaluate(`(() => { ${region('Capabilities')}.querySelector('button:last-child').click();const t=${track('Capabilities')};return Math.abs(t.scrollLeft-(t.children[1].offsetLeft-t.children[0].offsetLeft))<2;})()`), 'Reduced motion moves instantly');
  console.log('Section heights at 390px:', await evaluate("['projects','skills','writing'].map(id=>({id,height:Math.round(document.getElementById(id).getBoundingClientRect().height)}))"));

  await cdp('Emulation.setScriptExecutionDisabled', { value: true });
  await cdp('Page.navigate', { url: `${base}/?sliders=no-js` });
  await waitFor("location.search === '?sliders=no-js' && document.readyState === 'complete'");
  assert.equal(await evaluate("document.querySelectorAll('.slider-controls button').length"), 0, 'No dead controls without JavaScript');
  await scrollTo('Capabilities');
  await swipeLeft();
  await waitFor(`${track('Capabilities')}.scrollLeft > 100`);
  assert.deepEqual(errors, [], 'No browser runtime errors');
  console.log('PASS: native swipe, independent controls, visible keyboard focus, responsive desktop layouts, reduced motion, no-JavaScript swipe, and no horizontal page overflow.');
} finally {
  await send('Target.closeTarget', { targetId });
  socket.close();
}
