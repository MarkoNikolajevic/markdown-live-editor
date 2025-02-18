import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleSidebar } from '@/components/toggle-sidebar';
import { useDocumentStore } from '@/store/useDocumentStore';

export function Sidebar() {
  const documents = useDocumentStore((state) => state.documents);
  const currentDocument = useDocumentStore((state) => state.currentDocument);
  const createDocument = useDocumentStore((state) => state.createDocument);
  const setCurrentDocument = useDocumentStore(
    (state) => state.setCurrentDocument
  );

  const handleCreateDocument = () => {
    const documentName = `Document ${documents.length + 1}`;
    createDocument(documentName);
  };

  return (
    <aside className='fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-800 bg-[#252526] transition-transform duration-300 ease-in-out'>
      <div className='flex flex-col gap-4 border-b border-gray-800 p-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-400 uppercase'>
            My docs
          </h2>
          <ToggleSidebar />
        </div>
        <Button onClick={handleCreateDocument}>
          <Plus className='size-4' />
          <span className='hidden md:block'>New document</span>
        </Button>
      </div>
      <ScrollArea className='h-[calc(100vh-64px)] p-4'>
        {documents.map((doc) => (
          <div
            key={doc.name}
            className={`mb-2 flex items-center justify-between rounded-md p-2 ${
              currentDocument?.name === doc.name
                ? 'bg-[#37373d]'
                : 'hover:bg-[#2a2a2d]'
            }`}
            onClick={() => setCurrentDocument(doc)}
          >
            <p className='text-md flex flex-col font-medium text-white'>
              <small className='text-xs text-gray-400'>
                {new Date(doc.lastModified).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </small>
              {doc.name}
            </p>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
