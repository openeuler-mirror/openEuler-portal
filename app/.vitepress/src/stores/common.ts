import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: 'light',
    iconMenuShow: true,
  }),
});

// cookie状态
export const useCookieStore = defineStore('cookie', {
  state: () => ({
    status: '0',
    version: '20240506',
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
});
