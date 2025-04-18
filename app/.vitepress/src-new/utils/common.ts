import Cookies from 'js-cookie';

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
