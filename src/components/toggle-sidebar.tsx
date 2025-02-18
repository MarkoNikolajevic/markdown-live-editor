import { useEffect } from 'react';
import { PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useUIStore } from '@/store/useUIStore';

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className='pointer-events-none inline-flex h-5 items-center rounded border border-gray-600 bg-gray-800 px-1 text-sm font-medium text-gray-400 select-none'>
      {children}
    </kbd>
  );
}

export function ToggleSidebar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleSidebar]);

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcutText = isMac ? '⌘' : 'Ctrl';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='icon' onClick={toggleSidebar}>
            <PanelRight className='size-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <span className='flex items-center gap-2'>
            Toggle sidebar{' '}
            <span className='flex items-center gap-1'>
              <Kbd>{shortcutText}</Kbd>
              <Kbd>B</Kbd>
            </span>
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
