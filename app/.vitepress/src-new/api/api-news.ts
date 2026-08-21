import { request } from '~@/shared/axios';
import type { ParamsT, TagsParams } from '~@/@types/type-news';

/**
 * 获取tags - 新闻/博客列表的分类筛选标签(来自 search 服务)
 * @param {TagsParams} params
 * @returns {Promise<ResponseT>} tags
 */
export const getTagsData = (params: TagsParams) => {
  const url = '/api-search/search/tags';
  return request.post(url, params, { ignoreDuplicates: true }).then((res) => {
    return res.data;
  });
}

/**
 * 获取新闻列表
 * @param {ParamsT} params
 * @returns {Promise<ResponseT>} 新闻列表
 */
export const getNewsData = (params: ParamsT) => {
  const url = '/api-search/search/sort';
  return request.post(url, params).then((res) => {
    return res.data
  });
}

/**
 * 获取博客列表
 * @param {ParamsT} params
 * @returns {Promise<ResponseT>} 博客列表
 */
export const getBlogsData = (params: ParamsT) => {
  const url = '/api-search/search/sort/blog';
  return request.post(url, params).then((res) => {
    return res.data;
  });
}
