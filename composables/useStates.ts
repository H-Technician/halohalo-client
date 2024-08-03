import { isTokenExpired } from '@/utils/jwt';
//是否登录
export const useIsLogin = () => useState<boolean>('isLogin', () => {
  const cookiesToken = useCookie('h_jwt');
  const refreshCookiesToken = useCookie('h_refresh_jwt');
  if (refreshCookiesToken.value !== null && refreshCookiesToken.value !== undefined) {
    if (isTokenExpired(refreshCookiesToken.value)) {
        // console.log('JWT已过期');
        return false;
    } else {
        return true;
    }
  } else if (cookiesToken.value !== null && cookiesToken.value !== undefined) {
    if (isTokenExpired(cookiesToken.value)) {
        return false;
    } else {
        return true;
    }
  } else {
    return false;
  }
});