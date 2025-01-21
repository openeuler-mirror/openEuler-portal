import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// import ElementPlus from 'unplugin-element-plus/vite';

// TODO:在vitepress使用该插件进行element-plus的按需导入会导致编译错误
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

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
        sig: FileSystemIconLoader(
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/sig/sig-icons'
          )
        ),
        footer: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src/assets/common/footer')
        ),
      },
    }),
  ],
  server: {
    proxy: {
      '/api-easyeditor/': {
        target: 'https://easyeditor.openeuler.org/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-easyeditor/, ''),
      },
      '/api-certification/': {
        target: 'https://certification.openeuler.org/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-certification/, ''),
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
        rewrite: (path) => path.replace(/^\/api-meeting/, ''),
      },
      '/api/': {
        target: 'https://api.openeuler.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api-euler': {
        target: 'https://www.openeuler.org',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api-euler/, ''),
      },
      '/api-cve/': {
        target: 'https://api-cve.openeuler.org/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-cve/, ''),
      },
      '/api-omapi/': {
        target: 'https://omapi.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-omapi/, ''),
      },
      '/api-dsapi/': {
        target: 'https://dsapi.osinfra.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-dsapi/, ''),
      },
      '/api-mail/': {
        target: 'https://mailweb.openeuler.org/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-mail/, ''),
      },
    },
  },
});
