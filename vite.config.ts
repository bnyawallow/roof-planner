import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      allowedHosts: ['.creativefringe.digital'],
      port: 3000,
      strictPort: true,
      hmr: env.DISABLE_HMR !== 'true',
    },
    preview: {
      host: true,
      allowedHosts: ['.creativefringe.digital'],
      port: 3000,
      strictPort: true,
    },
  };
});
