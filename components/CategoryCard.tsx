import { Category } from '@/data/tools';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a
      href={`/category/${category.slug}/`}
      className="group glass-card p-5 hover-lift block text-center"
    >
      <div className="text-3xl mb-2">{category.icon}</div>
      <h3 className="text-[15px] font-semibold text-apple-black group-hover:text-apple-blue transition-colors mb-0.5">
        {category.name}
      </h3>
      <p className="text-[12px] text-apple-gray-400">
        {category.count} {category.count === 1 ? 'tool' : 'tools'}
      </p>
    </a>
  );
}

interface CategoryPillProps {
  category: Category;
  active?: boolean;
}

export function CategoryPill({ category, active }: CategoryPillProps) {
  return (
    <a
      href={`/category/${category.slug}/`}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? 'category-pill-active'
          : 'bg-gray-100 text-apple-gray-600 hover:bg-gray-200 hover:text-apple-black'
      }`}
    >
      <span>{category.icon}</span>
      <span>{category.name}</span>
    </a>
  );
}
