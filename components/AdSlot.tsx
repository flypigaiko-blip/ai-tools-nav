'use client';

interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'inline';
}

const sizeMap = {
  banner: { className: 'ad-banner', label: 'Ad Banner (728×90)' },
  sidebar: { className: 'ad-sidebar', label: 'Ad Sidebar (300×250)' },
  inline: { className: 'ad-inline', label: 'Ad Inline (Responsive)' },
};

export function AdSlot({ position }: AdSlotProps) {
  const { className, label } = sizeMap[position];

  return (
    <div className={`ad-slot ${className}`} data-ad-position={position}>
      <span className="text-[11px] opacity-60">{label}</span>
    </div>
  );
}
