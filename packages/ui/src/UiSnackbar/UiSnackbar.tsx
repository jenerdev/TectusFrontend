"use client";

import React from "react";
import { SnackbarProvider as NotistackProvider, useSnackbar as useNotistackSnackbar, VariantType, OptionsObject } from "notistack";

// Provider wrapper with default config
export const UiSnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotistackProvider
      maxSnack={3}
      autoHideDuration={5000}
    >
      {children}
    </NotistackProvider>
  );
};

// Hook wrapper for snackbar usage
export const useUiSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useNotistackSnackbar();

  const showSnackbar = (
    message: string,
    variant: VariantType = "default",
    options?: OptionsObject
  ) => enqueueSnackbar(message, { variant, ...options });

  return { showSnackbar, closeSnackbar };
};
