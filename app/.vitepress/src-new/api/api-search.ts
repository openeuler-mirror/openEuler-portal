import { request } from '~@/shared/axios';

/**
 * es搜索获取首页新闻
 * @param { LocaleT } 语言
 * @return { Promise<ResponseT> } 首页新闻
 */
export function getHomeNews(locale: string) {
  const url = '/api-search/search/sort';
  const params = { category: 'news', lang: locale, page: 1, pageSize: 6 };

  return request.post(url, params).then((res) => {
    return res.data;
  });
}

/**
 * es搜索获取首页博客
 * @param { LocaleT } 语言
 * @return { Promise<ResponseT> } 首页博客
 */
export function getHomeBlog(locale: string) {
  const url = '/api-search/search/sort';
  const params = { category: 'blog', lang: locale, page: 1, pageSize: 6 };

  return request
    .post(url, params, {
      ignoreDuplicates: true,
    })
    .then((res) => {
      return res.data;
    });
}

/**
 * es搜索获取首页用户案例
 * @return { Promise<ResponseT> } 用户案例
 */
export function getHomeShowCases(params: {
  category: string;
  lang: string;
  page: number;
  pageSize: number;
}) {
  const url = '/api-search/search/sort';
  return request
    .post(url, params, {
      ignoreDuplicates: true,
    })
    .then((res) => {
      return res.data;
    });
}
