interface ImportMetaEnv {
    readonly VITE_ADMIN_EMAIL: string;
    // Add other environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  