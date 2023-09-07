import { queryPermission } from '../api/api-login';
import { useLogin } from '../stores/login';
import { storeToRefs } from 'pinia';

const LOGIN_KEYS = {
  USER_TOKEN: '_U_T_',
  USER_INFO: '_U_I_',
};

function setCookie(cname: string, cvalue: string, isDelete?: boolean) {
  const deleteStr = isDelete ? 'max-age=0; ' : '';
  try {
    const domain = import.meta.env.VITE_COOKIE_DOMAIN;
    const expires = `${deleteStr}path=/; domain=${domain}`;
    document.cookie = `${cname}=${cvalue}; ${expires}`;
  } catch {}
}
function getCookie(cname: string) {
  const name = `${cname}=`;
  let ca: any = [];
  try {
    ca = document.cookie.split(';');
  } catch {
    ca = [];
  }
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
function deleteCookie(cname: string) {
  setCookie(cname, 'null', true);
}

// 存储用户id及token，用于下次登录
export function saveUserAuth(code = '') {
  if (!code) {
    deleteCookie(LOGIN_KEYS.USER_TOKEN);
  } else {
    setCookie(LOGIN_KEYS.USER_TOKEN, code);
  }
}

// 获取用户id及token
export function getUserAuth() {
  const token = getCookie(LOGIN_KEYS.USER_TOKEN) || '';
  if (!token) {
    saveUserAuth();
  }
  return {
    token,
  };
}

// 退出登录
export function logout() {
  location.href = `${import.meta.env.VITE_LOGIN_ORIGIN}/logout?redirect_uri=${
    window?.location?.origin
  }`;
}

// 跳转首页
export function goToHome() {
  window?.location?.reload();
}

export function showGuard() {
  const origin = import.meta.env.VITE_LOGIN_ORIGIN;
  const { lang } = getLanguage();
  location.href = `${origin}/login?redirect_uri=${location.href}&lang=${lang}`;
}

// token失效跳转首页
export function tokenFailIndicateLogin() {
  saveUserAuth();
  const { guardAuthClient } = useStoreData();
  guardAuthClient.value = {};
  goToHome();
}

/**
 * @callback store 将store返回，使用解构赋值接受
 */
export function useStoreData() {
  const login = useLogin();
  const stores = storeToRefs(login);
  return stores;
}

// 刷新页面后store内参数被清除，需重新设定
export function setStoreData(community = 'openeuler') {
  refreshInfo(community);
}

const setSessionInfo = (data: any) => {
  const { username, photo, aigcPrivacyAccepted } = data || {};
  if (username && photo) {
    sessionStorage.setItem(
      LOGIN_KEYS.USER_INFO,
      JSON.stringify({ username, photo, aigcPrivacyAccepted })
    );
  }
};
const getSessionInfo = () => {
  let username = '';
  let photo = '';
  let aigcPrivacyAccepted = '';
  try {
    const info = sessionStorage.getItem(LOGIN_KEYS.USER_INFO);
    if (info) {
      const obj = JSON.parse(info) || {};
      username = obj.username || '';
      photo = obj.photo || '';
      aigcPrivacyAccepted = obj.aigcPrivacyAccepted || '';
    }
  } catch (error) {}
  return {
    username,
    photo,
    aigcPrivacyAccepted,
  };
};
const removeSessionInfo = () => {
  sessionStorage.removeItem(LOGIN_KEYS.USER_INFO);
};

// 刷新后重新请求登录用户信息
export function refreshInfo(community = 'openeuler') {
  const { token } = getUserAuth();
  if (token) {
    const { guardAuthClient } = useStoreData();
    guardAuthClient.value = getSessionInfo();
    queryPermission({ community }).then((res) => {
      const { data } = res;
      if (Object.prototype.toString.call(data) === '[object Object]') {
        guardAuthClient.value = data;
        setSessionInfo(data);
      }
    });
  } else {
    removeSessionInfo();
  }
}

// 判断是否为有效登录状态
export function isLogined() {
  return new Promise((resolve, reject) => {
    const { token } = getUserAuth();
    if (token) {
      queryPermission({ community: 'openeuler' })
        .then((res) => {
          const { data } = res;
          if (data) {
            if (Object.prototype.toString.call(data) === '[object Object]') {
              const { guardAuthClient } = useStoreData();
              guardAuthClient.value = data;
              setSessionInfo(data);
            }
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((err) => reject(err));
    } else {
      reject(false);
    }
  });
}

export function hasPermission(per: string) {
  const { guardAuthClient } = useStoreData();
  if (Array.isArray(guardAuthClient?.value?.permissions)) {
    return guardAuthClient.value.permissions.includes(per);
  }
  return false;
}

export function getLanguage() {
  if (location.pathname.includes('/zh/')) {
    return {
      lang: 'zh',
      language: 'zh-CN',
    };
  }
  return {
    lang: 'en',
    language: 'en-US',
  };
}
