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
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#D4AF37',
          color: mode === 'dark' ? '#333333' : '#000000',
          '&:hover': {
            backgroundColor: '#b48b2a',
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
