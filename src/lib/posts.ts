export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  content?: string;
};

export const posts: Post[] = [
  {
    slug: 'ai-agents-qa-automation-maestro-playwright',
    title: 'Using AI Agents to Scale QA Automation with Maestro and Playwright',
    summary:
      'How structured AI agent workflows speed up building and maintaining mobile and web test automation with Maestro, Maestro Hierarchy, and Playwright — and where they don’t replace human judgment.',
    date: '2026-08-20',
  },
  {
    slug: 'flutter-state-management-performance-caching-error-handling',
    title: 'Flutter State Management for Performance: Caching and Error Handling in Practice',
    summary:
      'Scoping Provider/ChangeNotifier correctly, separating ephemeral UI state from durable local cache, and modeling failures as state instead of exceptions in a field data-capture app.',
    date: '2025-06-10',
  },
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
