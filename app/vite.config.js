import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    cssCodeSplit: true,
  },
  publicDir: path.resolve(__dirname, './.vitepress/public'),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './.vitepress/src')}/`,
      '~@/': `${path.resolve(__dirname, './.vitepress/src-new')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `
        @use "~@/assets/style/mixin/screen.scss" as *;
        @use "~@/assets/style/mixin/font.scss" as *;
        @use "~@/assets/style/mixin/common.scss" as *;`,
      },
    },
  },
  plugins: [
    vueJsx({}),
    Icons({
      compiler: 'vue3',
      customCollections: {
        app: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/svg-icons')
        ),
        'app-new': FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src-new/assets/svg-icons')
        ),
        mooc: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/category/mooc')
        ),
        home: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/home/svg-icons'
          )
        ),
        case: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/home/case/svg-icons'
          )
        ),
        download: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/download/svg-icons'
          )
        ),
        search: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/search/svg-icons'
          )
        ),
        footer: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/common/footer')
        ),
        security: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/security/svg-icons'
          )
        ),
        'user-group': FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/user-group/svg-icons'
          )
        ),
        event: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src-new/assets/category/event/svg-icons')
        ),
      },
    }),
  ],
  server: {
    proxy: {
      '/api-certification/': {
        target: 'https://certification.openeuler.org/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-certification/, ''),
      },
      '/api-search/': {
        target: 'https://www.openeuler.org',
        changeOrigin: true,
        headers: {
          Referer: '',
        },
      },
      '/api-meeting/': {
        target: 'https://meetings.openeuler.openatom.cn/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-meeting/, ''),
      },
      '/api/': {
        target: 'https://api.openeuler.org',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api/, ''),
      },
      '/api-cve/': {
        target: 'https://api-cve.openeuler.org/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-cve/, ''),
      },
      '/api-omapi/': {
        target: 'https://omapi.osinfra.cn/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-omapi/, ''),
      },
      '/api-dsapi/': {
        target: 'https://dsapi.osinfra.cn/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-dsapi/, ''),
      },
      '/api-mail/': {
        target: 'https://mailweb.openeuler.org/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-mail/, ''),
      },
    },
  },
});
