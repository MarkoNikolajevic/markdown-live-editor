'use client';
import { useCallback } from 'react';
import { Editor } from '@/components/editor';
import { Preview } from '@/components/preview';
import { useDocumentStore } from '@/store/useDocumentStore';
import { useUIStore } from '@/store/useUIStore';

export function EditorWrapper() {
  const currentDocument = useDocumentStore((state) => state.currentDocument);
  const saveDocument = useDocumentStore((state) => state.saveDocument);
  const isFullscreenPreview = useUIStore((state) => state.isFullscreenPreview);

  const handleEditorChange = useCallback(
    (value: string) => {
      if (currentDocument) {
        saveDocument({
          ...currentDocument,
          content: value
        });
      }
    },
    [currentDocument, saveDocument]
  );

  return (
    <>
      {!isFullscreenPreview && (
        <Editor
          markdownContent={currentDocument?.content ?? ''}
          handleEditorChange={handleEditorChange}
        />
      )}
      <Preview markdownContent={currentDocument?.content ?? ''} />
    </>
  );
}
