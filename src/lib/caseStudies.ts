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

];
