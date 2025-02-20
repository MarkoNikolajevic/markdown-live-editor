'use client';

import { useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { languages } from '@codemirror/language-data';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import type { EditorView } from '@codemirror/view';
import { Eye } from 'lucide-react';
import { Toolbar } from '@/components/toolbar';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

type EditorProps = {
  markdownContent: string;
  handleEditorChange: (value: string) => void;
};

export function Editor({ markdownContent, handleEditorChange }: EditorProps) {
  const editorRef = useRef<EditorView | null>(null);
  const { activeView, toggleView } = useUIStore();

  return (
    <div
      className={cn('border-r border-gray-800 md:block', {
        'block max-md:col-span-2': activeView === 'editor',
        hidden: activeView === 'preview'
      })}
    >
      <div className='flex items-center justify-between border-b border-gray-800 bg-[#252526] p-4'>
        <span className='text-sm font-medium text-gray-400 uppercase'>
          Markdown
        </span>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleView}
          className='md:hidden'
        >
          <Eye className='size-4' />
        </Button>
      </div>
      <Toolbar editorRef={editorRef} />
      <CodeMirror
        value={markdownContent}
        height='calc(100vh - 88px)'
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages })
        ]}
        onChange={handleEditorChange}
        className='bg-[#1e1e1e]'
        theme='dark'
        onCreateEditor={(view) => {
          editorRef.current = view;
        }}
      />
    </div>
  );
}
