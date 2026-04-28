import { client } from './sanity';

export interface Article {
  _id: string;
  _type: 'article';
  title: string;
  slug: { current: string };
  excerpt: string;
  content: any[];
  coverImage?: any;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export const articleFields = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  coverImage,
  author,
  category,
  tags,
  publishedAt,
  featured,
  seoTitle,
  seoDescription
`;

export async function getAllArticles(): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      ${articleFields}
    }`
  );
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      ${articleFields}
    }`
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      ${articleFields}
    }`,
    { slug }
  );
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const articles = await client.fetch(
    `*[_type == "article" && !(_id in path("drafts.**"))].slug.current`
  );
  return articles;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && category == $category && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      ${articleFields}
    }`,
    { category }
  );
}

export async function getRelatedArticles(currentSlug: string, category: string, limit = 3): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && category == $category && slug.current != $slug && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...$limit] {
      ${articleFields}
    }`,
    { category, slug: currentSlug, limit }
  );
}
