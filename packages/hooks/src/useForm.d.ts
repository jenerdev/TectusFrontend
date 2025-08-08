import React from 'react';
type ValidationRule<T = unknown> = {
    required?: boolean | string;
    minLength?: number | {
        value: number;
        message: string;
    };
    pattern?: RegExp | {
        value: RegExp;
        message: string;
    };
    validate?: (value: T) => boolean | string;
};
type RegisterOptions<T = unknown> = ValidationRule<T>;
export declare function useForm<T extends Record<string, unknown>>(initialValues: T): {
    register: (name: keyof T, options?: RegisterOptions<T[keyof T]>) => {
        name: keyof T;
        value: T[keyof T];
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
        onBlur: () => void;
    };
    handleSubmit: (callback: (data: T) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
    reset: () => void;
    setValue: (name: keyof T, value: T[keyof T]) => void;
    setError: (name: keyof T, message: string) => void;
    clearError: (name: keyof T) => void;
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touchedFields: Partial<Record<keyof T, boolean>>;
    dirtyFields: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    isDirty: boolean;
    isValid: boolean;
    validate: {
        required: (message: string) => {
            required: string;
        };
        email: (message: string) => {
            pattern: {
                value: RegExp;
                message: string;
            };
        };
        minLength: (length: number, message: string) => {
            minLength: {
                value: number;
                message: string;
            };
        };
    };
};
export {};
//# sourceMappingURL=useForm.d.ts.map