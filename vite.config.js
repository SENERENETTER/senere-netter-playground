import { defineConfig } from 'vite';
export default defineConfig({
  base: '/senare-netter-playground/',
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
