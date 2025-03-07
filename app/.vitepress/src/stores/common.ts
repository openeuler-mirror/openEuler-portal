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
    version: '20250223',
    isNoticeVisible: false,
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
});

export const usePrivacyStore = defineStore('privacy', {
  state: () => ({
    version: '20250223',
  }),
});
