export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  contribution: string[];
  highlights: string[];
  challenges: string[];
  impact: string[];
  stack: string[];
  image?: string;
  /** Use 'contain' for portrait phone screenshots — the banner is short and wide. */
  imageFit?: 'cover' | 'contain';
  liveDemo?: string;
  github?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'arus',
    title: 'Arus — Personal Finance',
    summary:
      'A working personal finance demo that connects transaction entry, monthly summaries, and category budgets, with browser persistence and explicit recovery when storage fails.',
    overview:
      'Income, expenses, and budgets are easier to review when they share one monthly view. Arus explores that workflow through a public landing page and a responsive app with clearly labeled example data. It is a portfolio demo, with no accounts, bank connections, payments, or cloud backup.',
    contribution: [
      'Built the landing page and app flows for creating, editing, deleting, filtering, and searching transactions, plus monthly category budgets and a confirmed demo reset.',
      'Kept dashboard totals, expense categories, and budget progress derived from the same records and selected month.',
      'Implemented responsive transaction cards, keyboard navigation, dialog focus management, and inline validation and save errors.',
      'Added unit and browser checks, production smoke journeys, and repeatable screenshots of the actual production build.',
    ],
    highlights: [
      'A versioned localStorage repository keeps persistence outside the UI. New state is published only after a successful write, so a failed save does not appear successful.',
      'Integer rupiah amounts and local calendar date strings keep money calculations and monthly grouping predictable.',
      'Playwright exercises CRUD, reload persistence, reset, failure recovery, keyboard interactions, and responsive layouts. Vitest covers domain and repository behavior.',
    ],
    challenges: [
      'Browser storage makes the demo immediately usable without sign-in, but records belong to one browser and origin. Clearing site data removes them; cross-device sync is outside the MVP.',
      'React Strict Mode exposed a dialog lifecycle issue. The fix keeps close handling current and restores focus to the trigger after the dialog closes.',
      'Dense transaction tables are difficult to use on narrow screens, so the phone layout presents records as cards while preserving filters and edit/delete actions.',
      'The visual direction was inspired by Outcrowd\'s personal finance landing page. Arus has its own product copy, layout implementation, and CSS illustrations, with Lucide icons.',
    ],
    impact: [
      'Reviewers can use the public demo to change transactions and budgets, reload to confirm persistence, and reset the example data.',
      'On October 4, 2026, the production preview passed 23 Chromium tests and the Vercel deployment passed two desktop/phone smoke journeys, including direct /app access. Earlier unit verification passed 12 tests.',
      'Viewport checks cover 360px, 768px, and 1440px. Physical devices, Safari, Firefox, and assistive technology remain unverified; no user adoption or financial impact is claimed.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'CSS', 'localStorage', 'Vitest', 'Playwright', 'Vercel'],
    image: '/images/arus-dashboard.png',
    imageFit: 'contain',
    liveDemo: 'https://arus-web.vercel.app/app',
    github: 'https://github.com/Wridho788/arus',
  },
  {
    slug: 'lapakbenz',
    title: 'LapakBenz',
    summary:
      'One frontend for vehicle discovery, merchant journeys, and community events — with a separate challenge of making every product page shareable and crawlable.',
    overview:
      'A vehicle marketplace and community platform for Indonesian automotive communities and UMKM — merchants register and manage storefronts, shoppers browse and buy, and members discover events, all in one React SPA.',
    contribution: [
      'Built the frontend end-to-end solo: product catalog, cart, checkout, order tracking, wallet/points, vouchers, wishlist, merchant registration, and event pages.',
      'Structured the API layer with React Query hooks and types separated per domain (product, cart, order, event, voucher, wishlist, shipping, partner).',
      'Wrote a static-generation script that pre-renders per-route HTML with correct title, description, and Open Graph tags for every product, event, and merchant page.',
      'Integrated PWA support and OneSignal push notifications.',
    ],
    highlights: [
      'Custom static-HTML pre-rendering pipeline solving SEO for a client-rendered Vite SPA, without a server-rendered framework.',
      'React Query for all server state, Zustand for client-only state (cart, session UI).',
      'Domain-separated API layer — hooks and types per feature, consumed via Axios.',
    ],
    challenges: [
      'A client-rendered SPA has no server-rendered HTML, so crawlers and social platforms saw an empty shell instead of product/event pages — solved by pre-rendering static HTML per route instead of migrating the whole app to a server-rendered framework.',
      'Serving three different user types (shoppers, merchants, community members) from one app meant keeping the routing and data layer generic enough to support all three without duplicating logic per audience.',
    ],
    impact: [
      'Product, event, and merchant pages are indexable and produce correct link previews when shared, despite the app being fully client-rendered.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'React Query', 'Zustand', 'React Router', 'Axios', 'Tailwind CSS'],
    image: '/images/lapakbenz.png',
    imageFit: 'contain',
    liveDemo: 'https://lapakbenzz.vercel.app/',
    github: 'https://github.com/Wridho788/lapakbenz',
  },
  {
    slug: 'ravasim',
    title: 'RavaSIM',
    summary:
      'An eSIM management prototype that makes package, checkout, and device journeys explorable while keeping simulated responses separate from the interface.',
    overview:
      'A frontend-only eSIM management SaaS dashboard — package browsing, checkout, eSIM activation, device registration, and usage tracking — built to demonstrate a production-style architecture without a real backend in place yet.',
    contribution: [
      'Structured the app as feature-based modules (auth, packages, orders, esim, devices), each with its own api/hooks/services/types layer.',
      'Implemented data fetching and caching with React Query, client state with Zustand, and form validation with Yup.',
      'Built a shared mock-delay adapter so async flows behave like real network calls during development.',
    ],
    highlights: [
      'Feature-based modular architecture — every module talks to its service layer the same way, whether the call is mocked or real.',
      'Mock service boundary that keeps simulated responses out of UI components and provides a starting point for future backend integration.',
      'Mantine UI for the component layer, Yup for schema validation.',
    ],
    challenges: [
      'Frontend-only projects risk having their code organized around whatever the mock data looks like — addressed by putting a service/hook boundary between components and the mock layer from the start.',
      "Async UI states (loading, error, race conditions) don't show up naturally against instant mock responses — solved with a shared mock-delay adapter so those states are actually exercised during development.",
    ],
    impact: [
      'The prototype lets reviewers explore package discovery, checkout, and eSIM management flows. Backend integration and real transactions are outside the current scope.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Mantine UI', 'React Query', 'Zustand', 'Yup'],
    image: '/images/ravasim.png',
    imageFit: 'contain',
    liveDemo: 'https://ravasim.vercel.app',
    github: 'https://github.com/Wridho788/ravasim',
  },
  {
    slug: 'erp-pos',
    title: 'ERP–POS Mobile Application',
    summary:
      'Retail sales and inventory workflows designed to keep recording work when a connection drops, then sync when service returns.',
    overview:
      'A cross-platform ERP–POS system for daily sales operations and inventory management, built for retail environments with unstable internet connectivity where a lost transaction or a miscounted stock item has a direct cost.',
    contribution: [
      'Designed the offline-first data flow so sales and inventory actions are captured locally first, then synced.',
      'Built a queue-based sync mechanism that prioritizes critical transactions and resolves conflicts on reconnect.',
      'Persisted transaction state locally so interrupted sessions could be resumed and synced.',
      'Optimized data fetching and caching with React Query alongside Zustand for client state.',
    ],
    highlights: [
      'Offline-first architecture with queue-based sync and conflict resolution.',
      'Local persistence for interrupted transaction flows.',
      'React Query for server-state caching, Zustand for client state.',
    ],
    challenges: [
      'Frequent network drops during peak hours were losing transactions and causing inventory count drift — solved by treating offline as the default mode rather than a fallback path.',
      'Conflicting updates on reconnect (e.g., two devices adjusting the same stock count) required an explicit conflict-resolution strategy in the sync queue rather than last-write-wins.',
    ],
    impact: [
      'Sales actions can be captured locally during a connection drop and handed to the sync queue when connectivity returns.',
    ],
    stack: ['React Native', 'TypeScript', 'Zustand', 'React Query', 'AsyncStorage', 'Expo'],
    image: '/images/erp-pos.jpg',
  },
  {
    slug: 'internal-public-web',
    title: 'Internal & Public Web Applications',
    summary:
      'Enterprise internal systems and public-facing web applications supporting business operations and customer-facing workflows.',
    overview:
      'Enterprise internal systems and public-facing web applications sharing the same design language, authentication, and data sources — built so new modules could be added without duplicating frontend work each time.',
    contribution: [
      'Designed a Next.js/TypeScript frontend architecture with a clear separation of concerns: a service layer for API access, React Query for server state, and Zustand for genuine client state (filters, wizards, session-scoped UI).',
      'Extracted shared form, table, and layout components into a reusable internal library.',
      'Standardized loading, caching, and error-state handling across both internal and public applications.',
    ],
    highlights: [
      'React Query as the single source of truth for server state — caching, revalidation, and error handling in one place.',
      'Zustand scoped strictly to client-only state, kept separate from server data.',
      'Shared internal component library (forms, tables, layout) reused across modules.',
    ],
    challenges: [
      'Each new module previously came with its own state-handling conventions, making onboarding slow and caching inconsistent — resolved by standardizing on one data-fetching convention before adding more modules.',
      'Server data and UI state were mixed inside components; separating them into distinct layers required refactoring several existing screens, not just the new ones.',
    ],
    impact: [
      'New modules are now assembled from shared components with one consistent data-fetching pattern, so behavior around loading, caching, and errors stays predictable across the internal and public applications.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Zustand', 'React Query'],
    image: '/images/internal-web-apps.webp',
  },
  {
    slug: 'internal-mobile-app',
    title: 'Internal Mobile Application',
    summary:
      'A Flutter application supporting field and warehouse operations, including data input, camera capture, and barcode/QR scanning.',
    overview:
      'A Flutter application for field and warehouse operations, replacing paper-based data collection with direct entry at the point of work — including camera capture and barcode/QR scanning on mid-range Android devices.',
    contribution: [
      'Built each operational flow behind its own Provider/ChangeNotifier so state transitions stay explicit and testable.',
      'Isolated camera and scanner access behind dedicated service classes to centralize permission handling and device-specific quirks.',
      'Structured forms to validate and persist locally before submission.',
    ],
    highlights: [
      'Provider/ChangeNotifier architecture with one notifier per operational flow.',
      'Camera and barcode/QR scanner access abstracted behind service classes.',
      "Local persistence before submission so interrupted sessions don't lose data.",
    ],
    challenges: [
      'Camera and scanner permissions needed consistent handling across field devices, so hardware access was centralized in dedicated services.',
      "An interrupted session (app killed, connectivity lost mid-entry) shouldn't lose the operator's work — addressed by persisting form state locally before the submission step.",
    ],
    impact: [
      'Operational data is now captured once, at the point of work, with item identification handled by scanning instead of manual entry — removing the paper-to-desktop re-entry step from the workflow.',
    ],
    stack: ['Flutter', 'Dart', 'Provider', 'Camera', 'Barcode / QR Scanner'],
    image: '/images/pkt.webp',
  },
  {
    slug: 'retail-marketing-system',
    title: 'Internal Retail & Marketing System',
    summary:
      'An internal web system for recording sales data and supporting retail and marketing business processes, integrated with Odoo ERP.',
    overview:
      'An internal web interface letting non-technical sales staff record and review sales data, with Odoo ERP as the underlying source of truth for products, pricing, and stock.',
    contribution: [
      'Built the sales-entry workflow in React and TypeScript with Redux as a single, predictable store for long, interdependent forms.',
      'Built an adapter layer between the Odoo ERP API and the UI, translating ERP-specific field names and structures once, at the boundary.',
    ],
    highlights: [
      'Redux as the single source of truth for interdependent, multi-step form state.',
      'Adapter layer isolating ERP-specific data shapes from UI components.',
    ],
    challenges: [
      "The ERP data model didn't map cleanly onto how the sales team actually worked, so the frontend had to reshape ERP responses into a workflow staff could follow — handled at the adapter layer instead of leaking ERP structure into every screen.",
      'Sales entry forms had fields whose available options depended on earlier answers, which made ad-hoc component state unmanageable — solved by centralizing that logic in Redux.',
    ],
    impact: [
      "Sales and marketing staff now record data through a workflow built around their process rather than the ERP's data model, while product, pricing, and stock stay sourced from Odoo as the single source of truth.",
    ],
    stack: ['React', 'TypeScript', 'Redux', 'React Hooks', 'Odoo ERP'],
    image: '/images/erp-inl.webp',
  },
  {
    slug: 'job-marketplace-app',
    title: 'Job Marketplace Mobile Application',
    summary:
      'A native Android job marketplace connecting job seekers with employers through listings and application workflows.',
    overview:
      'A native Android job marketplace covering job discovery, listing detail, and the full multi-step application flow including document upload, shipped to the Google Play Store.',
    contribution: [
      'Implemented MVVM with ViewModel and LiveData so screen state survives configuration changes.',
      'Moved network and I/O work onto Kotlin Coroutines with structured concurrency.',
      'Handled the multi-step application flow as explicit state so partial progress is preserved between steps.',
    ],
    highlights: [
      'MVVM architecture with ViewModel + LiveData as the single source of truth per screen.',
      'Structured concurrency via Kotlin Coroutines — requests cancelled with their scope, never blocking the main thread.',
      'Explicit state handling for the multi-step application/upload flow.',
    ],
    challenges: [
      'Paginated job listings with filters and search running against the network, combined with multi-step form submissions, meant naive state handling produced dropped frames and lost form input — unacceptable in a flow collecting personal data.',
      'Rebuilding state on every configuration change (rotation) was losing user progress — resolved with ViewModel + LiveData surviving the lifecycle event.',
    ],
    impact: [
      'Shipped to the Google Play Store with network operations off the main thread and screen state preserved across configuration changes such as rotation.',
    ],
    stack: ['Android (Kotlin)', 'MVVM', 'ViewModel', 'LiveData', 'Coroutines'],
    image: '/images/jobseeker-kerjaloka-apps.png',
  },
];
