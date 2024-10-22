import type { AxiosError } from 'axios';
import i18n from '~@/i18n';

const { t } = i18n.global;

export default (err: AxiosError) => {
  const { response } = err;

  if (response) {

    const data = response.data as { code: string; data: any; msg: string };

    switch (response && response.status) {
      case 400:
        err.message = t('response.statusCode400');
        break;
      case 401:
        err.message = t('response.statusCode401');
        break;
      case 403:
        err.message = t('response.statusCode403');
        break;
      case 404:
        err.code = data?.code ?? String(response.status);
        break;
      case 408:
        err.message = t('response.statusCode408');
        break;
      case 418:
        err.message = t('response.statusCode418');
        break;
      case 500:
        err.message = t('response.statusCode500');
        break;
      case 501:
        err.message = t('response.statusCode501');
        break;
      case 502:
        err.message = t('response.statusCode502');
        break;
      case 503:
        err.message = t('response.statusCode503');
        break;
      case 504:
        err.message = t('response.statusCode504');
        break;
      case 505:
        err.message = t('response.statusCode505');
        break;
      default:
        err.message = `${t('response.defaultStatusCode')}：(${response.status})!`;
    }
  }
  return err;
};
