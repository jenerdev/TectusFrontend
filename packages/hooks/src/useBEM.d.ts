type Modifier = string | string[] | undefined;
interface BEM {
    B: (modifier?: Modifier, others?: string) => string;
    E: (element: string, modifier?: Modifier, others?: string) => string;
}
export declare const useBEM: (block: string, className?: string) => BEM;
export {};
//# sourceMappingURL=useBEM.d.ts.map