'use client';

import React, { useState, useRef, useCallback } from 'react';

type ValidationRule<T = unknown> = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: T) => boolean | string;
};

type RegisterOptions<T = unknown> = ValidationRule<T>;
type FormErrors<T> = Partial<Record<keyof T, string>>;
type FieldStates<T> = Partial<Record<keyof T, boolean>>;

const validate = {
  required: (message: string) => ({
    required: message || 'This field is required',
  }),
  email: (message: string) => ({
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: message || 'Invalid email address',
    },
  }),
  minLength: (length: number, message: string) => ({
    minLength: {
      value: 8,
      message: message || `Must be at least ${length} characters`,
    },
  }),
};

export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touchedFields, setTouchedFields] = useState<FieldStates<T>>({});
  const [dirtyFields, setDirtyFields] = useState<FieldStates<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validations = useRef<Partial<Record<keyof T, RegisterOptions<T[keyof T]>>>>({});
  const initialRef = useRef(initialValues);
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const validateField = (name: keyof T, value: T[keyof T]): string | null => {
    const rules = validations.current[name];
    if (!rules) return null;

    if (rules.required) {
      const message =
        typeof rules.required === 'string' ? rules.required : 'This field is required';
      if (value === '' || value === undefined || value === false) return message;
    }

    if (rules.minLength) {
      const { value: min, message } =
        typeof rules.minLength === 'object'
          ? rules.minLength
          : { value: rules.minLength, message: `Minimum length is ${rules.minLength}` };

      if (typeof value === 'string' && value.length < min) return message;
    }

    if (rules.pattern) {
      const { value: pattern, message } =
        rules.pattern instanceof RegExp
          ? { value: rules.pattern, message: 'Invalid format' }
          : rules.pattern;

      if (typeof value === 'string' && !pattern.test(value)) return message;
    }

    if (rules.validate) {
      const result = rules.validate(value);
      if (typeof result === 'string') return result;
      if (result === false) return 'Invalid field';
    }

    return null;
  };

  const register = useCallback(
    (name: keyof T, options?: RegisterOptions<T[keyof T]>) => {
      if (options) validations.current[name] = options;

      return {
        name,
        value: values[name],
        onChange: (
          // eslint-disable-next-line no-undef
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        ) => {
          const target = e.target;
          let val: unknown;

          // eslint-disable-next-line no-undef
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

      const newErrors: FormErrors<T> = {};
      let hasError = false;

      for (const name in validations.current) {
        const val = valuesRef.current[name];
        const error = validateField(name, val);
        if (error) {
          newErrors[name] = error;
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

  const reset = () => {
    setValues(initialRef.current);
    setErrors({});
    setTouchedFields({});
    setDirtyFields({});
    setIsSubmitting(false);
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

  const isValid = Object.keys(errors).length === 0;
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
  };
}
