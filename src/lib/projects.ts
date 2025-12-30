export type Project = {
  title: string;
  description: string;
  stack: string[];
  role: string;
  highlight: string;
  slug?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: 'ERP–POS Mobile Application',
    description:
      'Cross-platform ERP–POS mobile application used for daily sales operations, inventory tracking, and reporting.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'React Query'],
    role: 'Frontend & Mobile Engineer',
    highlight: 'Handled scalable state management and offline-ready data flow.',
    slug: 'erp-pos',
    image: '/images/erp-pos.jpg',
  },
  {
    title: 'Stock Trading Application',
    description:
      'Native Android stock trading application with real-time market data integration, portfolio management, and secure transaction handling.',
    stack: ['Kotlin', 'Android SDK', 'Retrofit', 'Room Database', 'MVVM'],
    role: 'Mobile Engineer (Android)',
    highlight: 'Ensured performance, security, and reliability in financial transactions.',
    slug: 'stock-trading',
    image: '/images/nirvana-apps.jpeg',
  },
  {
    title: 'E-commerce & Marketplace Platform',
    description:
      'Full-featured e-commerce and marketplace web application with product catalog, cart management, and payment integration.',
    stack: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
    role: 'Frontend Engineer',
    highlight: 'Emphasized clean architecture, maintainable UI systems, and seamless API integration.',
    slug: 'marketplace',
    image: '/images/nirvana-ecommerce-web.png',
  },
  {
    title: 'Stock Opname System',
    description:
      'Inventory management system for tracking stock levels, managing warehouse operations, and generating inventory reports.',
    stack: ['React Native', 'TypeScript', 'Redux', 'REST API'],
    role: 'Mobile Engineer',
    highlight: 'Built offline-capable system for warehouse scanning and real-time synchronization.',
    image: '/images/stockopname.jpeg',
  },
  {
    title: 'Job Seeker Platform (KerjaLoka)',
    description:
      'Job search and recruitment platform connecting job seekers with employers, featuring job listings, application tracking, and profile management.',
    stack: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    role: 'Mobile Engineer',
    highlight: 'Developed user-friendly interface for seamless job search and application experience.',
    image: '/images/jobseeker-kerjaloka-apps.png',
  },
  {
    title: 'ERP Internal Tools',
    description:
      'Internal ERP tools for business operations, including employee management, reporting dashboards, and workflow automation.',
    stack: ['React', 'TypeScript', 'Material-UI', 'Redux'],
    role: 'Frontend Engineer',
    highlight: 'Created modular component system for rapid feature development.',
    image: '/images/erp-inl.png',
  },
];
