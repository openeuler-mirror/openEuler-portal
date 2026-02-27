export let isCookieAgreed = () =>
  document.cookie.match(/\bagreed-cookiepolicy=(.+?);?/)?.[1] === '1';

export function setIsCookieAgreed(fn: () => boolean) {
  isCookieAgreed = fn;
}

// 监听cookie set
export default function startListenCookieSet(callback: () => void) {
  const origDesc = Object.getOwnPropertyDescriptor(
    Document.prototype,
    'cookie'
  )!;
  Object.defineProperty(Document.prototype, '_cookie', origDesc);
  Object.defineProperty(Document.prototype, 'cookie', {
    ...origDesc,
    get() {
      return this['_cookie'];
    },
    set(val: string) {
      this['_cookie'] = val;
      callback();
    },
  });
}
