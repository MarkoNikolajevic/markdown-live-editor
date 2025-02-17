import { useCallback } from 'react';
import type { EditorView } from '@codemirror/view';

export function useMarkdownEditor(editorRef: React.RefObject<EditorView | null>) {
  const insertMarkdown = useCallback(
    (start: string, end = '') => {
      const editor = editorRef.current;
      if (editor) {
        const { from, to } = editor.state.selection.main;
        const selectedText = editor.state.sliceDoc(from, to);
        const newText = `${start}${selectedText}${end}`;
        editor.dispatch({
          changes: { from, to, insert: newText },
          selection: {
            anchor: from + start.length,
            head: from + start.length + selectedText.length
          }
        });
        editor.focus();
      }
    },
    [editorRef]
  );

  return { insertMarkdown };
}