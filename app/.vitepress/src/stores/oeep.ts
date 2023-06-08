import { defineStore } from 'pinia';
import { getGiteeContent } from '@/api/api-gitee';
import { convertGiteePath, convertYFMtoCodeBlock } from '@/shared/markdown';
import { getUrlParam } from '@/shared/utils';

export const useOeep = defineStore('oeep', {
  state: () => {
    return {
      markdownData: '',
      statementHtml: '',
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
        // gitee 相对路径转换为网页路径
        // 将 YFM转为 代码块
        this.markdownData = convertGiteePath(convertYFMtoCodeBlock(res?.data));
      });
    },
    setStatementHtml(val: string) {
      this.statementHtml = val;
    },
  },
});
