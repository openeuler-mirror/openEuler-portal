import { defineStore } from 'pinia';

/**
 * vitepress 无法监听 History.replaceState和pushState，使用 pinia 监听 移动端头部搜索
 */
export const useSearchValue = defineStore('search', {
  state: () => ({
    searchValue: '',
  }),
  actions: {
    setSearchValue(val: string) {
      this.searchValue = val;
    },
  },
});
