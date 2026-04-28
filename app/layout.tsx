import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [
      `https://twitter.com/${siteConfig.twitter.replace('@', '')}`,
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* Google AdSense placeholder — replace with your publisher ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
          <nav className="max-w-[980px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-semibold text-[15px] tracking-tight text-apple-black hover:text-apple-blue transition-colors">
              <span className="text-lg">⚡</span>
              <span>AITools.Directory</span>
            </a>
            <div className="hidden sm:flex items-center gap-7 text-sm text-apple-gray-600">
              <a href="/category/chatbots/" className="hover:text-apple-black transition-colors">Chatbots</a>
              <a href="/category/image-generation/" className="hover:text-apple-black transition-colors">Image</a>
              <a href="/category/coding/" className="hover:text-apple-black transition-colors">Coding</a>
              <a href="/category/writing/" className="hover:text-apple-black transition-colors">Writing</a>
              <a href="/blog/" className="hover:text-apple-black font-medium transition-colors">Blog</a>
              <a href="/category/" className="hover:text-apple-black transition-colors">All Categories</a>
            </div>
            <a
              href="mailto:submit@aitools.directory"
              className="text-sm text-apple-blue hover:text-apple-blueHover transition-colors"
            >
              Submit Tool
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-black/[0.04] mt-20">
          <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-apple-black mb-3">Discover</h4>
                <ul className="space-y-2 text-sm text-apple-gray-500">
                  <li><a href="/category/chatbots/" className="hover:text-apple-black transition-colors">Chatbots</a></li>
                  <li><a href="/category/image-generation/" className="hover:text-apple-black transition-colors">Image Generation</a></li>
                  <li><a href="/category/writing/" className="hover:text-apple-black transition-colors">Writing & Content</a></li>
                  <li><a href="/category/coding/" className="hover:text-apple-black transition-colors">Code & Dev</a></li>
                  <li><a href="/category/video/" className="hover:text-apple-black transition-colors">Video & Animation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-apple-black mb-3">Categories</h4>
                <ul className="space-y-2 text-sm text-apple-gray-500">
                  <li><a href="/category/audio/" className="hover:text-apple-black transition-colors">Audio & Music</a></li>
                  <li><a href="/category/productivity/" className="hover:text-apple-black transition-colors">Productivity</a></li>
                  <li><a href="/category/marketing/" className="hover:text-apple-black transition-colors">Marketing & SEO</a></li>
                  <li><a href="/category/design/" className="hover:text-apple-black transition-colors">Design & UI/UX</a></li>
                  <li><a href="/category/education/" className="hover:text-apple-black transition-colors">Education</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-apple-black mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-apple-gray-500">
                  <li><a href="/category/research/" className="hover:text-apple-black transition-colors">Research Tools</a></li>
                  <li><a href="/category/business/" className="hover:text-apple-black transition-colors">Business & Finance</a></li>
                  <li><a href="/blog/" className="hover:text-apple-black transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-apple-black transition-colors">Newsletter</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-apple-black mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-apple-gray-500">
                  <li><a href="#" className="hover:text-apple-black transition-colors">About</a></li>
                  <li><a href="mailto:submit@aitools.directory" className="hover:text-apple-black transition-colors">Submit a Tool</a></li>
                  <li><a href="#" className="hover:text-apple-black transition-colors">Advertise</a></li>
                  <li><a href="#" className="hover:text-apple-black transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-apple-black transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-apple-gray-400">
                © {new Date().getFullYear()} AITools.Directory. All rights reserved.
              </p>
              <p className="text-xs text-apple-gray-400">
                Curated with care. Not affiliated with any listed tool.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
