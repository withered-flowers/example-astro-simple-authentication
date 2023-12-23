/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
