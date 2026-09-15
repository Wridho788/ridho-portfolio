export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  image?: string;
};
export const caseStudies: CaseStudy[] = [
  {
    slug: 'erp-pos',
    title: 'ERP–POS Mobile Application',
    summary:
      'A cross-platform ERP–POS system used for daily sales operations and inventory management.',
    context:
      'The client needed a reliable mobile POS system capable of handling offline transactions and syncing data efficiently. The application needed to work seamlessly in retail environments with unstable internet connectivity.',
    problem:
      'Frequent network issues caused data inconsistency and poor user experience during peak hours. Sales transactions were getting lost, inventory counts were inaccurate, and staff productivity was affected by slow synchronization.',
    solution:
      'Implemented offline-first architecture with efficient state management using Zustand and optimized data fetching with React Query. Designed a queue-based sync mechanism that prioritizes critical transactions and handles conflicts gracefully. Built a local database layer using AsyncStorage with encryption for sensitive data.',
    impact:
      'Improved transaction reliability by 95%, reduced sync errors to near-zero, and increased daily operational efficiency by 40%. Staff reported significantly better user experience, and the client saw measurable improvements in sales processing speed.',
    stack: ['React Native', 'TypeScript', 'Zustand', 'React Query', 'AsyncStorage', 'Expo'],
    image: '/images/erp-pos.jpg',
  },
  {
    slug: 'internal-public-web',
    title: 'Internal & Public Web Applications',
    summary:
      'Enterprise internal systems and public-facing web applications supporting business operations and customer-facing workflows.',
    context:
      'The company ran several business processes across separate internal tools while also serving customers through public web applications. Both sides needed to share the same design language, authentication, and data sources without duplicating frontend work for every new module.',
    problem:
      'Each new module was being built with its own state handling and its own data-fetching conventions. Server data and UI state were mixed inside components, so caching was inconsistent, loading and error states were handled differently on every screen, and onboarding a developer to a new module meant learning a new set of patterns.',
    solution:
      'Designed a frontend architecture in Next.js and TypeScript with a clear separation of concerns: a service layer for API access, React Query for all server state (caching, revalidation, and error handling in one place), and Zustand for genuine client state such as filters, wizards, and session-scoped UI. Extracted shared form, table, and layout components into a reusable internal library so new modules start from existing building blocks instead of from scratch.',
    impact:
      'New modules are now assembled from shared components and a single data-fetching convention, so behaviour around loading, caching, and error states is consistent across both the internal and the public applications, and developers moving between modules work in the same patterns throughout.',
    stack: ['Next.js', 'React.js', 'TypeScript', 'Zustand', 'React Query'],
    image: '/images/internal-web-apps.webp',
  },
  {
    slug: 'internal-mobile-app',
    title: 'Internal Mobile Application',
    summary:
      'A Flutter application supporting field and warehouse operations, including data input, camera capture, and barcode/QR scanning.',
    context:
      'Operational teams were recording field and stock data on paper and re-entering it into desktop systems later. The company needed a mobile application that staff could use directly at the point of work, on mid-range Android devices, often in warehouse areas with weak signal.',
    problem:
      'Manual re-entry made the data slow to arrive and easy to get wrong. The workflow also needed hardware access — camera capture for proof of condition and barcode/QR scanning for item identification — which had to stay responsive on lower-end devices rather than blocking the UI while processing.',
    solution:
      'Built the application in Flutter with Provider/ChangeNotifier, keeping each operational flow behind its own notifier so state transitions stay explicit and testable. Isolated camera and scanner access behind service classes so permission handling and device quirks live in one place, and structured forms to validate and persist locally before submission so an interrupted session does not lose the operator’s work.',
    impact:
      'Operational data is now captured once, at the point of work, with item identification handled by scanning instead of manual entry — removing the paper-to-desktop re-entry step from the workflow entirely.',
    stack: ['Flutter', 'Dart', 'Provider', 'Camera', 'Barcode / QR Scanner'],
    image: '/images/pkt.webp',
  },
  {
    slug: 'retail-marketing-system',
    title: 'Internal Retail & Marketing System',
    summary:
      'An internal web system for recording sales data and supporting retail and marketing business processes, integrated with Odoo ERP.',
    context:
      'Sales and marketing activity was tracked in spreadsheets while the source of truth for products, pricing, and stock lived in Odoo ERP. The business needed an internal web interface that let non-technical staff record and review sales data without working inside Odoo directly.',
    problem:
      'The ERP data model did not map cleanly onto the way the sales team worked, so the frontend had to reshape ERP responses into a workflow staff could follow. Sales entry screens involved long, interdependent forms where a change in one field affected the options available in the next, which made ad-hoc component state unmanageable.',
    solution:
      'Built the interface in React and TypeScript with Redux as a single, predictable store for the sales entry workflow, so interdependent form state stays consistent as users move through it. Added an adapter layer between the Odoo ERP API and the UI so ERP-specific field names and structures are translated once, at the boundary, instead of leaking into every component.',
    impact:
      'Sales and marketing staff record data through a workflow built around their process rather than the ERP’s data model, while product, pricing, and stock stay sourced from Odoo as the single source of truth.',
    stack: ['React.js', 'TypeScript', 'Redux', 'React Hooks', 'Odoo ERP'],
    image: '/images/erp-inl.webp',
  },
  {
    slug: 'job-marketplace-app',
    title: 'Job Marketplace Mobile Application',
    summary:
      'A native Android job marketplace connecting job seekers with employers through listings and application workflows.',
    context:
      'The product connected job seekers with employers through a native Android application covering job discovery, listing detail, and the full application submission flow, including document upload. It shipped to the Google Play Store.',
    problem:
      'Job discovery involved paginated lists, filters, and search running against the network, while the application flow involved multi-step submissions and uploads. Doing this work on the main thread or rebuilding state on every configuration change produced dropped frames and lost form input — both unacceptable in a flow where users are entering personal data.',
    solution:
      'Implemented MVVM with ViewModel and LiveData so screen state survives configuration changes and the UI observes a single source of truth per screen. Moved all network and I/O work onto Kotlin Coroutines with structured concurrency, so long-running requests are cancelled with their scope and never block the main thread. Handled the application flow as explicit state so partial progress is preserved between steps.',
    impact:
      'The application shipped to the Google Play Store with job discovery and the multi-step application flow both running off the main thread, and screen state preserved across rotation and process interruption.',
    stack: ['Android (Kotlin)', 'MVVM', 'ViewModel', 'LiveData', 'Coroutines'],
    image: '/images/jobseeker-kerjaloka-apps.png',
  },
];
