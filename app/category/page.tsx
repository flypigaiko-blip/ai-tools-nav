import type { Metadata } from 'next';
import { categories } from '@/data/tools';
import { CategoryCard } from '@/components/CategoryCard';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'All Categories',
  description: `Browse all AI tool categories on ${siteConfig.name}. Find the best AI tools organized by use case.`,
  alternates: {
    canonical: `${siteConfig.url}/category/`,
  },
};

export default function CategoriesPage() {
  return (
    <>
      <section className="pt-12 pb-8 px-4 sm:px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <h1 className="text-headline text-balance mb-2">All Categories</h1>
          <p className="text-subtitle text-apple-gray-500">
            Browse {categories.length} categories of AI tools
          </p>
        </div>
      </section>

      <section className="max-w-[980px] mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </>
  );
}
