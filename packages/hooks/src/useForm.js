'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = useForm;
const react_1 = require("react");
const validate = {
    required: (message) => ({
        required: message || 'This field is required',
    }),
    email: (message) => ({
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: message || 'Invalid email address',
        },
    }),
    minLength: (length, message) => ({
        minLength: {
            value: 8,
            message: message || `Must be at least ${length} characters`,
        },
    }),
};
function useForm(initialValues) {
    const [values, setValues] = (0, react_1.useState)(initialValues);
    const [errors, setErrors] = (0, react_1.useState)({});
    const [touchedFields, setTouchedFields] = (0, react_1.useState)({});
    const [dirtyFields, setDirtyFields] = (0, react_1.useState)({});
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const validations = (0, react_1.useRef)({});
    const initialRef = (0, react_1.useRef)(initialValues);
    const valuesRef = (0, react_1.useRef)(values);
    valuesRef.current = values;
    const validateField = (name, value) => {
        const rules = validations.current[name];
        if (!rules)
            return null;
        if (rules.required) {
            const message = typeof rules.required === 'string' ? rules.required : 'This field is required';
            if (value === '' || value === undefined || value === false)
                return message;
        }
        if (rules.minLength) {
            const { value: min, message } = typeof rules.minLength === 'object'
                ? rules.minLength
                : { value: rules.minLength, message: `Minimum length is ${rules.minLength}` };
            if (typeof value === 'string' && value.length < min)
                return message;
        }
        if (rules.pattern) {
            const { value: pattern, message } = rules.pattern instanceof RegExp
                ? { value: rules.pattern, message: 'Invalid format' }
                : rules.pattern;
            if (typeof value === 'string' && !pattern.test(value))
                return message;
        }
        if (rules.validate) {
            const result = rules.validate(value);
            if (typeof result === 'string')
                return result;
            if (result === false)
                return 'Invalid field';
        }
        return null;
    };
    const register = (0, react_1.useCallback)((name, options) => {
        if (options)
            validations.current[name] = options;
        return {
            name,
            value: values[name],
            onChange: (
            // eslint-disable-next-line no-undef
            e) => {
                const target = e.target;
                let val;
                // eslint-disable-next-line no-undef
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
    const reset = () => {
        setValues(initialRef.current);
        setErrors({});
        setTouchedFields({});
        setDirtyFields({});
        setIsSubmitting(false);
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
