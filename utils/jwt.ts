import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // 将毫秒转换成秒
    return typeof decodedToken.exp === 'number' && decodedToken.exp < currentTime;
  } catch (error) {
    return true; // 解码失败时假定令牌无效或过期
  }
}

interface JwtPayload {
  exp?: number; // 过期时间戳
}