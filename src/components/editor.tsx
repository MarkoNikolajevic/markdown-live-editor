'use client';

import { useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { languages } from '@codemirror/language-data';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import type { EditorView } from '@codemirror/view';
import { Toolbar } from './toolbar';

type EditorProps = {
  markdownContent: string;
  handleEditorChange: (value: string) => void;
};

export function Editor({ markdownContent, handleEditorChange }: EditorProps) {
  const editorRef = useRef<EditorView | null>(null);

  return (
    <div className='border-r border-gray-800'>
      <div className='flex items-center justify-between border-b border-gray-800 bg-[#252526] px-4 py-2'>
        <span className='text-sm font-medium text-gray-400'>MARKDOWN</span>
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
