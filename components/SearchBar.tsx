'use client';

import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search AI tools..."
          className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-100 text-[15px] text-apple-black placeholder:text-apple-gray-400 border border-transparent focus:border-apple-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-apple-blue/10 transition-all"
          aria-label="Search AI tools"
        />
      </div>
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-black/[0.04] p-2 max-h-[400px] overflow-y-auto z-50">
          <SearchResults query={query} />
        </div>
      )}
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  // Dynamic import to avoid loading all tools in the main bundle
  const { searchTools } = require('@/data/tools');
  const results = searchTools(query);

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-apple-gray-400">
        No tools found for &ldquo;{query}&rdquo;
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] text-apple-gray-400 px-3 py-1.5">
        {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
      {results.slice(0, 8).map((tool: any) => (
        <a
          key={tool.id}
          href={`/tool/${tool.slug}/`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <span className="text-xl shrink-0">{tool.logo}</span>
          <div className="flex-1 min-w-0">
            <span className="text-[14px] font-medium text-apple-black truncate block">
              {tool.name}
            </span>
            <span className="text-[12px] text-apple-gray-400 truncate block">
              {tool.shortDescription}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
