import { createTheme } from '@mui/material/styles';
import { background } from 'storybook/internal/theming';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff', // white background
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255,255,255,0.5)', // light gray for disabled
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#333333', // dark gray, still visible
            color: '#4d4d4d', // white text
            opacity: 1, // remove default faded look
          },
          '&.Mui-disabled .MuiButton-loadingIndicator': {
            color: '#fff', // still black when disabled
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#FED700', // gold/yellow
      contrastText: '#000000', // black text for readability
    },
  },
});

export default theme;
