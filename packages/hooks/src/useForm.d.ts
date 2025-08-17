import React from 'react';
type ValidationRule<T = unknown> = {
    required?: string;
    minLength?: {
        value: number;
        message: string;
    };
    minValue?: {
        value: number;
        message: string;
    };
    maxValue?: {
        value: number;
        message: string;
    };
    pattern?: RegExp | {
        value: RegExp;
        message: string;
    };
    password?: RegExp | {
        value: RegExp;
        message: string;
    };
    custom?: {
        fn: () => boolean;
        message?: string;
    };
    disabled?: boolean;
};
type RegisterOptions<T = unknown> = ValidationRule<T>;
export declare function useForm<T extends Record<string, unknown>>(initialValues: T): {
    register: (name: keyof T, options?: RegisterOptions<T[keyof T]>) => {
        name: keyof T;
        value: T[keyof T];
        disabled: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
        onBlur: () => void;
    };
    handleSubmit: (callback: (data: T) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
    reset: (fieldName?: keyof T) => void;
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
        required: (message?: string) => {
            required: string;
        };
        email: (message: string) => {
            pattern: {
                value: RegExp;
                message: string;
            };
        };
        password: (message?: string) => {
            pattern: {
                value: RegExp;
                message: string;
            };
        };
        url: (url: string) => {
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
        minValue: (value: number, message: string) => {
            minValue: {
                value: number;
                message: string;
            };
        };
        maxValue: (value: number, message: string) => {
            maxValue: {
                value: number;
                message: string;
            };
        };
        custom: (validateFn: () => boolean, message?: string) => {
            custom: {
                fn: () => boolean;
                message: string | undefined;
            };
        };
    };
    isSubmitAttempted: boolean;
};
export {};
//# sourceMappingURL=useForm.d.ts.map