# AITools.Directory

A beautifully designed AI tools navigation website with Apple-inspired aesthetics, full SEO optimization, and ad placement support.

## ✨ Features

- **Apple-style Design** — Clean, minimal, premium feel with SF Pro typography
- **SEO Optimized** — Structured data (JSON-LD), meta tags, sitemap, robots.txt
- **12 Categories** — Chatbots, Image Gen, Writing, Coding, Video, Audio, etc.
- **30+ AI Tools** — Pre-populated with popular AI tools
- **Ad Slots** — Banner, sidebar, inline, and footer ad placements
- **Search** — Real-time search across all tools
- **Static Export** — Deploys to Vercel/GitHub Pages for free
- **Responsive** — Looks great on all devices

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

## 📦 Deploy to Vercel (Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click Deploy — done!

Or use the CLI:

```bash
npm i -g vercel
vercel
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Robots.txt
│   ├── category/
│   │   ├── page.tsx        # All categories
│   │   └── [slug]/page.tsx # Category detail
│   └── tool/
│       └── [slug]/page.tsx # Tool detail
├── components/
│   ├── ToolCard.tsx        # Tool card (3 variants)
│   ├── CategoryCard.tsx    # Category card + pill
│   ├── AdSlot.tsx          # Ad placement slots
│   └── SearchBar.tsx       # Search with results
├── data/
│   └── tools.ts            # All tools & categories data
├── lib/
│   └── config.ts           # Site configuration
└── public/
    ├── manifest.json       # PWA manifest
    └── favicon.ico         # Favicon
```

## 🔧 Adding Tools

Edit `data/tools.ts` to add new tools:

```typescript
{
  id: '31',
  name: 'Your Tool',
  slug: 'your-tool',
  description: 'Full description...',
  shortDescription: 'Short tagline',
  url: 'https://your-tool.com',
  logo: '🚀',
  category: 'chatbots', // must match a category id
  tags: ['ai', 'chatbot'],
  pricing: 'Freemium',
  featured: false,
  trending: false,
  dateAdded: '2024-04-01',
}
```

## 💰 Ad Placements

4 ad slots are built in:

| Position | Location | Size |
|----------|----------|------|
| **Banner** | Top of page / category | 728×90 |
| **Sidebar** | Right side (sticky) | 300×250 |
| **Inline** | Between content sections | Responsive |
| **Footer** | Bottom of page | 728×90 |

To enable Google AdSense:

1. Uncomment the AdSense script in `app/layout.tsx`
2. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID
3. Replace the placeholder in `AdSlot.tsx` with your `<ins>` ad code

## 🔍 SEO Features

- ✅ Semantic HTML with proper heading hierarchy
- ✅ JSON-LD structured data (WebSite, Organization, SoftwareApplication, BreadcrumbList, Review)
- ✅ Open Graph & Twitter Card meta tags
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Breadcrumb navigation
- ✅ Fast static pages (Next.js SSG)

## 📝 Content Management

Currently uses static data in `data/tools.ts`. To connect a CMS:

### Option A: Notion
Use Notion API as a database → fetch at build time in `getStaticProps`

### Option B: Sanity
Add Sanity client → query tools at build time with GROQ

### Option C: Supabase
Add Supabase client → query tools from PostgreSQL at build time

All options are free-tier compatible with the Vercel stack.

## 🎨 Customization

- **Colors**: Edit `tailwind.config.ts` → `theme.extend.colors.apple`
- **Fonts**: Modify `tailwind.config.ts` → `theme.extend.fontFamily`
- **Site info**: Update `lib/config.ts`
- **Categories**: Edit `data/tools.ts` → `categories` array

## 📄 License

MIT
