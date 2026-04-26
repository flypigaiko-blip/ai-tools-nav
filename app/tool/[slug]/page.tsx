import type { Metadata } from 'next';
import { tools, getToolBySlug, getCategoryBySlug, getToolsByCategory } from '@/data/tools';
import { siteConfig } from '@/lib/config';
import { ToolCard } from '@/components/ToolCard';
import { AdSlot } from '@/components/AdSlot';

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  return {
    title: `${tool.name} — AI Tool Review & Details`,
    description: `${tool.shortDescription}. ${tool.description.slice(0, 120)}...`,
    alternates: {
      canonical: `${siteConfig.url}/tool/${tool.slug}/`,
    },
    openGraph: {
      title: `${tool.name} | ${siteConfig.name}`,
      description: tool.shortDescription,
      url: `${siteConfig.url}/tool/${tool.slug}/`,
      type: 'website',
    },
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return (
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-headline mb-4">Tool Not Found</h1>
        <p className="text-subtitle text-apple-gray-500 mb-6">
          The tool you&apos;re looking for doesn&apos;t exist.
        </p>
        <a href="/" className="text-apple-blue hover:underline">
          ← Back to home
        </a>
      </div>
    );
  }

  const category = getCategoryBySlug(tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);

  const pricingColor = {
    Free: 'bg-green-50 text-green-700 border-green-200',
    Freemium: 'bg-blue-50 text-blue-700 border-blue-200',
    Paid: 'bg-orange-50 text-orange-700 border-orange-200',
    'Free Trial': 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'Free' ? '0' : undefined,
      priceCurrency: 'USD',
    },
    datePublished: tool.dateAdded,
  };

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
      ...(category
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: category.name,
              item: `${siteConfig.url}/category/${category.slug}/`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: tool.name,
              item: `${siteConfig.url}/tool/${tool.slug}/`,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 2,
              name: tool.name,
              item: `${siteConfig.url}/tool/${tool.slug}/`,
            },
          ]),
    ],
  };

  const reviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: tool.name,
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '4.5',
      bestRating: '5',
    },
    reviewBody: tool.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />

      {/* Tool Header */}
      <section className="pt-12 pb-8 px-4 sm:px-6 page-enter">
        <div className="max-w-[680px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-apple-gray-400 mb-6" aria-label="Breadcrumb">
            <a href="/" className="hover:text-apple-black transition-colors">Home</a>
            <span>/</span>
            {category && (
              <>
                <a href={`/category/${category.slug}/`} className="hover:text-apple-black transition-colors">
                  {category.name}
                </a>
                <span>/</span>
              </>
            )}
            <span className="text-apple-black">{tool.name}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-black/[0.04] shrink-0">
              {tool.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-title">{tool.name}</h1>
                {tool.trending && (
                  <span className="text-[11px] font-medium bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full border border-rose-100">
                    🔥 Trending
                  </span>
                )}
              </div>
              <p className="text-subtitle text-apple-gray-500 mb-3">
                {tool.shortDescription}
              </p>
              <div className="flex items-center gap-3">
                <span className={`text-[12px] font-medium px-3 py-1 rounded-full border ${pricingColor[tool.pricing]}`}>
                  {tool.pricing}
                </span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 h-9 px-5 rounded-full bg-apple-blue text-white text-[14px] font-medium hover:bg-apple-blueHover transition-colors"
                >
                  Visit Website
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 mb-10">
        <AdSlot position="banner" />
      </div>

      {/* Description */}
      <section className="max-w-[680px] mx-auto px-4 sm:px-6 mb-12">
        <article className="prose prose-gray max-w-none">
          <h2 className="text-[21px] font-semibold text-apple-black mb-3">About {tool.name}</h2>
          <p className="text-[15px] text-apple-gray-600 leading-relaxed">
            {tool.description}
          </p>
        </article>
      </section>

      {/* Key Details */}
      <section className="max-w-[680px] mx-auto px-4 sm:px-6 mb-12">
        <div className="glass-card p-6">
          <h2 className="text-[17px] font-semibold text-apple-black mb-4">Quick Facts</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-[12px] text-apple-gray-400 uppercase tracking-wider mb-0.5">Category</dt>
              <dd className="text-[15px] text-apple-black">
                <a href={`/category/${tool.category}/`} className="text-apple-blue hover:underline">
                  {category?.name || tool.category}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-apple-gray-400 uppercase tracking-wider mb-0.5">Pricing</dt>
              <dd className="text-[15px] text-apple-black">{tool.pricing}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-apple-gray-400 uppercase tracking-wider mb-0.5">Added</dt>
              <dd className="text-[15px] text-apple-black">
                {new Date(tool.dateAdded).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-apple-gray-400 uppercase tracking-wider mb-0.5">Website</dt>
              <dd className="text-[15px]">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-blue hover:underline"
                >
                  {new URL(tool.url).hostname}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Tags */}
      <section className="max-w-[680px] mx-auto px-4 sm:px-6 mb-12">
        <h2 className="text-[17px] font-semibold text-apple-black mb-3">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-gray-100 text-[13px] text-apple-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Inline Ad */}
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 mb-12">
        <AdSlot position="inline" />
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="max-w-[980px] mx-auto px-4 sm:px-6 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-title mb-4">
                Similar to {tool.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} variant="featured" />
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
      )}
    </>
  );
}
