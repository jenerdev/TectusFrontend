'use client';
import { useEffect } from "react";

/**
 * useEffectDebounce
 * Runs the effect only after the dependencies stop changing for `delay` ms.
 */
export function useEffectDebounce(
  effect: () => void | (() => void),
  deps: any[],
  delay: number = 100
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}
