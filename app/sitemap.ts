import { MetadataRoute } from 'next';
import { tools, categories } from '@/data/tools';
import { siteConfig } from '@/lib/config';
import { getAllArticleSlugs } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}/`,
    lastModified: new Date(tool.dateAdded),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllArticleSlugs();
    articlePages = slugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch {
    articlePages = [];
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...articlePages,
    ...categoryPages,
    ...toolPages,
  ];
}
