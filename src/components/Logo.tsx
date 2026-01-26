'use client';

import { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  animateOnLoad?: boolean;
}

export default function Logo({ className = '', animateOnLoad = false }: LogoProps) {
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    // Only animate on load if prop is true
    if (animateOnLoad) {
      const loadTimer = setTimeout(() => {
        setSwapped(true);
      }, 300);
      return () => clearTimeout(loadTimer);
    }
  }, [animateOnLoad]);

  return (
    <div
      className={className}
      style={{ width: 60, height: 40 }}
    >
      <svg
        width="60"
        height="40"
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Left ring - moves right when swapped */}
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="black"
          strokeWidth="4"
          style={{
            transform: swapped ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />

        {/* Right ring - moves left when swapped */}
        <circle
          cx="40"
          cy="20"
          r="16"
          fill="none"
          stroke="black"
          strokeWidth="4"
          style={{
            transform: swapped ? 'translateX(-20px)' : 'translateX(0)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </svg>
    </div>
  );
}
