'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';

type ValidationRule<T = unknown> = {
  required?: string;
  minLength?: { value: number; message: string };
  minValue?: { value: number; message: string };
  maxValue?: { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  password?: RegExp | { value: RegExp; message: string };
  custom?: { fn: () => boolean; message?: string };
  disabled?: boolean;
};

type RegisterOptions<T = unknown> = ValidationRule<T>;
type FormErrors<T> = Partial<Record<keyof T, string>>;
type FieldStates<T> = Partial<Record<keyof T, boolean>>;

const validate = {
  required: (message?: string) => ({
    required: message || 'This field is required...',
  }),
  email: (message: string) => ({
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: message || 'Invalid email address',
    },
  }),
  password: (message?: string) => ({
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
      message:
        message || 'Password must contain at least one lowercase, uppercase, number, and symbol',
    },
  }),
  url: (url: string) => ({
    pattern: {
      value: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
      message: url || 'Invalid URL',
    },
  }),
  minLength: (length: number, message: string) => ({
    minLength: {
      value: length,
      message: message || `Must be at least ${length} characters`,
    },
  }),
  minValue: (value: number, message: string) => ({
    minValue: {
      value,
      message: message || `Must be greater than or equal ${value}`,
    },
  }),
  maxValue: (value: number, message: string) => ({
    maxValue: {
      value,
      message: message || `Must be less than or equal ${value}`,
    },
  }),
  custom: (validateFn: () => boolean, message?: string) => ({
    custom: {
      fn: validateFn,
      message,
    },
  }),
};

export function useForm<T extends object>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touchedFields, setTouchedFields] = useState<FieldStates<T>>({});
  const [dirtyFields, setDirtyFields] = useState<FieldStates<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const validations = useRef<Partial<Record<keyof T, RegisterOptions<T[keyof T]>>>>({});
  const initialRef = useRef(initialValues);
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const validateField = (name: keyof T, value: T[keyof T]): string | null => {
    const rules = validations.current[name];
    if (!rules || rules.disabled) return null;

    if (rules.required) {
      if (
        value === '' ||
        value === undefined ||
        value === false ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      )
        return rules.required;
    }

    if (rules.minLength) {
      const { value: min, message } = rules.minLength;
      if (typeof value === 'string' && value.length < min) return message;
    }

    if (rules.minValue) {
      const { value: min, message } = rules.minValue;
      if (Number(value) < min) return message;
    }

    if (rules.maxValue) {
      const { value: max, message } = rules.maxValue;
      if (Number(value) > max) return message;
    }

    if (rules.pattern) {
      const { value: pattern, message } =
        rules.pattern instanceof RegExp
          ? { value: rules.pattern, message: 'Invalid format' }
          : rules.pattern;

      if (typeof value === 'string' && !pattern.test(value)) return message;
    }

    if (rules.password) {
      const { value: pattern, message } =
        rules.password instanceof RegExp
          ? { value: rules.password, message: 'Invalid format' }
          : rules.password;

      if (typeof value === 'string' && !pattern.test(value)) return message;
    }

    if (rules.custom) {
      const { fn, message } = rules.custom;

      const result = fn();
      if (!result) return message || 'Invalid field';
    }

    return null;
  };

  const register = useCallback(
    (name: keyof T, options?: RegisterOptions<T[keyof T]>) => {
      if (options) validations.current[name] = options;

      return {
        name,
        value: values[name],
        disabled: options?.disabled ?? false, // ✅ forward disabled prop
        onChange: (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        ) => {
          const target = e.target;
          let val: unknown;

          if (target instanceof HTMLInputElement && target.type === 'checkbox') {
            val = target.checked;
          } else {
            val = target.value;
          }

          setValues((prev) => {
            const updated = { ...prev, [name]: val };
            const dirty = initialRef.current[name] !== val;

            const error = validateField(name, val as T[keyof T]);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error || undefined }));
            setDirtyFields((prev) => ({ ...prev, [name]: dirty }));

            return updated;
          });
        },
        onBlur: () => {
          setTouchedFields((prev) => ({ ...prev, [name]: true }));
        },
      };
    },
    [values],
  );

  const handleSubmit =
    (callback: (data: T) => void | Promise<void>) => async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitAttempted(true);

      const newErrors: FormErrors<T> = {};
      let hasError = false;

      for (const name in validations.current) {
        const val = valuesRef.current[name];
        const error = validateField(name as keyof T, val);
        if (error) {
          newErrors[name as keyof T] = error;
          hasError = true;
        }
      }

      setErrors(newErrors);

      if (!hasError) {
        setIsSubmitting(true);
        try {
          await callback(valuesRef.current);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

  const setValue = (name: keyof T, value: T[keyof T]) => {
    setValues((prev) => {
      const dirty = initialRef.current[name] !== value;
      const error = validateField(name, value);

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error || undefined }));
      setDirtyFields((prev) => ({ ...prev, [name]: dirty }));

      return { ...prev, [name]: value };
    });
  };

  const reset = (fieldName?: keyof T) => {
    if (fieldName) {
      const resetValue =
        (initialRef.current[fieldName] as T[keyof T]) ?? ('' as unknown as T[keyof T]);

      setValues((prev) => ({
        ...prev,
        [fieldName]: resetValue,
      }));

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });

      setTouchedFields((prev) => {
        const newTouched = { ...prev };
        delete newTouched[fieldName];
        return newTouched;
      });

      setDirtyFields((prev) => {
        const newDirty = { ...prev };
        delete newDirty[fieldName];
        return newDirty;
      });
    } else {
      setValues(
        Object.keys(initialRef.current).reduce(
          (acc, key) => ({
            ...acc,
            [key]:
              (initialRef.current[key as keyof T] as T[keyof T]) ?? ('' as unknown as T[keyof T]),
          }),
          {} as T,
        ),
      );
      setErrors({});
      setTouchedFields({});
      setDirtyFields({});
      setIsSubmitting(false);
      setIsSubmitAttempted(false);
    }
  };

  const setError = (name: keyof T, message: string) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const clearError = (name: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const isValid = (() => {
    const regs = validations.current as Partial<Record<string, RegisterOptions<T[keyof T]>>>;
    for (const key in regs) {
      const k = key as keyof T;
      const value = values[k];
      const error = validateField(k, value);
      if (error) return false;
    }
    return true;
  })();

  const isDirty = Object.values(dirtyFields).some(Boolean);

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearError,
    values,
    errors,
    touchedFields,
    dirtyFields,
    isSubmitting,
    isDirty,
    isValid,
    validate,
    isSubmitAttempted,
  };
}
