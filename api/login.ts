import Http from '@/composables/useRequest'
import type { LoginData } from '@/types/login'
// 登录接口
export async function loginApi(data: object) {
    return await Http.post<LoginData>('/user/account/login', data);
}
// 注册接口
export async function registerApi(data: object) {
    return await Http.post<LoginData>('/user/account/register', data);
}
// 第三方登录接口
export async function authLoginApi(data: object, type: string) {
    return await Http.get<string>(`/OauthLogin/${type}/render`, data);
}
// 获取验证码接口
export async function getCodeApi(data: object) {
    return await Http.get('/user/account/register/getcode', data);
}
// 退出登录接口
export async function logoutApi() {
    return await Http.get('/user/account/logout');
}