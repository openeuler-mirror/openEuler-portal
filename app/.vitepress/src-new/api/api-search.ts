import { request, AxiosResponse } from '~@/shared/axios';

import {
  SoftwareParamsT,
  AppItemT,
  SearchDocsT,
  SearchCountQueryT,
  SearchCountResT,
  RelevantQueryT,
  SearchDocsQueryT,
} from '~@/@types/type-search';
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

/**
 * 搜索页-获取相关软件包数据
 * @param {Object} params 请求参数
 * @param {string} params.keyword 输入关键词
 * @returns {Object}
 */
export function getSoftwareDocs(params: SoftwareParamsT): Promise<{
  msg: string;
  data: {
    all: AppItemT[];
  };
}> {
  const url = '/api-search/software/docs';
  return request
    .post(url, params, {
      ignoreDuplicates: true,
    })
    .then((res: AxiosResponse) => res.data);
}

/**
 * 搜索页-获取搜索结果
 * @param {Search} params
 * @returns {Object}
 */
export function getSearchData(params: SearchDocsQueryT): Promise<{
  msg: string;
  obj: SearchDocsT;
  status: number;
}> {
  const url = '/api-search/search/docs';
  // TODO:后端接收参数为下划线version
  params.limit.forEach((item) => {
    item.version = item.version.replaceAll('-', '_');
  });
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 搜索页-获取搜索各类型结果数量
 * @param {SearchCountQueryT} params
 * @returns {Object}
 */
export function getSearchCount(params: SearchCountQueryT): Promise<{
  msg: string;
  obj: SearchCountResT;
  status: number;
}> {
  const url = '/api-search/search/count';
    // TODO:后端接收参数为下划线version
    params.limit.forEach((item) => {
      item.version = item.version.replaceAll('-', '_');
    });
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 搜索页-联想搜索
 * @param {RelevantQueryT} params
 * @return  {Object}
 */
export function getRelevant(params: RelevantQueryT): Promise<{
  msg: string;
  obj: any;
  status: number;
}> {
  const url = `/api-search/search/sugg`;
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
