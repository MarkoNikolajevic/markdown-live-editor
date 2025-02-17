import { PreviewContent } from './preview-content';

type PreviewProps = {
  markdownContent: string;
};

export function Preview({ markdownContent }: PreviewProps) {
  return (
    <div>
      <div className='flex items-center justify-between border-b border-gray-800 bg-[#252526] px-4 py-2'>
        <span className='text-sm font-medium text-gray-400 uppercase'>
          Preview
        </span>
      </div>
      <PreviewContent markdownContent={markdownContent} />
    </div>
  );
}
