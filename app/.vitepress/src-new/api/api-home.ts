import { request } from '~@/shared/axios';
import type { CaseT } from '~@/@types/type-home';

/**
 * 获取用户案例
 * @return { Promise<ResponseT> } 用户案例
 */
export function getShowCases(params: CaseT) {
  const url = '/doc-search/search/sort';
  return request.post(url, params, { showError: false }).then((res) => {
    return res.data;
  });
}
