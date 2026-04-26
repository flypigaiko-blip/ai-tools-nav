import type { Metadata } from 'next';
import { categories, getToolsByCategory, getCategoryBySlug } from '@/data/tools';
import { siteConfig } from '@/lib/config';
import { ToolCard } from '@/components/ToolCard';
import { CategoryCard, CategoryPill } from '@/components/CategoryCard';
import { AdSlot } from '@/components/AdSlot';

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  return {
    title: `Best ${category.name} AI Tools`,
    description: `${category.description} Discover and compare the top ${category.name.toLowerCase()} AI tools.`,
    alternates: {
      canonical: `${siteConfig.url}/category/${category.slug}/`,
    },
    openGraph: {
      title: `Best ${category.name} AI Tools | ${siteConfig.name}`,
      description: category.description,
      url: `${siteConfig.url}/category/${category.slug}/`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    return (
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-headline mb-4">Category Not Found</h1>
        <p className="text-subtitle text-apple-gray-500 mb-6">
          The category you&apos;re looking for doesn&apos;t exist.
        </p>
        <a href="/" className="text-apple-blue hover:underline">
          ← Back to home
        </a>
      </div>
    );
  }

  const categoryTools = getToolsByCategory(params.slug);
  const featuredInCategory = categoryTools.filter((t) => t.featured);
  const restInCategory = categoryTools.filter((t) => !t.featured);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categories',
        item: `${siteConfig.url}/category/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `${siteConfig.url}/category/${category.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Category Header */}
      <section className="pt-12 pb-8 px-4 sm:px-6 text-center page-enter">
        <div className="max-w-[680px] mx-auto">
          <div className="text-4xl mb-3">{category.icon}</div>
          <h1 className="text-headline text-balance mb-2">{category.name}</h1>
          <p className="text-subtitle text-apple-gray-500 text-balance">
            {category.description}
          </p>
          <p className="text-sm text-apple-gray-400 mt-3">
            {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'}
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <a
            href="/category/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-gray-100 text-apple-gray-600 hover:bg-gray-200 hover:text-apple-black transition-all whitespace-nowrap"
          >
            All Categories
          </a>
          {categories.map((cat) => (
            <CategoryPill key={cat.id} category={cat} active={cat.id === category.id} />
          ))}
        </div>
      </section>

      {/* Top Ad */}
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 mb-8">
        <AdSlot position="banner" />
      </div>

      {/* Featured in Category */}
      {featuredInCategory.length > 0 && (
        <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-title mb-4">Featured {category.name} Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featuredInCategory.map((tool) => (
              <ToolCard key={tool.id} tool={tool} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* All Tools in Category */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-title mb-4">
              All {category.name} Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(restInCategory.length > 0 ? restInCategory : categoryTools).map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
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

      {/* Related Categories */}
      <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-title mb-4 text-center">Explore More Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories
            .filter((c) => c.id !== category.id)
            .slice(0, 4)
            .map((cat) => (
              <div key={cat.id}>
                <CategoryCard category={cat} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
