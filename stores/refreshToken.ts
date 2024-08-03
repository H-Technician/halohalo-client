import { defineStore } from 'pinia';

export const useNewTokenStore = defineStore('NewToken', {
  state(): NewState {
    return {
      newAccessToken: '' as string, // 明确类型
      newRefreshToken: '' as string,
      newUid: '' as string,
      newUsername: '' as string,
    };
  },
  actions: {
    setNewAccessToken(value: string) {
      this.newAccessToken = value;
    },
    setNewRefreshToken(value: string) {
        this.newRefreshToken = value;
    },
    setNewUid(value: string) {
        this.newUid = value;
    },
    setNewUsername(value: string) {
        this.newUsername = value;
    },
  },
  // 注意：persist定义要做判断，因为localStorage/sessionStorage是客户端参数，所以需要加process.client
  // persist: process.client && {
  //   storage: localStorage,
  // },
});

interface NewState {
    newAccessToken: string;
    newRefreshToken: string;
    newUid: string;
    newUsername: string;
}