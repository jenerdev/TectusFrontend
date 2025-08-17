'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = useForm;
const react_1 = require("react");
const validate = {
    required: (message) => ({
        required: message || 'This field is required...',
    }),
    email: (message) => ({
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: message || 'Invalid email address',
        },
    }),
    password: (message) => ({
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
            message: message || 'Password must contain at least one lowercase, uppercase, number, and symbol',
        },
    }),
    url: (url) => ({
        pattern: {
            value: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
            message: url || 'Invalid URL',
        },
    }),
    minLength: (length, message) => ({
        minLength: {
            value: length,
            message: message || `Must be at least ${length} characters`,
        },
    }),
    minValue: (value, message) => ({
        minValue: {
            value,
            message: message || `Must be greater than or equal ${value}`,
        },
    }),
    maxValue: (value, message) => ({
        maxValue: {
            value,
            message: message || `Must be less than or equal ${value}`,
        },
    }),
    custom: (validateFn, message) => ({
        custom: {
            fn: validateFn,
            message,
        },
    }),
};
function useForm(initialValues) {
    const [values, setValues] = (0, react_1.useState)(initialValues);
    const [errors, setErrors] = (0, react_1.useState)({});
    const [touchedFields, setTouchedFields] = (0, react_1.useState)({});
    const [dirtyFields, setDirtyFields] = (0, react_1.useState)({});
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [isSubmitAttempted, setIsSubmitAttempted] = (0, react_1.useState)(false);
    const validations = (0, react_1.useRef)({});
    const initialRef = (0, react_1.useRef)(initialValues);
    const valuesRef = (0, react_1.useRef)(values);
    valuesRef.current = values;
    const validateField = (name, value) => {
        const rules = validations.current[name];
        if (!rules || rules.disabled)
            return null;
        if (rules.required) {
            if (value === '' ||
                value === undefined ||
                value === false ||
                value === null ||
                (Array.isArray(value) && value.length === 0))
                return rules.required;
        }
        if (rules.minLength) {
            const { value: min, message } = rules.minLength;
            if (typeof value === 'string' && value.length < min)
                return message;
        }
        if (rules.minValue) {
            const { value: min, message } = rules.minValue;
            if (Number(value) < min)
                return message;
        }
        if (rules.maxValue) {
            const { value: max, message } = rules.maxValue;
            if (Number(value) > max)
                return message;
        }
        if (rules.pattern) {
            const { value: pattern, message } = rules.pattern instanceof RegExp
                ? { value: rules.pattern, message: 'Invalid format' }
                : rules.pattern;
            if (typeof value === 'string' && !pattern.test(value))
                return message;
        }
        if (rules.password) {
            const { value: pattern, message } = rules.password instanceof RegExp
                ? { value: rules.password, message: 'Invalid format' }
                : rules.password;
            if (typeof value === 'string' && !pattern.test(value))
                return message;
        }
        if (rules.custom) {
            const { fn, message } = rules.custom;
            const result = fn();
            if (!result)
                return message || 'Invalid field';
        }
        return null;
    };
    const register = (0, react_1.useCallback)((name, options) => {
        if (options)
            validations.current[name] = options;
        return {
            name,
            value: values[name],
            disabled: options?.disabled ?? false, // ✅ forward disabled prop
            onChange: (e) => {
                const target = e.target;
                let val;
                if (target instanceof HTMLInputElement && target.type === 'checkbox') {
                    val = target.checked;
                }
                else {
                    val = target.value;
                }
                setValues((prev) => {
                    const updated = { ...prev, [name]: val };
                    const dirty = initialRef.current[name] !== val;
                    const error = validateField(name, val);
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: error || undefined }));
                    setDirtyFields((prev) => ({ ...prev, [name]: dirty }));
                    return updated;
                });
            },
            onBlur: () => {
                setTouchedFields((prev) => ({ ...prev, [name]: true }));
            },
        };
    }, [values]);
    const handleSubmit = (callback) => async (e) => {
        e.preventDefault();
        setIsSubmitAttempted(true);
        const newErrors = {};
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
            }
            finally {
                setIsSubmitting(false);
            }
        }
    };
    const setValue = (name, value) => {
        setValues((prev) => {
            const dirty = initialRef.current[name] !== value;
            const error = validateField(name, value);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error || undefined }));
            setDirtyFields((prev) => ({ ...prev, [name]: dirty }));
            return { ...prev, [name]: value };
        });
    };
    const reset = (fieldName) => {
        if (fieldName) {
            const resetValue = initialRef.current[fieldName] ?? '';
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
        }
        else {
            setValues(Object.keys(initialRef.current).reduce((acc, key) => ({
                ...acc,
                [key]: initialRef.current[key] ?? '',
            }), {}));
            setErrors({});
            setTouchedFields({});
            setDirtyFields({});
            setIsSubmitting(false);
            setIsSubmitAttempted(false);
        }
    };
    const setError = (name, message) => {
        setErrors((prev) => ({ ...prev, [name]: message }));
    };
    const clearError = (name) => {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };
    const isValid = (() => {
        const regs = validations.current;
        for (const key in regs) {
            const k = key;
            const value = values[k];
            const error = validateField(k, value);
            if (error)
                return false;
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
