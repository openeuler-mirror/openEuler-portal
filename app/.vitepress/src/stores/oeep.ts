import { defineStore } from 'pinia';
import { getGiteeContent } from '@/api/api-gitee';
import { convertGiteePath } from '@/shared/markdown';
import { getUrlParam } from '@/shared/utils';

export const useOeep = defineStore('oeep', {
  state: () => {
    return {
      markdownData: '',
    };
  },
  actions: {
    setMarkDownData(cleanData?: boolean) {
      const parmes = {
        owner: 'openeuler',
        path: '',
      };
      parmes.path = getUrlParam('name');
      if (cleanData) {
        this.markdownData = '';
      }
      if (!parmes.path) {
        return false;
      }
      getGiteeContent(parmes).then((res) => {
        this.markdownData = convertGiteePath(res?.data);
      });
    },
  },
});
