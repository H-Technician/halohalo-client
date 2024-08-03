import Http from '@/composables/useRequest'
import type { UserInfo } from '@/types/user'
// 获取用户信息
export async function getUserInfoApi() {
    return await Http.get<UserInfo>('/user/account/getUserInfo');
}