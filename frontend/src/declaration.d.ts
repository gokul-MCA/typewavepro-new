// src/declaration.d.ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // add more custom env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
