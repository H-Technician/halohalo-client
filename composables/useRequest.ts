import type { LoginData } from '@/types/login'
import { isTokenExpired } from '@/utils/jwt';
import { localStoragejwt } from '@/utils/localStorage';
interface ResOptions<T> {
    data?: T;
    code?: number;
    msg?: string;
}

// 定义一个类型来描述可选的请求头
interface RequestOptions {
    headers?: Record<string, string>; // 请求头
    signal?: AbortSignal; // 允许取消请求
}
// Token刷新
async function refreshToken(refreshJwt: string, baseUrl: string) {
    const refreshTokenEndpoint = baseUrl + '/RefreshToken'; // 刷新Token的API地址
    
    try {
        const response = await $fetch<ResOptions<any>>(refreshTokenEndpoint, {
            method: 'GET',
            headers: {
                'Refresh-Token': `Bearer ${refreshJwt}`,
                'Content-Type': 'application/json',
            },
        });

        if (response && response.data as LoginData) {
            // 更新Token
           if (process.client) {
                localStoragejwt(
                    response.data.jwt, 
                    response.data.refreshJwt, 
                    response.data.uid, 
                    response.data.username
                )
            }
            return response.data.jwt;
        } else {
            console.error('请求新token出错');
        }
    } catch (error) {
        console.error('获取新token错误:', error);
        throw error;
    }
}

const fetch = async <T>(url: string, options?: RequestOptions & any): Promise<ResOptions<T>> => {
    const config = useRuntimeConfig();
    let baseUrl = config.public.baseUrl;
    const reqUrl = baseUrl + url;
    //获取cookie中的token信息
    // 从本地存储中获取jwt令牌信息
    let jwt = null;
    let localRefreshJwt = null;
    if (process.client) {
        jwt = localStorage.getItem('h_jwt');
        localRefreshJwt = localStorage.getItem('h_refresh_jwt');
    }
    // 将传入的headers（如果有）合并到请求配置中
    const mergedOptions = {
        ...options,
        headers: {
            ...(options?.headers || {}),
            // 可以在这里添加默认的headers，如认证信息等
            // Device-Type是自定义的请求头
            'Device-Type': 'web',
        },
    };
    if (jwt !== null) {
        mergedOptions.headers.Authorization = `Bearer ${jwt}`;
    }
    if (options?.body instanceof FormData) {
        // 如果是FormData，不设置Content-Type
      } else {
        // 如果不是FormData，检查并设置Content-Type，除非它已经被设置
        if (!mergedOptions.headers['Content-Type']) {
            mergedOptions.headers['Content-Type'] = 'application/json';
        }
    }
    try {
        const response = await $fetch<ResOptions<T>>(reqUrl, 
            { ...mergedOptions,
                signal: options?.signal, // 是否取消传递给fetch请求
             });
        if (response.code === 200) {
            return response;
        }
        // 检查自定义错误码code是否为401
        if (response.code === 401) {
            if (process.client) {
                try {
                    let retryResponse: ResOptions<T>;
                    let newAccessToken: string;
                    if (localRefreshJwt != null) {
                        if (isTokenExpired(localRefreshJwt)) {
                            // console.log('JWT已过期');
                            return response;
                        } else {
                            // console.log('JWT有效');
                            newAccessToken = await refreshToken(localRefreshJwt, baseUrl);
                            // 更新请求头中的Authorization字段
                            mergedOptions.headers.Authorization = `Bearer ${newAccessToken}`;
    
                            // 使用新Token重试请求
                            retryResponse = await $fetch<ResOptions<T>>(reqUrl, mergedOptions);
                            // console.log(retryResponse);
                            return retryResponse;
                        }
                    } else {
                            // console.log('没有找到JWT');
                            return response
                        // 处理没有token的情况
                    }
                } catch (refreshErr) {
                    console.error('获取新token失败:', refreshErr);
                    throw refreshErr;
                }
            }
        }
        return response;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            // 捕获取消请求的错误
            // throw  error;
            return Promise.resolve({ data: null, code: 500, msg: error.message } as ResOptions<T>);
        } else {
            // 其他类型的错误则正常处理，例如打印错误信息或抛出
            // console.error(`请求错误 ${reqUrl}: `, error);
            return Promise.resolve({ data: null, code: 500 } as ResOptions<T>);
        }
    }
};

export default new class Http {

    async get<T>(url: string, params?: any, headers?: RequestOptions['headers']): Promise<ResOptions<T>> {
        return fetch<T>(url, { method: 'get', params, headers });
    }
  
    async post<T>(url: string, body?: any | FormData, signal?: AbortSignal, headers?: RequestOptions['headers']): Promise<ResOptions<T>> {
        return fetch<T>(url, { method: 'post', body, headers, signal });
    }
  
    async put<T>(url: string, body?: any, headers?: RequestOptions['headers']): Promise<ResOptions<T>> {
        return fetch<T>(url, { method: 'put', body, headers });
    }
  
    async delete<T>(url: string, body?: any, headers?: RequestOptions['headers']): Promise<ResOptions<T>> {
        return fetch<T>(url, { method: 'delete', body, headers });
    }
}
