import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { EditorWrapper } from '@/components/editor-wrapper';

export default function Home() {
  return (
    <div className='min-h-screen bg-[#1e1e1e] text-white'>
      <Header />
      <Main>
        <EditorWrapper />
      </Main>
    </div>
  );
}
