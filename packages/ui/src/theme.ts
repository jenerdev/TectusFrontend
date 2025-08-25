import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      main: '#D4AF37', // Gold
      contrastText: mode === 'light' ? '#000000' : '#ffffff',
    },
    ...(mode === 'light'
      ? {
          secondary: { main: '#9c27b0' },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#555555',
          },
        }
      : {
          secondary: { main: '#ce93d8' },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#bbbbbb',
          },
        }),
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#222222',
          backgroundImage: 'none',
          color: '#CCCCCC',
          borderRadius: '32px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '1.5rem 2rem',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#D4AF37',
          color: mode === 'dark' ? '#333333' : '#000000',
          '&:hover': {
            backgroundColor: '#b48b2a',
          },
        },
        outlined: {
          backgroundColor: '#222222',
          borderColor: '#D4AF37',
          borderWidth: '2px',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute' as const,
          top: '100%',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0e0e0',
          color: '#49454F',

          '&.Mui-focused': {
            backgroundColor: '#e0e0e0',
            color: '#49454F',
          },
          '&:hover': {
            backgroundColor: '#e0e0e0',
            color: '#49454F',
          },
          '& input:-webkit-autofill': {
            boxShadow: `0 0 0 100px #ffffff inset`,
            WebkitTextFillColor: '#49454F',
            transition: 'background-color 5000s ease-in-out 0s',
            caretColor: '#49454F',
          },

          '&.Mui-disabled': {
            backgroundColor: '#333',
            color: '#fff',
            WebkitTextFillColor: '#fff',
            caretColor: '#fff',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#49454F',

          '&.Mui-focused': {
            color: '#49454F', // keep same color on focus
          },

          '&.Mui-disabled': {
            color: '#49454F', // disabled label color
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minHeight: '100vh',
          background:
            mode === 'light'
              ? 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)'
              : 'linear-gradient(to bottom, #222222, #333333)',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));

// import { createTheme } from '@mui/material/styles';

// export const getDesignTokens = (mode: 'light' | 'dark') => ({
//   palette: {
//     mode,
//     primary: {
//       main: '#D4AF37', // Gold
//       contrastText: '#000000',
//     },
//     text: {
//       primary: '#ffffff', // Main text color
//       secondary: '#cccccc', // Subtle text color
//     },
//     // ...(mode === 'light'
//     //   ? {
//     //       secondary: { main: '#9c27b0' },
//     //       background: {
//     //         default: '#f5f5f5',
//     //         paper: '#ffffff',
//     //       },
//     //       text: {
//     //         primary: '#000000',
//     //         secondary: '#555555',
//     //       },
//     //     }
//     //   : {
//     //       secondary: { main: '#ce93d8' },
//     //       background: {
//     //         default: '#121212',
//     //         paper: '#1e1e1e',
//     //       },
//     //       text: {
//     //         primary: '#ffffff',
//     //         secondary: '#bbbbbb',
//     //       },
//     //     }),
//   },
//   components: {
//     // MuiDialog: {
//     //   styleOverrides: {
//     //     paper: {
//     //       backgroundColor: '#ffffff',
//     //       color: '#333333',
//     //     },
//     //   },
//     // },
//     // MuiDialogTitle: {
//     //   styleOverrides: {
//     //     root: {
//     //       color: '#333333',
//     //     },
//     //   },
//     // },
//     // MuiDialogContent: {
//     //   styleOverrides: {
//     //     root: {
//     //       color: '#333333',
//     //     },
//     //   },
//     // },
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           backgroundColor: '#D4AF37',
//           color: '#333333',
//           '&:hover': {
//             backgroundColor: '#b48b2a',
//           },
//         },
//         outlined: {
//           backgroundColor: '#222222',
//           borderColor: '#D4AF37',
//           borderWidth: '2px',
//         },
//       },
//     },
//     MuiFormHelperText: {
//       styleOverrides: {
//         root: {
//           position: 'absolute' as const,
//           top: '100%',
//         },
//       },
//     },
//     MuiFilledInput: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#e0e0e0',
//           color: '#49454F',

//           '&.Mui-focused': {
//             backgroundColor: '#e0e0e0',
//             color: '#49454F',
//           },
//           '&:hover': {
//             backgroundColor: '#e0e0e0',
//             color: '#49454F',
//           },
//           '& input:-webkit-autofill': {
//             boxShadow: `0 0 0 100px #ffffff inset`,
//             WebkitTextFillColor: '#49454F',
//             transition: 'background-color 5000s ease-in-out 0s',
//             caretColor: '#49454F',
//           },

//           '&.Mui-disabled': {
//             backgroundColor: '#333',
//             color: '#fff',
//             WebkitTextFillColor: '#fff',
//             caretColor: '#fff',
//           },
//         },
//       },
//     },
//     MuiInputLabel: {
//       // styleOverrides: {
//       //   root: {
//       //     color: '#49454F',
//       //     '&.Mui-focused': {
//       //       color: '#49454F', // keep same color on focus
//       //     },
//       //     '&.Mui-disabled': {
//       //       color: '#49454F', // disabled label color
//       //     },
//       //   },
//       // },
//     },
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           margin: 0,
//           minHeight: '100vh',
//           background: 'linear-gradient(to bottom, #222222, #333333)',
//           backgroundAttachment: 'fixed',
//         },
//       },
//     },
//   },
//   typography: {
//     fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
//   },
// });

// export const createAppTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
