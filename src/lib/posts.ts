export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  content?: string;
};

export const posts: Post[] = [
  {
    slug: 'state-management-is-a-product-decision',
    title: 'State Management Is a Product Decision',
    summary:
      'Why choosing a state management solution affects not only code, but also product velocity and team scalability.',
    date: '2025-01-10',
  },
  {
    slug: 'offline-first-mobile-apps',
    title: 'Building Offline-First Mobile Applications',
    summary:
      'Lessons learned from building production-ready offline-capable mobile applications for retail environments.',
    date: '2024-12-15',
  },
  {
    slug: 'clean-architecture-frontend',
    title: 'Clean Architecture in Frontend Projects',
    summary:
      'Why clean architecture matters in frontend development and how it improves long-term maintainability.',
    date: '2024-11-20',
  },
];
