"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBEM = void 0;
const react_1 = require("react");
const useBEM = (block, className) => {
    const appendModifiers = (baseClass, modifiers) => {
        if (!modifiers || (Array.isArray(modifiers) && modifiers.length === 0)) {
            return baseClass;
        }
        const mods = Array.isArray(modifiers) ? modifiers : [modifiers];
        const modifiedClasses = mods.filter(Boolean).map((mod) => `${baseClass}--${mod}`);
        return [baseClass, ...modifiedClasses].filter(Boolean).join(' ');
    };
    const getBlock = (0, react_1.useCallback)((modifier, others) => {
        const otherClasses = [others, className].filter(Boolean).join(' ');
        return appendModifiers(block, modifier) + ` ${otherClasses}`;
    }, [block, className]);
    const getElement = (0, react_1.useCallback)((element, modifier, others) => {
        const elementClass = `${block}__${element}`;
        const otherClasses = others ? ` ${others}` : '';
        return appendModifiers(elementClass, modifier) + otherClasses;
    }, [block]);
    return {
        B: getBlock,
        E: getElement,
    };
};
exports.useBEM = useBEM;
