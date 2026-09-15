import type { MetadataRoute } from 'next';
import { caseStudies } from '@/lib/caseStudies';
import { posts } from '@/lib/posts';

export const dynamic = 'force-static';

const SITE_URL = 'https://ridho-portfolio.vercel.app';

// Derived from the same data the pages are generated from, so the sitemap can
// never list a URL that `generateStaticParams` did not actually build.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...caseStudies.map((cs) => ({
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/writing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
