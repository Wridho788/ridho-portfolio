export type Project = {
  title: string;
  slug: string;
  kind: string;
  description: string;
  role: string;
  highlight: string;
  stack: string[];
  image: string;
  imageFit?: 'cover' | 'contain';
  imageContext: string;
  featured?: boolean;
  liveDemo?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: 'LapakBenz',
    slug: 'lapakbenz',
    kind: 'Independent build · Public code',
    description: 'A vehicle marketplace bringing product discovery, merchant tools, and community events into one experience.',
    role: 'Solo frontend developer',
    highlight: 'Built the core shopping journeys and a static HTML pipeline for shareable, crawlable product and event pages.',
    stack: ['React', 'TypeScript', 'Vite', 'React Query', 'Zustand'],
    image: '/images/lapakbenz.png',
    imageFit: 'contain',
    imageContext: 'Mobile view of the LapakBenz home screen.',
    featured: true,
    liveDemo: 'https://lapakbenzz.vercel.app/',
    github: 'https://github.com/Wridho788/lapakbenz',
  },
  {
    title: 'ERP–POS Mobile Application',
    slug: 'erp-pos',
    kind: 'Professional work · Private code',
    description: 'Sales and inventory workflows designed for retail environments where connectivity can drop during a transaction.',
    role: 'Mobile engineer',
    highlight: 'Designed the offline capture and sync flow so critical work can continue through network interruptions.',
    stack: ['React Native', 'TypeScript', 'Zustand', 'React Query'],
    image: '/images/erp-pos.jpg',
    imageContext: 'Desktop POS screen from the wider product ecosystem. The mobile offline flow is not shown.',
  },
  {
    title: 'RavaSIM',
    slug: 'ravasim',
    kind: 'Independent prototype · Mock API',
    description: 'An eSIM management prototype spanning package discovery, checkout, activation, and usage tracking.',
    role: 'Solo frontend developer',
    highlight: 'Separated UI, service contracts, and mock responses so the user journeys can be explored before backend integration.',
    stack: ['Next.js', 'TypeScript', 'React Query', 'Zustand'],
    image: '/images/ravasim.png',
    imageFit: 'contain',
    imageContext: 'Mobile dashboard from the RavaSIM frontend prototype.',
    featured: true,
    liveDemo: 'https://ravasim.vercel.app',
    github: 'https://github.com/Wridho788/ravasim',
  },
  {
    title: 'Internal & Public Web Applications',
    slug: 'internal-public-web',
    kind: 'Professional work · Private code',
    description: 'Shared frontend patterns for internal operations and public product journeys.',
    role: 'Frontend web engineer',
    highlight: 'Standardized data fetching and reusable form, table, and layout patterns across modules.',
    stack: ['Next.js', 'TypeScript', 'React Query', 'Zustand'],
    image: '/images/internal-web-apps.webp',
    imageContext: 'Public site and internal login screen from the same product ecosystem.',
  },
  {
    title: 'Internal Mobile Application',
    slug: 'internal-mobile-app',
    kind: 'Professional work · Private code',
    description: 'Field and warehouse data capture with camera, barcode, and QR scanning.',
    role: 'Mobile engineer',
    highlight: 'Kept partially completed work on-device and isolated camera and scanner access behind services.',
    stack: ['Flutter', 'Dart', 'Provider'],
    image: '/images/pkt.webp',
    imageContext: 'A field application screen showing device and scanner controls.',
  },
  {
    title: 'Internal Retail & Marketing System',
    slug: 'retail-marketing-system',
    kind: 'Professional work · Private code',
    description: 'Sales data entry shaped around staff workflows and connected to Odoo ERP.',
    role: 'Frontend engineer',
    highlight: 'Translated ERP data into a clearer sales entry flow with predictable multi-step form state.',
    stack: ['React', 'TypeScript', 'Redux', 'Odoo ERP'],
    image: '/images/erp-inl.webp',
    imageContext: 'Login screen of the internal retail and marketing system.',
  },
  {
    title: 'Job Marketplace Mobile Application',
    slug: 'job-marketplace-app',
    kind: 'Professional work · Android',
    description: 'An Android experience for finding jobs and completing a multi-step application.',
    role: 'Android developer',
    highlight: 'Modeled application progress explicitly and moved network work off the main thread.',
    stack: ['Kotlin', 'MVVM', 'Coroutines'],
    image: '/images/jobseeker-kerjaloka-apps.png',
    imageFit: 'contain',
    imageContext: 'Home screen of the Android job marketplace application.',
    featured: true,
  },
];
