import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ridho-portfolio.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://ridho-portfolio.vercel.app/case-studies/erp-pos',
      lastModified: new Date(),
    },
    {
      url: 'https://ridho-portfolio.vercel.app/case-studies/stock-trading',
      lastModified: new Date(),
    },
    {
      url: 'https://ridho-portfolio.vercel.app/case-studies/marketplace',
      lastModified: new Date(),
    },
    {
      url: 'https://ridho-portfolio.vercel.app/writing',
      lastModified: new Date(),
    },
  ];
}
