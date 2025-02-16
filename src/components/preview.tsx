'use client';

import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

type PreviewProps = {
  markdownContent: string;
};

export function Preview({ markdownContent }: PreviewProps) {
  return (
    <div>
      <div className='flex items-center justify-between border-b border-gray-800 bg-[#252526] px-4 py-2'>
        <span className='text-sm font-medium text-gray-400'>PREVIEW</span>
      </div>
      <div
        className={cn(
          'h-[calc(100vh-88px)] overflow-auto p-8',
          'prose max-w-none prose-invert',
          'prose-headings:border-gray-800 prose-headings:font-semibold',
          'prose-p:text-gray-300',
          'prose-blockquote:border-l-gray-800 prose-blockquote:text-gray-300',
          'prose-code:text-gray-300',
          'prose-pre:bg-[#252526]'
        )}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
}
