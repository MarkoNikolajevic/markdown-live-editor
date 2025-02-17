'use client';
import { useState } from 'react';
import { File, PanelRight, Save, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDocumentStore } from '@/store/useDocumentStore';
import { useUIStore } from '@/store/useUIStore';

export function Header() {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const currentDocument = useDocumentStore((state) => state.currentDocument);
  const saveDocument = useDocumentStore((state) => state.saveDocument);
  const deleteDocument = useDocumentStore((state) => state.deleteDocument);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  const handleStartEditing = () => {
    setTempName(currentDocument?.name || '');
    setIsEditing(true);
  };

  const handleFinishEditing = () => {
    if (currentDocument && tempName.trim()) {
      saveDocument({
        ...currentDocument,
        name: tempName.trim()
      });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFinishEditing();
    if (e.key === 'Escape') setIsEditing(false);
  };

  const handleSave = () => {
    if (currentDocument) saveDocument(currentDocument);
  };

  const handleDelete = () => {
    if (currentDocument) deleteDocument(currentDocument.name);
  };

  return (
    <header className='flex items-center border-b border-gray-800 bg-[#252526] px-4 py-2'>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='icon' onClick={toggleSidebar}>
          <PanelRight className='size-4' />
        </Button>
        <p className='uppercase'>Markdown Live Editor</p>
      </div>
      <div className='ml-16 flex items-center gap-2'>
        <File className='text-gray-400' />
        <div className='flex flex-col'>
          <span className='text-xs text-gray-400'>Document name</span>
          {isEditing ? (
            <input
              type='text'
              value={tempName}
              onChange={handleNameChange}
              onBlur={handleFinishEditing}
              onKeyDown={handleKeyDown}
              className='rounded bg-[#3c3c3c] px-1 text-sm outline-none'
              autoFocus
            />
          ) : (
            <span
              className='cursor-pointer text-sm hover:text-blue-400'
              onClick={handleStartEditing}
            >
              {currentDocument?.name || 'Untitled'}
            </span>
          )}
        </div>
      </div>
      <div className='ml-auto flex items-center gap-2'>
        <Button variant={'ghost'} size={'icon'} onClick={handleDelete}>
          <Trash className='size-4' />
        </Button>
        <Button onClick={handleSave}>
          <Save className='size-4' />
          Save changes
        </Button>
      </div>
    </header>
  );
}
