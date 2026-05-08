import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'clover'],
      include: ['**/utils/**', '**/shared/utils.ts', '**/shared/utils.js'],
      exclude: ['node_modules/**', 'dist/**', 'public/**', '**.test.ts'],
    },
  },
});
