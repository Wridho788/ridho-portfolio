export type Experience = {
  role: string;
  company: string;
  summary: string;
};

export const experiences: Experience[] = [
  {
    role: 'Frontend & Mobile Engineer',
    company: 'PT Propadu Konair Tarahubun',
    summary:
      'Developed internal business systems and public-facing web applications using React.js and Next.js (TypeScript) with Zustand for client-side state management and React Query for server-state handling. Built internal mobile applications using Flutter with Provider/ChangeNotifier, focusing on scalable architecture, consistent state flow, and long-term maintainability.',
  },
  {
    role: 'Frontend Web Engineer',
    company: 'PT Taqnia Utama',
    summary:
      'Developed enterprise web applications using React.js and TypeScript, implementing structured state management with React Query and UI state patterns. Designed scalable frontend architecture with reusable components, service layers, and clear separation of concerns to ensure performance and maintainability in production.',
  },
  {
    role: 'Mobile Application Developer',
    company: 'PT Cipta Kerja Arunika Nusantara',
    summary:
      'Built Android native applications using Kotlin with MVVM architecture. Managed UI state using ViewModel and LiveData, handled asynchronous operations with Kotlin Coroutines, and deployed applications to Google Play Store.',
  },
];
