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

Motion uses CSS, Web Animations, and native cross-document View Transitions without an animation dependency. Hero entrances finish within one second. Scroll reveals run once per page visit and never permanently hide server-rendered content. Reduced motion disables entrances, scroll reveals, hover movement, and page transitions.

Case-study links deliberately use document navigation to share the project image between pages. Browsers without View Transitions use ordinary navigation. Mobile navigation supports Tab, Escape, an inert closed panel, and a no-JavaScript fallback.

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

The check covers hero and scroll animations, hover, shared-image navigation, timeline progress, active navigation, mobile keyboard interaction, 320/390/1440px widths, reduced motion, and disabled JavaScript. Screenshots are written to ignored `preview-motion-*.png` files. `MOTION_BASE_URL` and `CDP_URL` can override the default local addresses. Close the dedicated Chrome instance after verification.

Below 768px, Selected Work, More Product Work, Capabilities, and homepage Writing use native scroll-snap sliders. They retain every card, show the next card edge, and provide position counters and 44px previous/next controls. Arrow keys, Home/End, and focus navigation work within each track. Swiping also works without JavaScript; reduced motion makes button-driven movement instant. Desktop retains the original stacked/grid layouts.

With the same preview and Chrome setup, run `node scripts/verify-sliders.mjs` for touch gestures, controls, keyboard focus, first/last boundaries, independent sliders, responsive layouts, and no-JavaScript/reduced-motion checks. It writes ignored `preview-sliders-*.png` screenshots.

## Content and assets

- `src/lib/projects.ts` controls homepage project cards, labels, and image captions.
- `src/lib/caseStudies.ts` supplies case study content. Add a corresponding entry when adding a project card.
- `src/lib/experience.ts` contains employment dates and summaries; keep it aligned with `public/Ridho-CV.pdf`.
- `src/lib/posts.ts` lists articles; full article content lives in `src/app/writing/[slug]/page.tsx`.
- `public/images/` contains original project screenshots. Captions indicate when an image is from a wider product ecosystem rather than the exact flow described.
- `scripts/generate_og.py` regenerates the Open Graph banner and favicon. `scripts/generate_cv.py` regenerates the selectable CV.

Private professional projects intentionally omit source and live links. Do not publish confidential screenshots or numerical outcome claims without permission and supporting measurements.
