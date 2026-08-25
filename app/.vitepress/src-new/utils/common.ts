import Cookies from 'js-cookie';
import dayjs from 'dayjs';

import { OptionItemT } from '~@/@types/type-meeting';

/**
 * 获取url搜索参数
 * @param {string} url 完整 url
 * @returns {Object} url 中的搜索参数
 */
export function getUrlParams(url: string) {
  const search = new URL(url).search;
  const params = new URLSearchParams(search);
  return params;
}

/**
 * 获取当前路由的参数
 * @param {string} query 需要的参数
 * @returns {string} query 路由中获取到的参数
 */
export function getUrlParam(query: string) {
  const search = new URL(window.location.href).search;
  return new URLSearchParams(search).get(query) || '';
}

/**
 * 替换当前路由的参数
 * @param {string} oldQuery 需要的参数
 * @param {string} newQuery 需要的参数
 */
export function replaceUrlParam(oldQuery: string, newQuery: string) {
  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get(oldQuery);
  
  if (searchValue && !params.get(newQuery)) {
    params.delete(oldQuery);
    params.set(newQuery, searchValue);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }
}

/**
 * 获取指定key的cookie值
 * @param {string} key
 * @returns {string} 值
 */
export function getCookie(key: string) {
  return Cookies.get(key);
}

/**
 * 设置cookie
 * @param {string} key cookie的key
 * @param {string} value cookie的值
 * @param {number} day cookie的过期时间 默认1天
 */
export function setCookie(
  key: string,
  value: string,
  day = 1,
  domain: string = location.hostname
) {
  Cookies.set(key, value, { expires: day, path: '/', domain });
}

/**
 * 删除cookie
 * @param {string} key cookie的key
 */
export function removeCookie(key: string) {
  Cookies.remove(key);
}

/**
 * 检查是否是同域名
 * @param {string} path 跳转路径
 */
export const checkOriginLink = (path: string) => {
  return (
    path.includes(import.meta.env.VITE_COOKIE_DOMAIN) ||
    path.includes('.openeuler.org') ||
    path.includes('clasign.osinfra.cn') ||
    path.includes('openeuler.openatom.cn')
  );
};

/**
 * 时间戳转 xxxx/xx/xx 格式时间
 * @param {number} timestamp 待转换时间戳
 * @returns {string} 返回格式化时间，如 2024/01/01
 */
export const changeTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}/${month}/${day}`;
};

/**
 * 判断链接来自GITEE/ATONGIT
 * @param {string} 链接字符串
 * @returns {string} 返回链接所属平台，gitee/atomgit/unknown
 */
export const detectGitPlatform = (url: string) => {
  if (!url || typeof url !== 'string') return 'unknown';
  
  const normalized = url.trim().toLowerCase();
  
  // 匹配 gitee
  if (/^(https?:\/\/)?(www\.)?gitee\.com\//.test(normalized)) {
    return 'gitee';
  }
  
  // 匹配 atomgit
  if (/^(https?:\/\/)?(www\.)?atomgit\.com\//.test(normalized)) {
    return 'atomgit';
  }
  
  return 'unknown';
}

/**
 * 格式化时间
 * @param {string} date 时间
 * @param {string} format 时间格式
 * @returns {string} 返回
 */
export const formatDate = (date: string = dayjs(), format: string = 'YYYY/MM/DD') => {
  return dayjs(new Date(date)).format(format);
};

/**
 * 从选项数组中查找指定值对应的标签文本，未匹配则回退原值
 * @param {string|number} value 待匹配的值
 * @param {OptionItemT[]} options 选项数组
 * @param {string} labelKey 标签字段名，默认 'label'
 * @param {string} valueKey 取值字段名，默认 'value'
 * @returns {string} 匹配到的标签；无匹配返回 value 原值
 */
export const findLabelFromOptions = (value: string | number, options: OptionItemT[], labelKey: string = 'label', valueKey: string = 'value') => {
  const find = options.find((o) => o[valueKey] === value);
  return find?.[labelKey] || value;
};
