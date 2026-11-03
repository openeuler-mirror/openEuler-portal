import path from 'path';
import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import { viteStaticCopy } from 'vite-plugin-static-copy';
import replaceUrlPlugin from './.vitepress/plugins/replace-url-plugin';
import { OPlusYamlContentVitePlugin } from '@opendesign-plus/vite-plugins';
// 内容编辑器 SDK。node 侧入口走预构建产物(vite.config 由 Node 原生加载,
// 无法消费包内 TS 源码);仅编辑模式注册
import { contentYamlPlugin } from 'portal-cms/vitepress/plugin';

const EDIT_MODE = process.env.VITE_EDIT_MODE === 'true';

export default defineConfig({
  // 构建期常量折叠:theme 据此决定是否动态 import 编辑器 SDK。
  // 普通构建折叠为恒假 → Rollup DCE 移除动态 import(SDK 不进 bundle);
  // 编辑模式恒真 → SDK 模块图(含 #content-manifest)完整接入。
  // 与下方插件注册共用同一开关
  define: {
    'import.meta.env.VITE_EDIT_MODE': JSON.stringify(EDIT_MODE ? 'true' : 'false'),
  },
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    cssCodeSplit: true,
  },
  publicDir: path.resolve(__dirname, './.vitepress/public'),
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './.vitepress/src')}/`,
      '~@/': `${path.resolve(__dirname, './.vitepress/src-new')}/`,
      '#content': path.resolve(__dirname, '../.content'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        api: 'modern-compiler',
        // SDK 的 SCSS 自包含(不依赖业务 mixin),跳过注入避免编译失败
        additionalData: (source, filename) => {
          if (filename.includes('portal-cms') || filename.includes('vscode-portal-cms')) {
            return source;
          }
          return `
        @use "@opensig/opendesign/es/_styles/mixin.scss" as *;
        @use "~@/assets/style/mixin/font.scss" as *;
        @use "~@/assets/style/mixin/common.scss" as *;${source}`;
        },
      },
    },
  },
  optimizeDeps: {
    // SDK 源码分发(含 .vue/.scss),交由 vite transform 而非 esbuild 预打包
    exclude: ['portal-cms'],
  },
  plugins: [
    // 编辑模式:SDK 插件(enforce:pre)接管 yaml(reactive 化 + 元数据 + manifest),
    // OPlus 的 yaml 处理被绕过(reactive 对组件透明,业务照常消费);
    // 普通构建仅 OPlus,行为与上游一致
    ...(EDIT_MODE ? [contentYamlPlugin({ editMode: true })] : []),
    OPlusYamlContentVitePlugin(),
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
          path.resolve(
            __dirname,
            './.vitepress/src-new/assets/category/event/svg-icons'
          )
        ),
        intelligence: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src-new/assets/category/intelligence/svg-icons')
        ),
        'online-meeting': FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src-new/assets/category/online-meeting/svg-icons')
        ),
        brand: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src-new/assets/category/brand/svg-icons')
        ),
        yuanrong: FileSystemIconLoader(
          path.resolve(__dirname, './.vitepress/src-new/assets/category/yuanrong/svg-icons')
        ),
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'zh/other/privacy/index.md',
          dest: 'file/zh/privacy',
        },
        {
          src: 'en/other/privacy/index.md',
          dest: 'file/en/privacy',
        },
        {
          src: 'zh/other/legal/index.md',
          dest: 'file/zh/legal',
        },
        {
          src: 'en/other/legal/index.md',
          dest: 'file/en/legal',
        },
      ],
    }),
    replaceUrlPlugin(),
  ],
  server: {
    proxy: {
      '/api-certification/': {
        target: 'https://certification.openeuler.org/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-certification/, ''),
      },
      '/api-search/': {
        target: 'https://doc-search.test.osinfra.cn',
        changeOrigin: true,
        headers: {
          Referer: '',
        },
        rewrite: (path) => path.replace(/^\/api-search/, ''),
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
        target: 'https://omapi.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-omapi/, ''),
      },
      // dsapi.test.osinfra.cn 直连会被 CloudWAF 拦截(418)，改走测试环境网关
      '/api-dsapi/': {
        target: 'https://openeuler.test.osinfra.cn',
        changeOrigin: true,
      },
      '/api-magic/': {
        target: 'https://magicapi.test.osinfra.cn/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-magic/, ''),
      },
      '/api-mail/': {
        target: 'https://mailweb.openeuler.org/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api-mail/, ''),
      },
    },
  },
});
