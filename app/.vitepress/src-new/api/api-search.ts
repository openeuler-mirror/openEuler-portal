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
  const url = '/api-search/search/docsng';
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

/**
 * 图片搜索
 * @param {Object} params
 * @param {string} params.lang 语言
 * @param {File} params.image 图片文件
 * @param {string} params.keyword 可选的文本查询
 * @param {number} params.page 页码
 * @param {number} params.pageSize 每页数量
 * @param {string} params.type 搜索类型
 * @param {string} params.sort 排序方式
 * @returns {Object}
 */
export function imageSearch(params: {
  lang: string;
  imageUrl: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
  type?: string;
  sort?: string;
  limit?: { type: string; version: string }[];
}): Promise<{
  msg: string;
  obj: any;
  status: number;
}> {
  const url = '/api-search/search/multitimodal';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 图片上传
 * @param {File} image 图片文件
 * @returns {Object}
 */
export function imageUpload(params: {
  image: File;
}): Promise<{
  msg: string;
  obj: any;
  status: number;
}> {
  const url = '/api-search/search/sort/upload/image';
  const formData = new FormData();
  formData.append('image', params.image);
  return request.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res: AxiosResponse) => res.data);
}
