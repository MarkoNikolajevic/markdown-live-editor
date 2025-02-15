'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [markdown, setMarkdown] = useState('# Hello, Markdown!');

  return (
    <main className='container mx-auto p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Markdown Editor</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <h2 className='mb-2 text-xl font-semibold'>Input</h2>
          <textarea
            className='h-[70vh] w-full rounded border border-gray-300 p-2'
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div>
          <h2 className='mb-2 text-xl font-semibold'>Preview</h2>
          <div className='h-[70vh] w-full overflow-auto rounded border border-gray-300 p-2'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}
