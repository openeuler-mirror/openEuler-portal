import { isClient } from '@opensig/opendesign';
/**
 * 获取当前的语言环境，目前只支持 zh 和 en
 * @returns {string} 若当前是 zh 环境则返回 zh，否则返回 en. 默认返回中文
 */
export function getCurrentLocale() {
  let lang = '';
  // TODO: 服务器构建使用中文
  if (!isClient) {
    return 'zh';
  }
  if (localStorage.getItem('locale')) {
    lang = localStorage.getItem('locale') === 'zh' ? 'zh' : 'en';
  } else {
    lang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }

  return lang;
}
