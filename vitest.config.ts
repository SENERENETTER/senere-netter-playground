import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/playground/**/*.test.ts'],
    environment: 'node'
  }
});