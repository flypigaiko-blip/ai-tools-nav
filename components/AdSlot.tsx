interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'inline' | 'footer';
  className?: string;
}

/**
 * Ad placement component.
 *
 * Positions:
 * - banner: Full-width top banner (728×90 / responsive)
 * - sidebar: Right sidebar skyscraper (300×250)
 * - inline: In-feed native ad between tool cards
 * - footer: Bottom sticky banner
 *
 * Replace the placeholder with your AdSense / ad network code.
 * Example with Google AdSense:
 *
 * <ins className="adsbygoogle"
 *   style={{ display: 'block' }}
 *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"
 *   data-ad-format="auto"
 *   data-full-width-responsive="true" />
 */
export function AdSlot({ position, className = '' }: AdSlotProps) {
  const dimensions = {
    banner: 'ad-banner w-full',
    sidebar: 'ad-sidebar w-full',
    inline: 'ad-inline w-full',
    footer: 'ad-banner w-full',
  };

  const labels = {
    banner: 'Advertisement',
    sidebar: 'Ad',
    inline: 'Sponsored',
    footer: 'Advertisement',
  };

  return (
    <div
      className={`ad-slot ${dimensions[position]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
      data-ad-position={position}
    >
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-widest text-gray-300 mb-1">
          {labels[position]}
        </div>
        <div className="text-[11px]">Ad Space — 728×90</div>
        {/* 
          Replace with your ad code:
          <ins className="adsbygoogle" ... />
        */}
      </div>
    </div>
  );
}
