interface ImportMetaEnv {
  readonly VITE_BACKEND_SERVER_URL: string;
  // Add more variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
