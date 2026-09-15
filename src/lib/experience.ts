export type Experience = {
  role: string;
  company: string;
  period?: string;
  summary: string;
};

export const experiences: Experience[] = [
  {
    role: 'QA Automation',
    company: 'Taiwan Mobile',
    period: 'March 2026 - Present',
    summary: 'Responsible for designing, developing, maintaining, and debugging automated end-to-end tests for mobile and web applications. Built mobile automation using Maestro, including UI inspection with Maestro Hierarchy, and web automation using Playwright. Developed reusable test flows and automation utilities, investigated failures across application/backend/environment layers, and maintained automated regression coverage across development and staging environments. Also developed Claude Agent Skills to establish structured AI-assisted workflows for QA automation, test analysis, debugging, and reporting.'
  },
  {
    role: 'Frontend & Mobile Engineer',
    company: 'PT Propadu Konair Tarahubun',
    period: 'January 2025 - January 2026',
    summary:
      'Developed internal business systems and public-facing web applications using React and Next.js (TypeScript) with Zustand for client-side state management and React Query for server-state handling. Built internal mobile applications using Flutter with Provider/ChangeNotifier, focusing on scalable architecture, consistent state flow, and long-term maintainability.',
  },
  {
    role: 'Frontend Web Engineer',
    company: 'PT Taqnia Utama',
    period: 'January 2022 - December 2024',
    summary:
      'Developed enterprise web applications using React and TypeScript, implementing structured state management with React Query and UI state patterns. Designed scalable frontend architecture with reusable components, service layers, and clear separation of concerns to ensure performance and maintainability in production.',
  },
  {
    role: 'Mobile Application Developer',
    company: 'PT Cipta Kerja Arunika Nusantara',
    period: 'January 2019 - December 2021',
    summary:
      'Built Android native applications using Kotlin with MVVM architecture. Managed UI state using ViewModel and LiveData, handled asynchronous operations with Kotlin Coroutines, and deployed applications to Google Play Store.',
  },
];
