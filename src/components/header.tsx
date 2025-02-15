'use client';

import { useState } from 'react';

export function Header() {
  const [documentName, setDocumentName] = useState('welcome.md');
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <header className='flex items-center justify-between border-b border-gray-800 bg-[#252526] px-4 py-2'>
      <div className='flex items-center gap-4'>
        <div className='flex flex-col'>
          <span className='text-xs text-gray-400'>Document Name</span>
          {isEditing ? (
            <input
              type='text'
              value={documentName}
              onChange={handleNameChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={handleKeyDown}
              className='rounded bg-[#3c3c3c] px-1 text-sm outline-none'
              autoFocus
            />
          ) : (
            <span
              className='cursor-pointer text-sm hover:text-blue-400'
              onClick={() => setIsEditing(true)}
            >
              {documentName}
            </span>
          )}
        </div>
      </div>
      <div className='flex items-center gap-2'></div>
    </header>
  );
}
