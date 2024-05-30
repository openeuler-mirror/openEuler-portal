import { defineStore } from 'pinia';

export const useCommon = defineStore('common', {
  state: () => ({
    theme: 'light',
    iconMenuShow: true,
  }),
});

// cookie状态
export const useCookieStatus = defineStore('cookieStatus', {
  state: () => ({
    status: '0',
  }),
  getters: {
    isAllAgreed: (state) => state.status === '1',
  },
});

// 隐私版本
export const usePrivacyVersion = defineStore('privacyVersion', {
  state: () => ({
    version: '20240530',
  }),
});
