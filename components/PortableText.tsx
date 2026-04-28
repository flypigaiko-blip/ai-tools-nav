'use client';

import { PortableText as PortableTextReact } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

const components = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-[24px] font-semibold text-apple-black mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-[20px] font-semibold text-apple-black mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-[17px] font-semibold text-apple-black mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-[16px] text-apple-gray-600 leading-[1.75] mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-apple-blue pl-5 py-2 my-6 bg-blue-50/50 rounded-r-lg italic text-apple-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-[16px] text-apple-gray-600 leading-[1.75]">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-[16px] text-apple-gray-600 leading-[1.75]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li>{children}</li>
    ),
    number: ({ children }: any) => (
      <li>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-apple-black">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em>{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-apple-blue hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-xl overflow-hidden">
            <Image
              src={urlFor(value).width(800).fit('max').auto('format').url()}
              alt={value.alt || ''}
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-apple-gray-400 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableText({ content }: { content: any[] }) {
  if (!content) return null;
  return <PortableTextReact value={content} components={components} />;
}
