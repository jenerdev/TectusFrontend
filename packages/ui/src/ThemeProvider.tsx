'use client';
import * as React from 'react';
import { ThemeProvider as MuiThemeProvider, useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './theme';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';



export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createAppTheme(mode);

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <MuiThemeProvider theme={theme} noSsr>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
