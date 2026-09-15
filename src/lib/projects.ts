export type Project = {
  title: string;
  description: string;
  stack: string[];
  role: string;
  highlight: string;
  slug?: string;
  image?: string;
  /**
   * How the thumbnail fills the card. Default 'cover' suits landscape
   * screenshots. Use 'contain' for portrait phone screenshots — the card slot
   * is ~2.4:1, so covering a 0.35:1 image crops away most of the screen.
   */
  imageFit?: 'cover' | 'contain';
};

export const projects: Project[] = [
  {
    title: 'ERP–POS Mobile Application',
    description:
      'Cross-platform ERP–POS system used for daily sales operations and inventory management in retail environments with unstable connectivity.',
    stack: ['React Native', 'TypeScript', 'Zustand', 'React Query', 'Expo'],
    role: 'Mobile Engineer',
    highlight:
      'Built an offline-first architecture with a queue-based sync mechanism that prioritizes critical transactions and resolves conflicts on reconnect.',
    slug: 'erp-pos',
    image: '/images/erp-pos.jpg',
  },
  {
    title: 'Internal & Public Web Applications',
    description:
      'Enterprise internal systems and public-facing web applications built to support business operations and user-facing workflows.',
    stack: ['React.js', 'Next.js', 'TypeScript', 'Zustand', 'React Query'],
    role: 'Frontend Web Engineer',
    highlight:
      'Designed scalable frontend architecture with clear separation of concerns, reusable components, and structured client/server state management.',
    slug: 'internal-public-web',
    image: '/images/internal-web-apps.webp',
  },
  {
    title: 'Internal Mobile Application',
    description:
      'Internal mobile application supporting operational workflows, including data input, camera usage, and barcode/QR scanning.',
    stack: ['Flutter', 'Dart', 'Provider', 'Camera', 'Barcode / QR Scanner'],
    role: 'Mobile Engineer',
    highlight:
      'Built scalable Flutter architecture using Provider/ChangeNotifier with consistent state flow and long-term maintainability in mind.',
    slug: 'internal-mobile-app',
    image: '/images/pkt.webp',
  },
  {
    title: 'Internal Retail & Marketing System',
    description:
      'Internal retail and marketing web system for sales data recording and business process support.',
    stack: ['React.js', 'TypeScript', 'Redux', 'React Hooks', 'Odoo ERP'],
    role: 'Frontend Engineer',
    highlight:
      'Integrated frontend system with Odoo ERP and implemented structured state handling for sales and marketing data.',
    slug: 'retail-marketing-system',
    image: '/images/erp-inl.webp',
  },
  {
    title: 'Job Marketplace Mobile Application',
    description:
      'Mobile job marketplace application connecting job seekers with employers through job listings and application workflows.',
    stack: ['Android (Kotlin)', 'MVVM', 'ViewModel', 'LiveData', 'Coroutines'],
    role: 'Mobile Application Developer',
    highlight:
      'Implemented MVVM architecture, managed UI state with ViewModel + LiveData, and handled asynchronous flows using Kotlin Coroutines.',
    slug: 'job-marketplace-app',
    image: '/images/jobseeker-kerjaloka-apps.png',
    imageFit: 'contain',
  },
];
