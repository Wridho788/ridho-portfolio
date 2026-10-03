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
    period: 'July 2026 - October 2026',
    summary: 'Built and maintained mobile and web end-to-end automation with Maestro and Playwright. Investigated failures across the app, backend, and environment, and created reusable flows and AI-assisted QA workflows.'
  },
  {
    role: 'Frontend & Mobile Engineer',
    company: 'PT Propadu Konair Tarahubun',
    period: 'January 2025 - January 2026',
    summary:
      'Built public and internal web products with React, Next.js, and TypeScript, plus field-facing Flutter applications. Established reusable UI and state patterns across product modules.',
  },
  {
    role: 'Frontend Web Engineer',
    company: 'PT Taqnia Utama',
    period: 'January 2022 - December 2024',
    summary:
      'Developed enterprise web interfaces in React and TypeScript. Structured shared components, service boundaries, and data fetching patterns to make new modules easier to maintain.',
  },
  {
    role: 'Mobile Application Developer',
    company: 'PT Cipta Kerja Arunika Nusantara',
    period: 'January 2019 - December 2021',
    summary:
      'Built native Android applications in Kotlin using MVVM and Coroutines, including a job marketplace released on Google Play.',
  },
];
