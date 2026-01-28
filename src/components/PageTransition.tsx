'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const FADE_DURATION = 350;

function getDuration() {
  if (typeof window === 'undefined') return FADE_DURATION;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : FADE_DURATION;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [opacity, setOpacity] = useState(0);

  // Fade in on mount and when pathname changes (new page)
  useEffect(() => {
    setOpacity(1);
  }, [pathname]);

  // Intercept link clicks in capture phase (before Next.js Link handles them)
  const handleClickCapture = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      if (!link || link.getAttribute('target') === '_blank') return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#')) return;
      if (href === pathname) return;

      e.preventDefault();
      e.stopPropagation();
      const duration = getDuration();
      setOpacity(0);

      setTimeout(() => {
        router.push(href);
      }, duration);
    },
    [pathname, router]
  );

  return (
    <div
      className="page-transition"
      style={{
        opacity,
        transition: `opacity ${FADE_DURATION}ms ease-out`,
      }}
      onClickCapture={handleClickCapture}
    >
      {children}
    </div>
  );
}
