import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ridho-portfolio.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://ridho-portfolio.vercel.app/case-studies/erp-pos',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://ridho-portfolio.vercel.app/case-studies/stock-trading',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://ridho-portfolio.vercel.app/case-studies/marketplace',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://ridho-portfolio.vercel.app/writing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://ridho-portfolio.vercel.app/writing/state-management-is-a-product-decision',
      lastModified: new Date('2025-01-10'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://ridho-portfolio.vercel.app/writing/offline-first-mobile-apps',
      lastModified: new Date('2024-12-15'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://ridho-portfolio.vercel.app/writing/clean-architecture-frontend',
      lastModified: new Date('2024-11-20'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
