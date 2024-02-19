import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getUserAuth } from '@/shared/login';
import type {
  SortObjT,
  TimeTagsT,
  SearchDrowdownT,
  SearchCountQueryT,
  SearchCountResT,
  SearchRamDataT,
  RelevantQueryT,
  StatisticT,
} from '@/shared/@types/type-search';
import type { SearchBlogT } from '@/shared/@types/type-blog';
/**
 * 通用筛选
 * @name getSortData
 * @param {
 * page:number,
 * pageSize:number,
 * lang:string,
 * category:string
 * }
 */

interface SortParams {
  category: string;
  lang: string;
  page: number;
  pageSize: number;
}
interface Search {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
}

interface Condition {
  archives?: string;
  tags?: string;
  author?: string;
}
interface TagsParams {
  lang: string;
  category: string;
  want: string;
  condition?: Condition;
}
/**
 * 获取用户案例
 * @param {SortParams} params
 * @returns {Object}
 */
export function getSortData(params: SortParams): Promise<{
  msg: string;
  obj: SortObjT;
  status: number;
}> {
  const url = '/api-search/search/sort';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
}
/**
 * 获取博客列表
 * @param {SortParams} params
 * @returns {Object}
 */
export function sortBlogData(params: SortParams): Promise<{
  msg: string;
  obj: SearchBlogT;
  status: number;
}> {
  const url = '/api-search/search/sort/blog';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
/**
 * 获取时间筛选项
 * @param {TagsParams} params
 * @returns {Object}
 */
export function getTagsData(params: TagsParams): Promise<{
  msg: string;
  obj: TimeTagsT;
  status: number;
}> {
  const url = '/api-search/search/tags';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
/**
 * 获取搜索结果
 * @param {Search} params
 * @returns {Object}
 */
export function getSearchData(params: Search): Promise<{
  msg: string;
  obj: SearchDrowdownT;
  status: number;
}> {
  const url = '/api-search/search/docs';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
/**
 * 获取搜索各类型结果数量
 * @param {SearchCountQueryT} params
 * @returns {Object}
 */
export function getSearchCount(params: SearchCountQueryT): Promise<{
  msg: string;
  obj: SearchCountResT;
  status: number;
}> {
  const url = '/api-search/search/count';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
/**
 * 获取相关软件包数据
 * @param {Object} params 请求参数
 * @param {string} params.keyword 输入关键词
 * @returns {Object}
 */
export function getSearchRpm(params: { keyword: string }): Promise<{
  data: SearchRamDataT;
  msg: string;
  status: number;
}> {
  const url = '/api-node/repo/search';
  return request
    .get(url, {
      params,
    })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 获取热门搜索数据
 * @param {String} params 语言
 * @returns {Object}
 */
export function getPop(params: string): Promise<{
  msg: string;
  obj: string[];
  status: number;
}> {
  const url = `/api-search/search/pop?${params}`;
  return request.post(url).then((res: AxiosResponse) => res.data);
}

/**
 * 联想搜索
 * @param {RelevantQueryT} params
 * @return  {Object}
 */
export function getRelevant(params: RelevantQueryT): Promise<{
  msg: string;
  obj: any; // Arrary
  status: number;
}> {
  const url = `/api-search/search/sugg`;
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 首页数据卡片筛选
 * @return  {Object}
 */

export function getStatistic(): Promise<{
  code: number;
  data: StatisticT;
  msg: string;
  update_at: string;
}> {
  const url = '/api-dsapi/query/all?community=openEuler';
  return request.get(url).then((res: AxiosResponse) => res.data);
}
/**
 * 搜索chat输出
 * @param {}
 * @return  Array
 */
export function getChatapi(inputText: any, params: any) {
  const { message, close, open, error } = params;
  const abortController = new AbortController();
  const { token } = getUserAuth();
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: token,
  };
  const body: string = JSON.stringify({
    messages: [
      {
        role: 'human',
        content: inputText,
      },
    ],
    model: 'baichuan2-13b',
  });
  const signal = abortController.signal;
  fetchEventSource('/api-chat/worker/generate_stream', {
    method: 'POST',
    headers,
    body,
    signal,
    async onopen(response) {
      if (response.ok) {
        open();
        return;
      }
    },
    onmessage(event) {
      message(event.data);
    },
    onclose() {
      close();
    },
    onerror() {
      error();
    },
    openWhenHidden: true,
  });
  return {
    abortController,
  };
}

/**
 * meetup接口  申请表
 * @param {Object} params 申请表格数据
 * @return  {Object}
 */
export function meetupApplyForm(params: any): Promise<{
  code: number;
  data: string;
  msg: string;
}> {
  const url = `/api-dsapi/query/meetupApplyForm?community=openeuler`;
  const { token } = getUserAuth();
  return request
    .post(url, params, {
      showLoading: true,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}
