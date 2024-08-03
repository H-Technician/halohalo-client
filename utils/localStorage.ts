// 存储jwt到本地存储
export function localStoragejwt (
    jwt: string, 
    refreshJwt: string, 
    uid: number, 
    username: string
) {
    localStorage.setItem('h_jwt', jwt);
    localStorage.setItem('h_refresh_jwt', refreshJwt);
    localStorage.setItem('h_uid', uid.toString());
    localStorage.setItem('h_username', username);
};

// 移除本地存储的jwt
export const removeLocalStoragejwt = () => {
    localStorage.removeItem('h_jwt');
    localStorage.removeItem('h_refresh_jwt');
    localStorage.removeItem('h_uid');
    localStorage.removeItem('h_username');
}