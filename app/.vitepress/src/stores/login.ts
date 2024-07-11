import { defineStore } from 'pinia';
import { ref } from 'vue';

type LoginStatus = 'NOT_LOGIN' | 'LOGINiNG' | 'LOGINED'

export const useLogin = defineStore('login', () => {
  // 登录信息
  const guardAuthClient = ref({
    aigcPrivacyAccepted: '',
    email: '',
    photo: '',
    username: '',
  } as any);
  const setGuardAuthClient = (data: any) => {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      Object.keys(guardAuthClient.value).forEach(key => {
        guardAuthClient.value[key] = data[key] || '';
      })
    } else {
      clearGuardAuthClient();
    }
  }
  const clearGuardAuthClient = () => {
    setLoginStatus('NOT_LOGIN')
    setGuardAuthClient({})
  }

  // 登录状态
  const loginStatus = ref<LoginStatus>('NOT_LOGIN');
  const setLoginStatus = (status: LoginStatus) => {
    loginStatus.value = status;
  };
  return { guardAuthClient, setGuardAuthClient, clearGuardAuthClient, loginStatus, setLoginStatus };
});
