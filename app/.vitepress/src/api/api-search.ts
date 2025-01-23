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
  SearchRecommendT,
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
  return request
    .post(
      url,
      // TODO: 取消手动添加请求头
      {},
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    )
    .then((res: AxiosResponse) => res.data);
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

/**
 * 关联搜索
 * @param {Object} params 申请表格数据
 * @return  {Object}
 */
export function getSearchRecommend(params: { query: string }): Promise<{
  status: number;
  obj: {
    word: SearchRecommendT[];
  };
  msg: string;
}> {
  const url = `/api-search/search/word?query=${params.query}`;
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
