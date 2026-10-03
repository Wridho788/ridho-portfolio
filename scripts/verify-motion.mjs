// Run against a static preview and a dedicated Chrome instance with CDP enabled.
// MOTION_BASE_URL defaults to http://127.0.0.1:4173; CDP_URL defaults to :9222.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const base = process.env.MOTION_BASE_URL || 'http://127.0.0.1:4173';
const debug = process.env.CDP_URL || 'http://127.0.0.1:9222';
const info = await fetch(`${debug}/json/version`).then((response) => response.json());
const socket = new WebSocket(info.webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  if (!message.id) return;
  const request = pending.get(message.id);
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
const evaluate = async (expression) => {
  const response = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
  return response.result.value;
};
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const waitFor = async (expression) => {
  for (let attempt = 0; attempt < 150; attempt++) {
    try { if (await evaluate(expression)) return; } catch { /* New document may be loading. */ }
    await pause(100);
  }
  throw new Error(`Condition not reached: ${expression}`);
};
const viewport = (width) => cdp('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
const scrollTo = async (selector) => {
  await evaluate(`window.scrollTo({top: document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().top + scrollY - 120, behavior:'instant'})`);
};
const screenshot = async (name) => {
  const { data } = await cdp('Page.captureScreenshot', { format: 'png' });
  await writeFile(`preview-motion-${name}.png`, Buffer.from(data, 'base64'));
};

try {
  await cdp('Page.enable');
  await cdp('Page.bringToFront');
  await cdp('Runtime.enable');
  await cdp('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__motionEvidence = { hero: [], revealed: [], transition: false, transitionAnimations: [] };
    document.addEventListener('animationstart', event => {
      if (event.animationName === 'hero-arrive') window.__motionEvidence.hero.push(event.target.className);
    });
    addEventListener('pagereveal', event => {
      window.__motionEvidence.transition = !!event.viewTransition;
      event.viewTransition?.ready.then(() => {
        window.__motionEvidence.transitionAnimations = document.getAnimations().map(animation => animation.animationName || '');
      }).catch(() => {});
    });
    const sample = () => {
      document.getAnimations().forEach(animation => {
        const target = animation.effect?.target;
        if (target?.matches('[data-reveal]')) {
          const label = target.closest('#contact') ? 'contact' : target.classList.contains('project-card') ? 'project' : 'heading';
          if (!window.__motionEvidence.revealed.includes(label)) window.__motionEvidence.revealed.push(label);
        }
      });
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  ` });
  await viewport(1440);
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await cdp('Page.navigate', { url: base });
  await waitFor("document.querySelector('.primary-navigation')?.dataset.hasActive !== undefined");
  await waitFor('window.__motionEvidence.hero.length === 6');
  await pause(1000);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('h1')).opacity"), '1');
  await screenshot('hero');

  // Changing the preference during a native transition must stop its motion too.
  await evaluate("document.startViewTransition(() => { document.body.dataset.motionCheck = 'active'; }).ready.then(() => true)");
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await pause(60);
  const inFlight = await evaluate("document.getAnimations().map(a => ({name:a.animationName || a.transitionProperty || 'WAAPI',duration:a.effect?.getTiming().duration}))");
  assert.deepEqual(inFlight, [], 'Enabling reduced motion stops an in-flight native transition');
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });

  await scrollTo('#projects');
  await waitFor("document.querySelector('.primary-navigation [aria-current]')?.textContent.trim() === 'Work'");
  await scrollTo('.project-card');
  await waitFor("window.__motionEvidence.revealed.includes('project')");
  await pause(600);
  const point = await evaluate("(() => { const b=document.querySelector('.project-card').getBoundingClientRect(); return {x:b.x+100,y:Math.max(100,b.y+100)}; })()");
  await cdp('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await pause(550);
  assert.notEqual(await evaluate("getComputedStyle(document.querySelector('.project-preview img')).transform"), 'none', 'Project image responds to hover');
  await screenshot('project');

  await scrollTo('#experience');
  await waitFor("document.querySelector('.primary-navigation [aria-current]')?.textContent.trim() === 'Experience'");
  const firstProgress = await evaluate("Number(document.querySelector('.experience-timeline').style.getPropertyValue('--timeline-progress'))");
  await scrollTo('.timeline-entry:last-child');
  await waitFor("document.querySelector('.timeline-entry:last-child').dataset.active === 'true'");
  const lastProgress = await evaluate("Number(document.querySelector('.experience-timeline').style.getPropertyValue('--timeline-progress'))");
  assert.ok(lastProgress > firstProgress, 'Timeline advances with scroll');
  await screenshot('timeline');

  await scrollTo('#contact');
  await waitFor("document.querySelector('.primary-navigation [aria-current]')?.textContent.trim() === 'Contact'");
  await waitFor("window.__motionEvidence.revealed.includes('contact')");
  await pause(550);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#contact')).backgroundColor"), 'rgb(23, 40, 50)');
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#contact a')).color"), 'rgb(23, 40, 50)');

  await scrollTo('.project-card');
  await pause(550);
  const nativeTransitions = await evaluate("'onpagereveal' in window && CSS.supports('view-transition-name', 'project-lapakbenz')");
  await evaluate("document.querySelector('.project-link').scrollIntoView({block:'center', behavior:'instant'})");
  await pause(550);
  const caseLink = await evaluate("(() => { const b=document.querySelector('.project-link').getBoundingClientRect(); return {x:b.x+b.width/2,y:b.y+b.height/2}; })()");
  await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...caseLink });
  await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...caseLink });
  await waitFor("location.pathname.startsWith('/case-studies/') && document.readyState === 'complete'");
  await waitFor("document.querySelector('.primary-navigation')?.dataset.hasActive === 'true'");
  if (nativeTransitions) {
    assert.equal(await evaluate('window.__motionEvidence.transition'), true, 'Native document transition runs');
    await waitFor("window.__motionEvidence.transitionAnimations.some(name => name.includes('project-lapakbenz'))");
  }
  assert.ok(await evaluate("getComputedStyle(document.querySelector('.project-preview')).viewTransitionName.startsWith('project-')"));
  await evaluate("document.querySelector('main a').click()");
  await waitFor("location.pathname === '/' && document.querySelector('.primary-navigation')?.dataset.hasActive !== undefined");

  await viewport(390);
  await waitFor("getComputedStyle(document.querySelector('.mobile-menu-toggle')).display !== 'none'");
  await evaluate("document.querySelector('.mobile-menu-toggle').focus(); document.querySelector('.mobile-menu-toggle').click()");
  await waitFor("document.querySelector('.mobile-menu-toggle').getAttribute('aria-expanded') === 'true'");
  await pause(250);
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  assert.equal(await evaluate('document.activeElement.textContent.trim()'), 'Work');
  await screenshot('mobile-menu');
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await waitFor("document.querySelector('#mobile-navigation').inert");
  assert.equal(await evaluate("document.activeElement.classList.contains('mobile-menu-toggle')"), true, 'Escape restores toggle focus');
  await evaluate("document.querySelector('#mobile-navigation a').focus()");
  assert.equal(await evaluate("document.activeElement.classList.contains('mobile-menu-toggle')"), true, 'Closed menu cannot receive focus');
  for (const width of [390, 320, 1440]) {
    await viewport(width);
    await pause(100);
    assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `No overflow at ${width}px`);
  }

  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await cdp('Page.navigate', { url: `${base}/?motion=reduce` });
  await waitFor("location.search === '?motion=reduce' && document.querySelector('.primary-navigation')?.dataset.hasActive !== undefined");
  await scrollTo('#contact');
  await pause(150);
  const reducedAnimations = await evaluate("document.getAnimations().map(a => ({name:a.animationName || a.transitionProperty || 'WAAPI',state:a.playState,time:a.currentTime,target:a.effect?.target?.className,duration:a.effect?.getTiming().duration}))");
  if (reducedAnimations.length) console.log('Reduced-motion diagnostics:', JSON.stringify(reducedAnimations));
  assert.equal(await evaluate('document.getAnimations().length'), 0, 'Reduced motion disables animations');
  assert.equal(await evaluate('window.__motionEvidence.hero.length'), 0);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('[data-reveal]')).opacity"), '1');
  await viewport(390);
  await screenshot('mobile-contact');
  await scrollTo('.project-card');
  await evaluate("document.querySelector('.project-link').click()");
  await waitFor("location.pathname.startsWith('/case-studies/') && document.readyState === 'complete'");
  assert.equal(await evaluate('window.__motionEvidence.transition'), false, 'Reduced-motion navigation uses the normal page change');
  assert.ok(await evaluate("document.querySelector('h1').textContent.length > 0"));

  await cdp('Emulation.setScriptExecutionDisabled', { value: true });
  await cdp('Page.navigate', { url: `${base}/?motion=no-js` });
  await waitFor("location.search === '?motion=no-js' && document.readyState === 'complete'");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('h1')).opacity"), '1');
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#contact [data-reveal]')).opacity"), '1');
  assert.ok(await evaluate("document.querySelector('noscript nav')?.getBoundingClientRect().height > 0"), 'Mobile navigation works without JavaScript');
  await screenshot('no-js');
  assert.deepEqual(errors, [], 'No browser runtime errors');
  console.log('PASS: hero sequence, project/contact reveals, hover, native case-study navigation, timeline, active nav, keyboard menu, responsive layout, reduced motion, and no-JavaScript fallback.');
} finally {
  await send('Target.closeTarget', { targetId });
  socket.close();
}
