'use client';
import type { ComponentPropsWithoutRef } from 'react';
import { Sidebar } from '@/components/sidebar';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

type MainProps = ComponentPropsWithoutRef<'main'>;

export function Main({ children, className }: MainProps) {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  return (
    <main className={cn('grid grid-cols-2', className)}>
      {children} {isSidebarOpen && <Sidebar />}
    </main>
  );
}
