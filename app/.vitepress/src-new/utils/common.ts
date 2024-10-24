// URL参数转对象
export function getUrlParams(url: string) {
  const search = new URL(url).search;
  const params = new URLSearchParams(search);
  return params;
}
