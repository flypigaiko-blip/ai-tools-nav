import { Article } from '@/lib/queries';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const href = `/blog/${article.slug.current}/`;
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'featured') {
    return (
      <a href={href} className="group glass-card overflow-hidden hover-lift block">
        {article.coverImage && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={urlFor(article.coverImage).width(600).height(300).auto('format').url()}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {article.category}
            </span>
            {article.featured && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                ⭐ Featured
              </span>
            )}
          </div>
          <h3 className="text-[17px] font-semibold text-apple-black group-hover:text-apple-blue transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[13px] text-apple-gray-500 line-clamp-2 mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 text-[12px] text-apple-gray-400">
            <span>{article.author}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={href} className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
      {article.coverImage && (
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
          <Image
            src={urlFor(article.coverImage).width(200).height(200).auto('format').url()}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {article.category}
          </span>
        </div>
        <h3 className="text-[15px] font-semibold text-apple-black group-hover:text-apple-blue transition-colors line-clamp-2 mb-1">
          {article.title}
        </h3>
        <p className="text-[13px] text-apple-gray-500 line-clamp-1 mb-1.5">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-apple-gray-400">
          <span>{article.author}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
    </a>
  );
}
