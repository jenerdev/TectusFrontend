// import { createTheme } from '@mui/material/styles';
// import { background } from 'storybook/internal/theming';

// const theme = createTheme({
//   components: {
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#fff', // white background
//           '&.Mui-disabled': {
//             backgroundColor: 'rgba(255,255,255,0.5)', // light gray for disabled
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           '&.Mui-disabled': {
//             backgroundColor: '#333333', // dark gray, still visible
//             color: '#4d4d4d', // white text
//             opacity: 1, // remove default faded look
//           },
//           '&.Mui-disabled .MuiButton-loadingIndicator': {
//             color: '#fff', // still black when disabled
//           },
//         },
//       },
//     },
//   },
//   palette: {
//     primary: {
//       main: '#FED700', // gold/yellow
//       contrastText: '#000000', // black text for readability
//     },
//   },
// });

// export default theme;

import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme();

const theme = createTheme(baseTheme, {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255,255,255,0.5)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#333333',
            color: '#4d4d4d',
            opacity: 1,
          },
          '&.Mui-disabled .MuiButton-loadingIndicator': {
            color: '#fff',
          },
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#FED700',
            color: '#000000',
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: '#FED700',
            color: '#FED700',
          },
          '&.MuiButton-textPrimary': {
            color: '#FED700',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // This runs when switch is unchecked
          '&:not(.Mui-checked) + .MuiSwitch-track': {
            backgroundColor: '#9e9e9e',
            opacity: 1,
          },
        },
        track: {
          // Ensure track shows the correct color when unchecked
          opacity: 1,
          backgroundColor: '#9e9e9e',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#fff',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2', // desktop default
      contrastText: '#ffffff',
    },
  },
});

export default theme;
