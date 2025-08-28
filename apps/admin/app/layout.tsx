import React from 'react';
import type { Metadata } from "next";
// import '@tectus/styles/globals.scss';
import './main.scss';
import { ThemeProvider } from '@tectus/ui/ThemeProvider';
import { UiSnackbarProvider } from '@tectus/ui';
import Script from 'next/script';


export const metadata = {
  title: "Tectus GO",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const baseFontSize = process.env.NEXT_PUBLIC_BASED_FONT_SIZE || '16px';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" style={{ '--base-font-size': baseFontSize } as React.CSSProperties}>
      <body>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        <ThemeProvider>
          <UiSnackbarProvider>
            {children}
          </UiSnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
