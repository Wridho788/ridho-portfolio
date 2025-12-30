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
    slug: 'stock-trading',
    title: 'Stock Trading Application',
    summary:
      'Native Android stock trading application with real-time market data and secure transaction handling.',
    context:
      'A financial services company needed a high-performance Android application for retail investors to trade stocks, view real-time market data, and manage their portfolios. The application needed to handle thousands of price updates per second and ensure zero transaction errors.',
    problem:
      'Existing solution had performance issues with real-time data updates, causing UI freezes and delayed order execution. Users complained about app crashes during high market volatility and concerns about transaction security.',
    solution:
      'Rebuilt the application using Kotlin with MVVM architecture and coroutines for efficient async operations. Implemented WebSocket connections for real-time data streaming with proper backpressure handling. Used Room Database with LiveData for reactive UI updates and implemented SSL pinning for enhanced security.',
    impact:
      'Achieved 60fps consistent performance even during high market volatility, reduced order execution time by 70%, and completely eliminated transaction errors. User satisfaction scores increased from 3.2 to 4.7 stars on Play Store.',
    stack: ['Kotlin', 'Android SDK', 'Coroutines', 'Room', 'Retrofit', 'WebSocket', 'MVVM'],
    image: '/images/nirvana-apps.jpeg',
  },
  {
    slug: 'marketplace',
    title: 'E-commerce & Marketplace Platform',
    summary:
      'Full-featured e-commerce platform with product catalog, cart management, and payment integration.',
    context:
      'A growing retail business wanted to expand online with a scalable e-commerce platform. They needed a solution that could handle their product catalog of 10,000+ items, support multiple vendors, and integrate with existing payment systems.',
    problem:
      'Initial implementation had slow page loads, poor mobile experience, and difficult content management. The codebase was hard to maintain, making new feature additions costly and time-consuming. SEO performance was poor, limiting organic traffic growth.',
    solution:
      'Rebuilt the frontend using Next.js with incremental static regeneration for product pages. Implemented a component-driven architecture with Tailwind CSS for consistent styling. Optimized images with Next.js Image component and implemented lazy loading for improved performance. Added proper meta tags and structured data for SEO.',
    impact:
      'Reduced page load times by 65%, improved Lighthouse score from 45 to 92, and increased mobile conversion rate by 80%. Development velocity increased significantly with the new component architecture, and organic traffic grew 3x within 6 months.',
    stack: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS', 'REST API'],
    image: '/images/nirvana-ecommerce-web.png',
  },
];
