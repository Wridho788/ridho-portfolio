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
    title: 'Internal & Public Web Applications',
    description:
      'Enterprise internal systems and public-facing web applications built to support business operations and user-facing workflows.',
    stack: ['React.js', 'Next.js', 'TypeScript', 'Zustand', 'React Query'],
    role: 'Frontend Web Engineer',
    highlight:
      'Designed scalable frontend architecture with clear separation of concerns, reusable components, and structured client/server state management.',
    slug: 'internal-public-web',
    image: '/images/internal-web-apps.png',
  },
  {
    title: 'Internal Mobile Application',
    description:
      'Internal mobile application supporting operational workflows, including data input, camera usage, and barcode/QR scanning.',
    stack: ['Flutter', 'Dart', 'Provider', 'Camera', 'Barcode / QR Scanner'],
    role: 'Mobile Engineer',
    highlight:
      'Built scalable Flutter architecture using Provider/ChangeNotifier with consistent state flow and long-term maintainability in mind.',
    image: '/images/pkt.png',
  },
  {
    title: 'Internal Retail & Marketing System',
    description:
      'Internal retail and marketing web system for sales data recording and business process support.',
    stack: ['React.js', 'TypeScript', 'Redux', 'React Hooks', 'Odoo ERP'],
    role: 'Frontend Engineer',
    highlight:
      'Integrated frontend system with Odoo ERP and implemented structured state handling for sales and marketing data.',
    image: '/images/erp-inl.png',
  },
  {
    title: 'Job Marketplace Mobile Application',
    description:
      'Mobile job marketplace application connecting job seekers with employers through job listings and application workflows.',
    stack: ['Android (Kotlin)', 'MVVM', 'ViewModel', 'LiveData', 'Coroutines'],
    role: 'Mobile Application Developer',
    highlight:
      'Implemented MVVM architecture, managed UI state with ViewModel + LiveData, and handled asynchronous flows using Kotlin Coroutines.',
    image: '/images/jobseeker-kerjaloka-apps.png',
  },
];
