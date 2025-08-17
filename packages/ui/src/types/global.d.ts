export {};

declare global {
  interface Window {
    google: any; // 👈 simplest fix
  }
}
