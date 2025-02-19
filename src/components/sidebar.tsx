import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleSidebar } from '@/components/toggle-sidebar';
import { useDocumentStore } from '@/store/useDocumentStore';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const documents = useDocumentStore((state) => state.documents);
  const currentDocument = useDocumentStore((state) => state.currentDocument);
  const createDocument = useDocumentStore((state) => state.createDocument);
  const deleteDocument = useDocumentStore((state) => state.deleteDocument);
  const setCurrentDocument = useDocumentStore(
    (state) => state.setCurrentDocument
  );

  const handleCreateDocument = () => {
    const documentName = `Document ${documents.length + 1}`;
    createDocument(documentName);
  };

  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 256, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 200
      }}
      className='fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-800 bg-[#252526]/80 backdrop-blur-sm'
    >
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
        <AnimatePresence mode='popLayout'>
          {documents.map((doc) => (
            <motion.div
              key={doc.name}
              layout
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring' }}
              className={cn('mb-2 flex items-center rounded-md p-2', {
                'bg-[#37373d]': currentDocument?.name === doc.name,
                'hover:bg-[#2a2a2d]': currentDocument?.name !== doc.name
              })}
              onClick={() => setCurrentDocument(doc)}
            >
              <p className='text-md flex w-full justify-between font-medium text-white'>
                <span className='flex flex-col'>
                  <small className='text-xs text-gray-400'>
                    {new Date(doc.lastModified).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </small>
                  {doc.name}
                </span>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDocument(doc.id);
                  }}
                >
                  <Trash2 className='size-4' />
                </Button>
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
    </motion.aside>
  );
}
