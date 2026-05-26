import { oa } from '@/shared/analytics';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLoginStore, LOGIN_STATUS } from '@opendesign-plus/composables';

export const useUserInfoStore = defineStore('userInfo', () => {
  // 登录信息
  const guardAuthClient = ref({
    email: '',
    photo: '',
    username: '',
  } as any);

  const setGuardAuthClient = (data: any) => {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      if (data.username) {
        (window as any)?.__OA_INSTANCE__?.setHeader({ uId: data.username });
      }
      Object.keys(guardAuthClient.value).forEach((key) => {
        guardAuthClient.value[key] = data[key] || '';
      });
    } else {
      clearGuardAuthClient();
    }
  };

  const clearGuardAuthClient = () => {
    const loginStore = useLoginStore();
    loginStore.setLoginStatus(LOGIN_STATUS.NOT);
    setGuardAuthClient({});
  };

  return {
    guardAuthClient,
    setGuardAuthClient,
    clearGuardAuthClient,
  };
});
