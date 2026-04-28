import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/queries';
import { siteConfig } from '@/lib/config';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@/components/PortableText';
import { ArticleCard } from '@/components/ArticleCard';
import { AdSlot } from '@/components/AdSlot';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  const seoTitle = article.seoTitle || `${article.title} | ${siteConfig.name}`;
  const seoDescription = article.seoDescription || article.excerpt;
  const ogImage = article.coverImage
    ? urlFor(article.coverImage).width(1200).height(630).auto('format').url()
    : siteConfig.ogImage;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `${siteConfig.url}/blog/${article.slug.current}/`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${siteConfig.url}/blog/${article.slug.current}/`,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(params.slug, article.category);

  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: article.coverImage
      ? urlFor(article.coverImage).width(1200).height(630).auto('format').url()
      : undefined,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${article.slug.current}/`,
    },
    keywords: article.tags?.join(', '),
    articleSection: article.category,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${siteConfig.url}/blog/${article.slug.current}/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="pt-8 pb-4 px-4 sm:px-6 page-enter">
        <div className="max-w-[740px] mx-auto">
          <nav className="flex items-center gap-2 text-[13px] text-apple-gray-400 mb-6" aria-label="Breadcrumb">
            <a href="/" className="hover:text-apple-black transition-colors">Home</a>
            <span>/</span>
            <a href="/blog/" className="hover:text-apple-black transition-colors">Blog</a>
            <span>/</span>
            <span className="text-apple-black truncate">{article.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {article.category}
            </span>
            {article.featured && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                ⭐ Featured
              </span>
            )}
          </div>

          <h1 className="text-[32px] sm:text-[36px] font-bold text-apple-black leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-[14px] text-apple-gray-500 mb-8">
            <span className="font-medium text-apple-black">{article.author}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>{date}</time>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 text-[12px] text-apple-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {article.coverImage && (
        <div className="max-w-[740px] mx-auto px-4 sm:px-6 mb-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
            <img
              src={urlFor(article.coverImage).width(1200).height(675).auto('format').url()}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-[740px] mx-auto px-4 sm:px-6 mb-8">
        <AdSlot position="banner" />
      </div>

      <div className="max-w-[740px] mx-auto px-4 sm:px-6">
        <div className="prose-content">
          <PortableText content={article.content} />
        </div>
      </div>

      <div className="max-w-[740px] mx-auto px-4 sm:px-6 my-10">
        <AdSlot position="inline" />
      </div>

      {relatedArticles.length > 0 && (
        <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-title mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedArticles.map((a) => (
              <ArticleCard key={a._id} article={a} variant="featured" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
