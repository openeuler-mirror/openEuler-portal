import { defineStore } from 'pinia';

/**
 * vitepress 无法监听 History.replaceState和pushState，使用 pinia 监听 scenario变化
 */
export const useDownload = defineStore('download', {
  state: () => ({
    scenario: '',
    version: '',
  }),
  actions: {
    setScenario(val: string) {
      this.scenario = val;
    },
    setVersion(val: string) {
      this.version = val;
    },
  },
});
