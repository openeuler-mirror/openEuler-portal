import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import contentYamlPlugin from './app/.vitepress/plugins/vite-plugin-content-yaml';

export default defineConfig({
  plugins: [contentYamlPlugin()],
  resolve: {
    alias: {
      '~@': resolve(__dirname, 'app/.vitepress/src-new'),
      '@': resolve(__dirname, 'app/.vitepress/src'),
      '#content': resolve(__dirname, '.content'),
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
