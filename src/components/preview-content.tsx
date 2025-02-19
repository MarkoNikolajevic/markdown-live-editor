import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export function PreviewContent({
  markdownContent
}: {
  markdownContent: string;
}) {
  return (
    <div
      className={cn(
        'h-[calc(100vh-88px)] overflow-auto px-4 py-8',
        'prose max-w-none prose-invert',
        'prose-headings:border-gray-800 prose-headings:font-semibold',
        'prose-p:text-gray-300',
        'prose-a:text-orange-500 prose-blockquote:border-l-orange-400 prose-blockquote:text-gray-300',
        'prose-code:text-gray-300',
        'prose-pre:bg-[#252526]'
      )}
    >
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}
