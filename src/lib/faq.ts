// Answers draw only on facts stated elsewhere on the site and in the CV. Review before publishing.
export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: 'What kind of work do you do?',
    answer:
      'Frontend and mobile engineering: web products with React, Next.js, and TypeScript; mobile apps with Flutter, React Native, and native Android; and end-to-end test automation with Playwright and Maestro.',
  },
  {
    question: 'Do you do QA automation as well as development?',
    answer:
      'Yes. Most recently I built and maintained mobile and web end-to-end automation with Maestro and Playwright, including investigating failures across the app, backend, and environment. I test my own builds the same way: RavaCollect’s journeys were verified on a physical Android phone.',
  },
  {
    question: 'Why are some projects private?',
    answer:
      'Professional projects belong to the companies I built them for, so they omit source code, live links, and confidential screens. Their case studies describe what I owned and the constraints, without outcome numbers I cannot support.',
  },
  {
    question: 'Can I try any of the projects?',
    answer:
      'Yes. Arus, LapakBenz, and RavaSIM have live demos; Arus, RavaCollect, LapakBenz, and RavaSIM have public source code; and RavaCollect has an installable Android APK.',
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes. I am based in Indonesia, and my most recent role, QA automation for Taiwan Mobile, was remote.',
  },
];
