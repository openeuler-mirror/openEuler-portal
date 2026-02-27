import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescript from '@vue/eslint-config-typescript';
import prettierSkip from '@vue/eslint-config-prettier/skip-formatting';
import tseslint from 'typescript-eslint';

export default [
  // 基础 JavaScript 推荐规则
  js.configs.recommended,

  // Vue 3 推荐规则
  ...vue.configs['flat/essential'],

  // TypeScript 规则
  ...typescript({
    extends: ['base'],
  }),

  // Prettier 规则（跳过格式化）
  prettierSkip,

  // 项目特定配置
  {
    files: ['**/*.{js,ts,vue,jsx,tsx}'],
    rules: {
      // 在这里添加自定义规则
      'vue/multi-word-component-names': 'off',
      // 禁用原生的 no-unused-vars 规则
      'no-unused-vars': 'off',
      // 启用 TypeScript 版本的 no-unused-vars
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // 自定义hooks
        useLocale: 'readonly',
        useScreen: 'readonly',

        // Vue 自动导入
        computed: 'readonly',
        ref: 'readonly',
        reactive: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        unref: 'readonly',
        toRef: 'readonly',
        toRefs: 'readonly',
        isRef: 'readonly',
        readonly: 'readonly',
        shallowRef: 'readonly',
        shallowReactive: 'readonly',
        toRaw: 'readonly',
        markRaw: 'readonly',
        effectScope: 'readonly',
        getCurrentScope: 'readonly',
        onScopeDispose: 'readonly',
        nextTick: 'readonly',
        PropType: 'readonly',

        // Vue 生命周期
        onBeforeMount: 'readonly',
        onMounted: 'readonly',
        onBeforeUpdate: 'readonly',
        onUpdated: 'readonly',
        onBeforeUnmount: 'readonly',
        onUnmounted: 'readonly',
        onActivated: 'readonly',
        onDeactivated: 'readonly',
        onErrorCaptured: 'readonly',

        // Nuxt 自动导入
        useRouter: 'readonly',
        useRoute: 'readonly',
        useAsyncData: 'readonly',
        useFetch: 'readonly',
        useLazyFetch: 'readonly',
        useLazyAsyncData: 'readonly',
        useNuxtApp: 'readonly',
        useRuntimeConfig: 'readonly',
        useState: 'readonly',
        useCookie: 'readonly',
        useRequestHeaders: 'readonly',
        useRequestEvent: 'readonly',
        useRequestFetch: 'readonly',
        useRequestURL: 'readonly',
        useHead: 'readonly',
        useSeoMeta: 'readonly',
        useError: 'readonly',
        useNuxtData: 'readonly',
        refreshNuxtData: 'readonly',
        clearNuxtData: 'readonly',
        createError: 'readonly',
        showError: 'readonly',
        clearError: 'readonly',
        navigateTo: 'readonly',
        abortNavigation: 'readonly',
        setPageLayout: 'readonly',
        definePageMeta: 'readonly',
        prefetchComponents: 'readonly',
        preloadComponents: 'readonly',
        preloadRouteComponents: 'readonly',
        reloadNuxtApp: 'readonly',
        defineNuxtPlugin: 'readonly',
        defineNuxtRouteMiddleware: 'readonly',
        defineNitroPlugin: 'readonly',

        // Nuxt Content
        queryContent: 'readonly',

        // Pinia
        defineStore: 'readonly',
        acceptHMRUpdate: 'readonly',
        storeToRefs: 'readonly',

        // VueUse
        useDebounceFn: 'readonly',
        useEventListener: 'readonly',
        useTemplateRef: 'readonly',
        useIntersectionObserver: 'readonly',
        useDocumentVisibility: 'readonly',
        watchDebounced: 'readonly',

        // 项目常量
        COOKIE_KEY: 'readonly',
        COOKIE_AGREED_STATUS: 'readonly',

        // 第三方库全局对象
        ClipboardJS: 'readonly',

        // TypeScript 全局类型
        NodeListOf: 'readonly',

        // 浏览器全局对象
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
  },

  // 忽略的文件
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.output/**',
      '**/.nuxt/**',
      '**/coverage/**',
      '**/public/**',
      '**/npmcache/**',
      '**/cache/**',
      '**/vite.config.{js,ts}',
      '**/vitest.config.{js,ts}',
      '**/vitest.setup.{js,ts}',
      '**/nuxt.config.{js,ts}',
      '**/config.mjs',
      '**/*.d.ts',
      'eslint.config.js',
    ],
  },
];
