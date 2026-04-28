import type { Metadata } from 'next';
import { getAllArticles, getFeaturedArticles } from '@/lib/queries';
import { siteConfig } from '@/lib/config';
import { ArticleCard } from '@/components/ArticleCard';
import { AdSlot } from '@/components/AdSlot';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog — AI Insights, Tutorials & Industry News',
  description: `In-depth articles about AI tools, industry trends, tutorials, and expert comparisons. Stay informed with ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'In-depth articles about AI tools, industry trends, tutorials, and expert comparisons.',
    url: `${siteConfig.url}/blog/`,
  },
};

export default async function BlogPage() {
  const [articles, featured] = await Promise.all([
    getAllArticles(),
    getFeaturedArticles(),
  ]);

  return (
    <>
      <section className="pt-12 pb-8 px-4 sm:px-6 text-center page-enter">
        <div className="max-w-[680px] mx-auto">
          <h1 className="text-headline text-balance mb-2">AI Blog</h1>
          <p className="text-subtitle text-apple-gray-500">
            In-depth articles, tutorials, and expert insights on AI tools and trends
          </p>
        </div>
      </section>

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 mb-10">
        <AdSlot position="banner" />
      </div>

      {featured.length > 0 && (
        <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-title mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((article) => (
              <ArticleCard key={article._id} article={article} variant="featured" />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-title mb-6">All Articles</h2>
            {articles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-apple-gray-400 text-[15px] mb-2">No articles yet.</p>
                <p className="text-apple-gray-400 text-[13px]">Check back soon for new content!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {articles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            )}
          </div>
          <div className="w-full lg:w-[300px] shrink-0">
            <div className="lg:sticky lg:top-20 space-y-6">
              <AdSlot position="sidebar" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <AdSlot position="inline" />
      </div>
    </>
  );
}
