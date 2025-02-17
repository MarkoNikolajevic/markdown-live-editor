'use client';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type { EditorView } from '@codemirror/view';
import { createToolbarActions } from '@/types/mardown-toolbar-actions';
import { useMarkdownEditor } from '@/hooks/useMarkdownEditor';

type MarkdownToolbarProps = {
  editorRef: React.RefObject<EditorView | null>;
};

export function Toolbar({ editorRef }: MarkdownToolbarProps) {
  const { insertMarkdown } = useMarkdownEditor(editorRef);
  const toolbarActions = createToolbarActions(insertMarkdown);

  return (
    <TooltipProvider>
      <div className='flex space-x-1 p-2'>
        {toolbarActions.map((action, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='size-8 cursor-pointer text-gray-400 hover:bg-orange-500 hover:text-white'
                onClick={action.action}
              >
                <action.icon className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
