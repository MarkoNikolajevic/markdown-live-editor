import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type MainProps = ComponentPropsWithoutRef<'main'>;

export function Main({ children, className }: MainProps) {
  return <main className={cn('grid grid-cols-2', className)}>{children}</main>;
}
