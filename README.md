# Ridho Wahyu Nugroho — portfolio

Personal portfolio for Ridho, a frontend and mobile engineer with experience in web products, field applications, and QA automation. The site presents selected work with clear distinctions between professional projects, public source, and prototypes.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The site uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4. It is configured for static export.

## Checks

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Motion and browser verification

Motion uses CSS, Web Animations, scroll-driven animations, and native cross-document View Transitions without an animation dependency. The hero wordmark letters rise out of masks, the portrait lifts in (transform only, so it never delays LCP), and the whole entrance finishes within one second. Where `animation-timeline` is supported, the wordmark and portrait drift with scroll and the dark projects panel lifts as it enters; other browsers show the same layout without that motion. Scroll reveals (`data-reveal`, with `mask` and `clip` variants) run once per page visit and never permanently hide server-rendered content. Reduced motion disables entrances, scroll-driven motion, scroll reveals, FAQ animation, hover movement, and page transitions.

Case-study links deliberately use document navigation to share the project image between pages. Browsers without View Transitions use ordinary navigation. The floating navigation pill stays fixed during page transitions. Mobile navigation supports Tab, Escape, an inert closed panel, and a no-JavaScript fallback. FAQ answers use native `<details>` elements, so they open from the keyboard and without JavaScript.

To run the browser checks, build the site and serve the static output in one terminal:

```bash
pnpm build
python -m http.server 4173 --bind 127.0.0.1 --directory out
```

In a second PowerShell terminal, start a dedicated headless Chrome instance and run the checks (Node.js 22+):

```powershell
$motionChromePath = Join-Path $env:ProgramFiles 'Google/Chrome/Application/chrome.exe'
$motionProfilePath = Join-Path $PWD '.chrome-motion-check'
Start-Process $motionChromePath -WindowStyle Hidden -ArgumentList @('--headless=new', '--remote-debugging-port=9222', ('--user-data-dir="{0}"' -f $motionProfilePath), 'about:blank')
node scripts/verify-motion.mjs
```

The check covers the hero sequence and its one-second budget, wordmark masks, scroll-driven panel and parallax, scroll reveals, hover, shared-image navigation, timeline progress, FAQ keyboard use, active navigation, mobile keyboard interaction, 320/390/1440px widths, reduced motion, and disabled JavaScript. Screenshots are written to ignored `preview-motion-*.png` files. `MOTION_BASE_URL` and `CDP_URL` can override the default local addresses. Close the dedicated Chrome instance after verification.

Below 768px, Selected Work, Capabilities, and homepage Writing use native scroll-snap sliders. They retain every card, show the next card edge, and provide position counters and 44px previous/next controls. Arrow keys, Home/End, and focus navigation work within each track. Swiping also works without JavaScript; reduced motion makes button-driven movement instant. From 768px, Selected Work and Capabilities become grids, while Writing stays a slider (`always`) with controls that appear only after hydration.

With the same preview and Chrome setup, run `node scripts/verify-sliders.mjs` for touch gestures, controls, keyboard focus, first/last boundaries, independent sliders, responsive layouts, and no-JavaScript/reduced-motion checks. It writes ignored `preview-sliders-*.png` screenshots.

## Content and assets

- `src/lib/projects.ts` controls homepage project cards, labels, and image captions. Featured projects are listed first in the projects panel.
- `src/lib/site.ts` holds the email, GitHub, LinkedIn, and CV links used across the site.
- `src/lib/faq.ts` holds the FAQ. Answers should only restate facts the site or CV already supports.
- `src/lib/caseStudies.ts` supplies case study content. Add a corresponding entry when adding a project card.
- `src/lib/experience.ts` contains employment dates and summaries; keep it aligned with `public/Ridho-CV.pdf`.
- `src/lib/posts.ts` lists articles; full article content lives in `src/app/writing/[slug]/page.tsx`.
- `public/downloads/` holds installable demo builds linked through a project's `download` field (currently the RavaCollect Android APK). Rebuild and replace the file rather than keeping old versions in Git history.
- `public/images/` contains original project screenshots. Captions indicate when an image is from a wider product ecosystem rather than the exact flow described. `profile-cutout.webp` is the transparent hero portrait, cut from `profile.jpeg`.
- `scripts/generate_og.py` regenerates the Open Graph banner and favicon. `scripts/generate_cv.py` regenerates the selectable CV.

Private professional projects intentionally omit source and live links. Do not publish confidential screenshots or numerical outcome claims without permission and supporting measurements.
