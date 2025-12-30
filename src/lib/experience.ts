export type Experience = {
  role: string;
  company: string;
  summary: string;
};

export const experiences: Experience[] = [
  {
    role: 'Frontend & Mobile Engineer',
    company: 'ERP–POS Platform',
    summary:
      'Built and maintained cross-platform ERP–POS applications, focusing on scalable state management, offline-ready data flow, and performance optimization for daily business operations.',
  },
  {
    role: 'Mobile Engineer (Android)',
    company: 'Stock Trading Application',
    summary:
      'Developed native Android stock trading application using Kotlin, integrating real-time market data, ensuring performance, security, and reliability in financial transactions.',
  },
  {
    role: 'Frontend Engineer',
    company: 'E-commerce & Marketplace Projects',
    summary:
      'Developed e-commerce and marketplace web applications using React and TypeScript, emphasizing clean architecture, maintainable UI systems, and seamless API integration.',
  },
  {
    role: 'Mobile Engineer',
    company: 'Stock Opname & Inventory Systems',
    summary:
      'Built inventory management and stock tracking mobile applications with offline capabilities, real-time synchronization, and barcode scanning integration.',
  },
];
