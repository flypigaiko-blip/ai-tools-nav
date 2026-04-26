import type { Metadata } from 'next';
import { tools, categories, getFeaturedTools, getTrendingTools } from '@/data/tools';
import { siteConfig } from '@/lib/config';
import { ToolCard } from '@/components/ToolCard';
import { CategoryCard } from '@/components/CategoryCard';
import { AdSlot } from '@/components/AdSlot';
import { SearchBar } from '@/components/SearchBar';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const featured = getFeaturedTools();
  const trending = getTrendingTools();

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best AI Tools',
    description: siteConfig.description,
    numberOfItems: tools.length,
    itemListElement: tools.slice(0, 20).map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        url: `${siteConfig.url}/tool/${tool.slug}/`,
        description: tool.shortDescription,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: tool.pricing === 'Free' ? '0' : undefined,
          priceCurrency: 'USD',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-10 px-4 sm:px-6 text-center page-enter">
        <div className="max-w-[680px] mx-auto">
          <h1 className="text-hero text-balance mb-4">
            Discover the Best{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-apple-blue via-purple-500 to-pink-500">
              AI Tools
            </span>
          </h1>
          <p className="text-subtitle text-apple-gray-500 text-balance mb-8">
            {siteConfig.description}
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Top Ad Banner */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 mb-10">
        <AdSlot position="banner" />
      </div>

      {/* Trending Tools */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-title">🔥 Trending Now</h2>
            <p className="text-sm text-apple-gray-400 mt-0.5">
              The most popular AI tools this week
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {trending.slice(0, 6).map((tool) => (
            <ToolCard key={tool.id} tool={tool} variant="featured" />
          ))}
        </div>
      </section>

      {/* Inline Ad */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <AdSlot position="inline" />
      </div>

      {/* Categories */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-title mb-1">Browse by Category</h2>
          <p className="text-sm text-apple-gray-400">
            Find the right AI tool for every use case
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-title">Featured AI Tools</h2>
            <p className="text-sm text-apple-gray-400 mt-0.5">
              Hand-picked tools trusted by millions
            </p>
          </div>
          <a
            href="/category/"
            className="text-sm text-apple-blue hover:text-apple-blueHover transition-colors"
          >
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.slice(0, 9).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Sidebar Ad + All Tools */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-title mb-6">All AI Tools</h2>
            <div className="space-y-1">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} variant="compact" />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[300px] shrink-0">
            <div className="lg:sticky lg:top-20">
              <AdSlot position="sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-[680px] mx-auto px-4 sm:px-6 text-center mb-16">
        <div className="glass-card p-8 sm:p-12">
          <h2 className="text-title mb-2">Stay Updated</h2>
          <p className="text-[15px] text-apple-gray-500 mb-6">
            Get the best new AI tools delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 rounded-full bg-gray-100 text-[15px] border border-transparent focus:border-apple-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-apple-blue/10 transition-all"
              aria-label="Email address for newsletter"
            />
            <button className="h-11 px-6 rounded-full bg-apple-blue text-white text-[15px] font-medium hover:bg-apple-blueHover transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
