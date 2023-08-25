import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
/**
 * 获取验证码
 * @name getCertification
 */
export function getCertification(params: any, lang: string) {
  const url = `/api-certification/certification/list/verifyCode?email=${params}`;
  return request
    .get(url, {
      headers: {
        'Accept-Language': lang,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
/**
 * 输入验证码后的验证接口
 * @name getSendCode
 */
export function getSendCode(identification: string, code: string) {
  const url = `/api-certification/certification/list?identification=${identification}&code=${code}`;
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 下载证书
 * @name getSendCode
 */
export function downloadCard(pa: string, lang: string) {
  const url = `/api-certification/certification?PA=${pa}`;
  return request
    .get(url, {
      headers: {
        'Accept-Language': lang,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
