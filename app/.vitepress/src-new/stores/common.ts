import { defineStore } from 'pinia';

/**
 * 风格
 */
export const useAppearance = defineStore('appearance', {
  state: () => ({
    appearance: 'light',
  }),
});

/**
 * cookie版本
 */
export const useCookieStore = defineStore('cookie', {
  state: () => ({
    status: '0',
    version: '20240830',
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
});
