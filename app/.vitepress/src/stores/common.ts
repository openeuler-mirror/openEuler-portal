import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: 'light',
    iconMenuShow: true,
  }),
});

export const useCookieStore = defineStore('cookie', {
  state: () => ({
    status: '0',
    version: '20240830',
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
});
