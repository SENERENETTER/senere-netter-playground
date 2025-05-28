import { defineConfig } from 'vite';
// Trigger new deployment - May 28, 2025
export default defineConfig({
  base: '/senere-netter-playground/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['canvas-confetti'],
        },
      },
    },
  },
  css: {
    devSourcemap: true,
  },
});
