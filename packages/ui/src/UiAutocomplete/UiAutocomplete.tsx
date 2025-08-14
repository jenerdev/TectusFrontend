// 'use client';

// import * as React from 'react';
// import './UiAutocomplete.scss';
// import { useTheme } from '@mui/material/styles';
// import { Autocomplete, TextField, useMediaQuery, AutocompleteProps } from '@mui/material';
// import { useBEM } from '@tectus/hooks';

// export interface UiAutocompleteOption {
//   label: string;
//   value: string | number;
// }

// export interface UiAutocompleteProps {
//   id?: string;
//   label?: string;
//   value?: UiAutocompleteOption | null;
//   className?: string;
//   size?: 'small' | 'medium';
//   fullWidth?: boolean;
//   multiple?: boolean;
//   options?: UiAutocompleteOption[];
//   placeholder?: string;
//   onChange?: (event: React.SyntheticEvent, value: UiAutocompleteOption | null) => void;
//   // from react-hook-form register
//   register?: ReturnType<any>;
//   disabled?: boolean;
// }

// export const UiAutocomplete: React.FC<UiAutocompleteProps> = ({ register, ...props }) => {
//   const { B } = useBEM('ui-autocomplete');
//   const size = props.size || 'medium';
//   return ( 
//     <Autocomplete 
//       id={props.id}
//       size={size}
//       options={props.options || []}
//       getOptionLabel={(option) => option.label || ''}
//       fullWidth={props.fullWidth}
//       multiple={props.multiple}
//       renderInput={(params) => (
//         <TextField {...params} variant="outlined" label={props.label} placeholder={props.placeholder} size={size}/>
//       )}
//     />
//   );
// };

// export default UiAutocomplete;

// 'use client';

// import * as React from 'react';
// import './UiAutocomplete.scss';
// import { Autocomplete, TextField, FormHelperText } from '@mui/material';
// import { useBEM } from '@tectus/hooks';

// export interface UiAutocompleteOption {
//   label: string;
//   value: string | number;
// }

// export interface UiAutocompleteProps {
//   id?: string;
//   label?: string;
//   placeholder?: string;
//   value?: UiAutocompleteOption | UiAutocompleteOption[] | null;
//   className?: string;
//   size?: 'small' | 'medium';
//   fullWidth?: boolean;
//   multiple?: boolean;
//   helperText?: string;
//   error?: boolean;
//   disabled?: boolean;
//   options?: UiAutocompleteOption[];

//   // from useForm
//   register?: ReturnType<any>;
// }

// export const UiAutocomplete: React.FC<UiAutocompleteProps> = ({
//   register,
//   ...props
// }) => {
//   const { B } = useBEM('ui-autocomplete');
//   const size = props.size || 'medium';

//   // Handle both register-driven and props-driven modes
//   const fieldValue =
//     register?.value ??
//     props.value ??
//     (props.multiple ? [] : null);

//   return (
//       <Autocomplete
//         id={props.id}
//         multiple={props.multiple}
//         size={size}
//         options={props.options || []}
//         value={fieldValue}
//         onChange={(_, newValue) => {
//           if (register?.onChange) {
//             // Simulate an event for useForm
//             register.onChange({
//               target: { name: register.name, value: newValue }
//             });
//           }
//         }}
//         onBlur={register?.onBlur}
//         getOptionLabel={(option) => option?.label || ''}
//         fullWidth={props.fullWidth}
//         disabled={props.disabled} 
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="outlined"
//             label={props.label}
//             placeholder={props.placeholder}
//             size={size}
//             error={props.error}
//             fullWidth={props.fullWidth}
//             helperText={props.helperText}
//           />
//         )}
//       />
//   );
// };

// export default UiAutocomplete;

'use client';

import * as React from 'react';
import './UiAutocomplete.scss';
import { Autocomplete, TextField } from '@mui/material';
import { useBEM } from '@tectus/hooks';

export interface UiAutocompleteOption {
  label: string;
  value: string | number;
}

export interface UiAutocompleteProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: UiAutocompleteOption | UiAutocompleteOption[] | null;
  className?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  multiple?: boolean;
  helperText?: string; // default helper text
  error?: boolean; // boolean flag from useForm
  disabled?: boolean;
  options?: UiAutocompleteOption[];

  // from useForm
  register?: ReturnType<any> & { error?: string }; // <-- allow error message
}

export const UiAutocomplete: React.FC<UiAutocompleteProps> = ({
  register,
  helperText,
  error,
  ...props
}) => {
  const { B } = useBEM('ui-autocomplete');
  const size = props.size || 'medium';

  const fieldValue =
    register?.value ??
    props.value ??
    (props.multiple ? [] : null);

  // Prefer register.error message > prop.helperText
  const finalHelperText = register?.error || helperText;
  const isError = !!register?.error || error;

  return (
    <Autocomplete
      id={props.id}
      multiple={props.multiple}
      size={size}
      options={props.options || []}
      value={fieldValue}
      onChange={(_, newValue) => {
        if (register?.onChange) {
          register.onChange({
            target: { name: register.name, value: newValue }
          });
        }
      }}
      onBlur={register?.onBlur}
      getOptionLabel={(option) => option?.label || ''}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={props.label}
          placeholder={props.placeholder}
          size={size}
          error={isError}
          fullWidth={props.fullWidth}
          helperText={finalHelperText}
        />
      )}
    />
  );
};

export default UiAutocomplete;

