/**
 * ROOT LAYOUT
 * 
 * This file wraps every page on your site.
 * The {children} is where each page's content appears.
 */

import type { Metadata } from 'next';
import './globals.css';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Vinnie',
  description: "Vinnie's personal website",
  icons: {
    icon: '/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
