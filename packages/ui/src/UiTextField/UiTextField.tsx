'use client';

import * as React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import UiIcon, { UiIconProps } from '../UiIcon/UiIcon';
import { useBEM } from '@tectus/hooks';
import './UiTextField.scss';
import { JSX, useMemo } from 'react';

const enableGooglePlaces = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_PLACES === 'true';

export interface UiTextFieldProps {
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  helperText?: string;
  type?: TextFieldProps['type'];
  error?: boolean;
  variant?: TextFieldProps['variant'];
  fullWidth?: boolean;
  size?: TextFieldProps['size'];
  value?: TextFieldProps['value'];
  readOnly?: boolean;
  disabled?: boolean;
  maxRows?: number;
  rows?: number;
  multiline?: boolean;
  register?: ReturnType<any>;
  onChange?: TextFieldProps['onChange'];
  disablePastDates?: boolean;
  /** Enable Google Places Autocomplete */
  googlePlaces?: boolean;
  /** Restrict Google Places results by country code (e.g., "us") */
  googlePlacesCountry?: string;
  /** Callback when a place is selected */
  onPlaceSelected?: (place: any) => void;

  endIcon?: UiIconProps['name'];
}

export const UiTextField: React.FC<UiTextFieldProps> = ({
  googlePlaces = false,
  googlePlacesCountry,
  onPlaceSelected,
  ...props
}) => {
  const {
    id,
    name,
    label,
    className,
    placeholder,
    helperText,
    type = 'text',
    error,
    variant = 'filled',
    fullWidth = true,
    size = 'medium',
    value,
    readOnly,
    disabled,
    maxRows,
    rows,
    multiline,
    register,
    onChange,
    disablePastDates,
    endIcon,
  } = props;

  const { B, E } = useBEM('ui-text-field', className);
  const isDateField = type === 'date';
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Attach Google Places Autocomplete when googlePlaces is true
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!enableGooglePlaces || !googlePlaces || !inputRef.current) return;

    const google = (window as any).google;
    if (!google || !google.maps?.places) {
      console.warn('Google Maps API not loaded');
      return;
    }

    // const options: google.maps.places.AutocompleteOptions = {
    // NOTE: use type 'any' for now to fixed vercel build error
    const options: any = {
      types: ['geocode'],
    };

    if (googlePlacesCountry) {
      options.componentRestrictions = { country: googlePlacesCountry };
    }

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelected?.(place);
    });

    return () => {
      // No direct destroy method for Autocomplete, GC handles it
    };
  }, [googlePlaces, googlePlacesCountry, onPlaceSelected]);

  const renderEndAdornment = useMemo(() => {
    if (error) {
      return (
        <InputAdornment position="end">
          <UiIcon name="Error" className={E('error-icon')} />
        </InputAdornment>
      );
    }
    if (endIcon) return (
      <InputAdornment position="end" className={E('end-icon')}>
        <UiIcon name={endIcon} />
      </InputAdornment>
    );
  }, [error, endIcon]);

  return (
    <MuiTextField
      id={id}
      name={name}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      type={type}
      error={error}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      value={value}
      inputRef={googlePlaces ? inputRef : undefined}
      readOnly={readOnly}
      disabled={disabled}
      maxRows={maxRows}
      rows={rows}
      multiline={multiline}
      onChange={onChange}
      {...(register || {})}
      className={B()}
      slotProps={{
        ...(isDateField
          ? {
              inputLabel: { shrink: true },
            }
          : {}),
        input: {
          readOnly: readOnly,
          endAdornment: renderEndAdornment,
          ...(disablePastDates && isDateField
            ? {
                inputProps: {
                  min: new Date().toISOString().split('T')[0],
                },
              }
            : {}),
        },
      }}
    />
  );
};

export default UiTextField;

// 'use client';

// import * as React from 'react';
// import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
// import { InputAdornment } from '@mui/material';
// import UiIcon from '../UiIcon/UiIcon';
// import { useBEM } from '@tectus/hooks';
// import './UiTextField.scss';

// export interface UiTextFieldProps {
//   id?: string;
//   name?: string;
//   label?: string;
//   className?: string;
//   placeholder?: string;
//   helperText?: string;
//   type?: TextFieldProps['type'];
//   error?: boolean;
//   variant?: TextFieldProps['variant'];
//   fullWidth?: boolean;
//   size?: TextFieldProps['size'];
//   value?: TextFieldProps['value'];
//   readOnly?: boolean;
//   disabled?: boolean;
//   maxRows?: number;
//   rows?: number;
//   multiline?: boolean;
//   register?: ReturnType<any>;
//   onChange?: TextFieldProps['onChange'];
//   disablePastDates?: boolean
// }

// export const UiTextField: React.FC<UiTextFieldProps> = ({ ...props }) => {
//   const {
//     id,
//     name,
//     label,
//     className,
//     placeholder,
//     helperText,
//     type = 'text',
//     error,
//     variant = 'filled',
//     fullWidth = true,
//     size = 'medium',
//     value,
//     readOnly,
//     disabled,
//     maxRows,
//     rows,
//     multiline,
//     register,
//     onChange,
//     disablePastDates,
//   } = props;

//   const { B, E } = useBEM('ui-text-field', className);

//   const isDateField = type === 'date';

//   return (
//     <MuiTextField
//       id={id}
//       name={name}
//       label={label}
//       placeholder={placeholder}
//       helperText={helperText}
//       type={type}
//       error={error}
//       variant={variant}
//       fullWidth={fullWidth}
//       size={size}
//       value={value}
//       readOnly={readOnly}
//       disabled={disabled}
//       maxRows={maxRows}
//       rows={rows}
//       multiline={multiline}
//       onChange={onChange}

//       {...(register || {})}
//       className={B()}
//       slotProps={{
//         ...(isDateField
//           ? {
//               inputLabel: { shrink: true },
//             }
//           : {}),
//         input: {
//           readOnly: readOnly,
//           endAdornment: error ? (
//             <InputAdornment position="end">
//               <UiIcon name="Error" className={E('error-icon')} />
//             </InputAdornment>
//           ) : null,

//           ...( disablePastDates && isDateField ? {
//             inputProps: {
//               min: new Date().toISOString().split('T')[0]
//             },
//           } : {})

//         },
//       }}
//     />
//   );
// };

// export default UiTextField;
