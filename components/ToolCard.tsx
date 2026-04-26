import { AITool } from '@/data/tools';

interface ToolCardProps {
  tool: AITool;
  variant?: 'default' | 'featured' | 'compact';
}

export function ToolCard({ tool, variant = 'default' }: ToolCardProps) {
  const pricingColor = {
    Free: 'bg-green-50 text-green-700 border-green-100',
    Freemium: 'bg-blue-50 text-blue-700 border-blue-100',
    Paid: 'bg-orange-50 text-orange-700 border-orange-100',
    'Free Trial': 'bg-purple-50 text-purple-700 border-purple-100',
  };

  if (variant === 'featured') {
    return (
      <a
        href={`/tool/${tool.slug}/`}
        className="group glass-card p-6 hover-lift block"
      >
        <div className="flex items-start gap-4">
          <div className="tool-icon shrink-0">{tool.logo}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[17px] font-semibold text-apple-black group-hover:text-apple-blue transition-colors truncate">
                {tool.name}
              </h3>
              {tool.trending && (
                <span className="text-[10px] font-medium bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full border border-rose-100">
                  🔥 Trending
                </span>
              )}
            </div>
            <p className="text-sm text-apple-gray-500 line-clamp-2 mb-3">
              {tool.shortDescription}
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${pricingColor[tool.pricing]}`}>
                {tool.pricing}
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={`/tool/${tool.slug}/`}
        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <span className="text-xl shrink-0">{tool.logo}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[15px] font-medium text-apple-black group-hover:text-apple-blue transition-colors truncate block">
            {tool.name}
          </span>
          <span className="text-xs text-apple-gray-400 truncate block">
            {tool.shortDescription}
          </span>
        </div>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border shrink-0 ${pricingColor[tool.pricing]}`}>
          {tool.pricing}
        </span>
      </a>
    );
  }

  return (
    <a
      href={`/tool/${tool.slug}/`}
      className="group glass-card p-5 hover-lift block"
    >
      <div className="flex items-start gap-3.5">
        <div className="tool-icon shrink-0">{tool.logo}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[15px] font-semibold text-apple-black group-hover:text-apple-blue transition-colors truncate">
              {tool.name}
            </h3>
            {tool.trending && (
              <span className="text-[9px] font-medium bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full border border-rose-100 shrink-0">
                🔥
              </span>
            )}
          </div>
          <p className="text-[13px] text-apple-gray-500 line-clamp-2 mb-2">
            {tool.shortDescription}
          </p>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${pricingColor[tool.pricing]}`}>
              {tool.pricing}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
