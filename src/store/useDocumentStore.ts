import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '@/lib/utils';

type Document = {
  id: string;
  name: string;
  content: string;
  lastModified: Date;
}

interface DocumentStore {
  documents: Document[];
  currentDocument: Document | null;
  saveDocument: (document: Document) => void;
  createDocument: (name: string) => void;
  setCurrentDocument: (document: Document) => void;
  deleteDocument: (id: string) => void;
}

const markdown = `
# Welcome to Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.
    
## How to use this?
    
1. Write markdown in the markdown editor window
2. See the rendered markdown in the preview window
    
### Features
    
- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
- Name and save the document to access again later
    
> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).
    
#### Headings
    
To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.
    
##### Lists
    
You can see examples of ordered and unordered lists above.

This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:
    
\`\`\`
<main>
  <h1>This is a larger code block</h1>
</main>
\`\`\`
`;

const defaultDocument: Document = {
  id: generateId(),
  name: 'welcome',
  content: markdown,
  lastModified: new Date(),
};

export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set) => ({
      documents: [defaultDocument],
      currentDocument: defaultDocument,
      saveDocument: (document) =>
        set((state) => {
          const updatedDoc = { ...document, lastModified: new Date() };
          const index = state.documents.findIndex(doc => doc.id === document.id);

          if (index !== -1) {
            const updatedDocs = [...state.documents];
            updatedDocs[index] = updatedDoc;
            return {
              documents: updatedDocs,
              currentDocument: updatedDoc
            };
          }

          return {
            documents: [...state.documents, updatedDoc],
            currentDocument: updatedDoc
          };
        }),

      createDocument: (name) =>
        set((state) => {
          const newDocument = {
            id: generateId(),
            name,
            content: '',
            lastModified: new Date(),
          };
          return {
            documents: [...state.documents, newDocument],
            currentDocument: newDocument,
          };
        }),

      setCurrentDocument: (document) =>
        set({ currentDocument: document }),

      deleteDocument: (id: string) =>
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
          currentDocument: state.currentDocument?.id === id ? null : state.currentDocument,
        }))
    }),
    {
      name: 'document-store',
    }
  )
);
