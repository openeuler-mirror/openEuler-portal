import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '~@': resolve(__dirname, 'app/.vitepress/src-new'),
      '@': resolve(__dirname, 'app/.vitepress/src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'clover'],
      include: ['**/utils/**', '**/shared/utils.ts', '**/shared/utils.js', '**/src-new/utils/common.ts'],
      exclude: ['node_modules/**', 'dist/**', 'public/**', '**.test.ts'],
    },
  },
});
