import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
  plugins: [react(),qrcode()],
  
  css: {
    postcss: './postcss.config.js',  // Ensure postcss is referenced
  },
});
optimizeDeps: {
  exclude: ['clsx', 'tailwind-merge']
}
