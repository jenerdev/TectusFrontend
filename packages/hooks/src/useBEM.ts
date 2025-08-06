import { useCallback } from 'react';

type Modifier = string | string[] | undefined;

interface BEM {
  B: (modifier?: Modifier, others?: string) => string;
  E: (element: string, modifier?: Modifier, others?: string) => string;
}

export const useBEM = (block: string, className?: string): BEM => {
  const appendModifiers = (baseClass: string, modifiers?: Modifier): string => {
    if (!modifiers || (Array.isArray(modifiers) && modifiers.length === 0)) {
      return baseClass;
    }

    const mods = Array.isArray(modifiers) ? modifiers : [modifiers];
    const modifiedClasses = mods.filter(Boolean).map((mod) => `${baseClass}--${mod}`);
    return [baseClass, ...modifiedClasses, className].filter(Boolean).join(' ');
  };

  const getBlock = useCallback(
    (modifier?: Modifier, others?: string) => {
      const otherClasses = others ? ` ${others}` : '';
      return appendModifiers(block, modifier) + otherClasses;
    },
    [block],
  );

  const getElement = useCallback(
    (element: string, modifier?: Modifier, others?: string) => {
      const elementClass = `${block}__${element}`;
      const otherClasses = others ? ` ${others}` : '';
      return appendModifiers(elementClass, modifier) + otherClasses;
    },
    [block],
  );

  return {
    B: getBlock,
    E: getElement,
  };
};
