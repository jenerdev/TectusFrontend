'use client';
import { useEffect, useState, useCallback } from 'react';

// Define breakpoints map (same as in SCSS)
const breakpoints: Record<string, number> = {
  mobile: 480,
  'tablet-sm': 600,
  'tablet-md': 768,
  'tablet-lg': 900,
  laptop: 1024,
  desktop: 1280,
  'desktop-lg': 1536,
};

export function useBreakpoint() {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Track window resize
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function: check if viewport is greater than a breakpoint
  const isGreaterThan = useCallback(
    (breakpoint: keyof typeof breakpoints) => {
      const bpValue = breakpoints[breakpoint];
      return bpValue ? width >= bpValue : false;
    },
    [width],
  );

  // Function: check if viewport is smaller than a breakpoint
  const isLessThan = useCallback(
    (breakpoint: keyof typeof breakpoints) => {
      const bpValue = breakpoints[breakpoint];
      return bpValue ? width < bpValue : false;
    },
    [width],
  );

  return { width, isGreaterThan, isLessThan };
}
