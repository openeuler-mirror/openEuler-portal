import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import type { CertificationT, CertificateListT, CertificateInfoT } from '@/shared/@types/type-certification'

/**
 * 获取验证码
 * @param {string} params 邮箱
 * @param {string} lang 语言
 * @return {Promise<Object>} 验证码
 */
export function getCertification(params: any, lang: string): Promise<{
  code: null,
  data: CertificationT,
  message: string,
  success: boolean
}> {
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
 * @param {string} identification getCertification返回的验证码
 * @param {string} code 邮箱收到的验证码
 * @return {Promise<Object>} 证书信息
 */
export function getSendCode(identification: string, code: string): Promise<{
  code: null,
  data: CertificateListT[],
  message: string,
  success: boolean
}> {
  const url = `/api-certification/certification/list?identification=${identification}&code=${code}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 下载证书
 * @param {string} pa 下载证书PA值
 * @param {string} lang 语言
 * @return {Promise<Object>} 证书名字和内容
 */
export function downloadCard(pa: string, lang: string): Promise<{
  code: null,
  data: CertificateInfoT,
  message: string,
  success: boolean
}> {
  const url = `/api-certification/certification?PA=${pa}`;
  return request
    .get(url, {
      headers: {
        'Accept-Language': lang,
      },
    })
    .then((res: AxiosResponse) => res.data);
}
