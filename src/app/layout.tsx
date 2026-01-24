/**
 * ROOT LAYOUT
 * 
 * This file wraps every page on your site.
 * The {children} is where each page's content appears.
 */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Your Name',
  description: 'Your personal website.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
