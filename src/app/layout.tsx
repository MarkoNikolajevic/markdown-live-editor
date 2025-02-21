import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Markdown Live Editor - Real-time Preview Markdown Editor',
  description:
    'A modern, feature-rich markdown editor with live preview, PDF export, and dark mode. Write and preview markdown in real-time with syntax highlighting.',
  keywords: [
    'markdown editor',
    'live preview',
    'real-time markdown',
    'markdown to PDF',
    'text editor',
    'document editor',
    'writing tool',
    'markdown converter',
    'web-based editor'
  ],
  authors: [
    { name: 'Marko Nikolajević', url: 'https://github.com/MarkoNikolajevic' }
  ],
  creator: 'Marko Nikolajević',
  applicationName: 'Markdown Live Editor'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistMono.variable} font-mono antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
