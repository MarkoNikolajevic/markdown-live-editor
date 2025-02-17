import type { LucideIcon } from 'lucide-react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image,
  Link,
  Code,
  Quote
} from 'lucide-react';

export type ToolbarAction = {
  icon: LucideIcon;
  label: string;
  action: () => void;
}

export const createToolbarActions = (insertMarkdown: (start: string, end?: string) => void): ToolbarAction[] => [
  { icon: Bold, label: 'Bold', action: () => insertMarkdown('**', '**') },
  { icon: Italic, label: 'Italic', action: () => insertMarkdown('*', '*') },
  { icon: List, label: 'Unordered List', action: () => insertMarkdown('- ') },
  { icon: ListOrdered, label: 'Ordered List', action: () => insertMarkdown('1. ') },
  { icon: Image, label: 'Image', action: () => insertMarkdown('![Alt text](', ')') },
  { icon: Link, label: 'Link', action: () => insertMarkdown('[', '](url)') },
  { icon: Code, label: 'Code', action: () => insertMarkdown('`', '`') },
  { icon: Quote, label: 'Quote', action: () => insertMarkdown('> ') }
];