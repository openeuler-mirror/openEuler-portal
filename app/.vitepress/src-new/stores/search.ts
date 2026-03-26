import { defineStore } from 'pinia';

/**
 * vitepress 无法监听 History.replaceState和pushState，使用 pinia 监听 移动端头部搜索
 */
export const useSearchValue = defineStore('search', {
  state: () => ({
    searchValue: '',
    searchImage: '',
    isImageSearch: false,
  }),
  actions: {
    setSearchValue(val: string) {
      this.searchValue = val;
    },
    setImageSearch(image: string, isImage: boolean) {
      this.searchImage = image;
      this.isImageSearch = isImage;
    },
    /** 原子地更新文字 + 图片状态，避免触发两次 $subscribe */
    setSearchState(text: string, image: string, isImage: boolean) {
      this.searchValue = text;
      this.searchImage = image;
      this.isImageSearch = isImage;
    },
  },
});
