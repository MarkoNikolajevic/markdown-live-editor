import { Eye, EyeOff } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/button';
import { PreviewContent } from '@/components/preview-content';
import { cn } from '@/lib/utils';

type PreviewProps = {
  markdownContent: string;
};

export function Preview({ markdownContent }: PreviewProps) {
  const {
    activeView,
    toggleView,
    isFullscreenPreview,
    toggleFullscreenPreview
  } = useUIStore();

  return (
    <div
      className={cn('md:block', {
        'block max-md:col-span-2': activeView === 'preview',
        hidden: activeView === 'editor',
        'md:col-span-2': isFullscreenPreview
      })}
    >
      <div className='flex items-center justify-between border-b border-gray-800 bg-[#252526] px-4 py-2'>
        <span className='text-sm font-medium text-gray-400 uppercase'>
          Preview
        </span>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleFullscreenPreview}
          className='max-md:hidden'
        >
          {isFullscreenPreview ? (
            <EyeOff className='size-4' />
          ) : (
            <Eye className='size-4' />
          )}
        </Button>
        {activeView === 'preview' && (
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleView}
            className='md:hidden'
          >
            <EyeOff className='size-4' />
          </Button>
        )}
      </div>
      <PreviewContent markdownContent={markdownContent} />
    </div>
  );
}
