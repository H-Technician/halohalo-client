import type { CaptchaRes } from '@/types/captcha'
// 获取行为验证码接口
export async function getCaptchaApi(data: object): Promise<CaptchaRes> {
    const config = useRuntimeConfig();
    let baseUrl = config.public.baseUrl;
    const reqCaptchaUrl = baseUrl + '/captcha/get';
    try {
        const response = await $fetch(reqCaptchaUrl, {
        method: 'POST', // 请求方式 POST
        headers: {
            'Content-Type': 'application/json', // 设置请求内容类型
        },
        body: data, // 将请求体数据转换为JSON字符串
        });
        return response as CaptchaRes;
    } catch (error) {
        console.error('请求错误:', error);
        // 处理错误情况
    }
    return {repCode: '500', repMsg: '请求失败', repData: null, success: false};
}
// 验证行为验证码接口
export async function checkCaptchaApi(data: object): Promise<CaptchaRes> {
    const config = useRuntimeConfig();
    let baseUrl = config.public.baseUrl;
    try {
        const reqCaptchaUrl = baseUrl + '/captcha/check';
        const response = await $fetch(reqCaptchaUrl, {
        method: 'POST', // 请求方式 POST
        headers: {
            'Content-Type': 'application/json', // 设置请求内容类型
        },
        body: data, // 将请求体数据转换为JSON字符串
        });
        return response as CaptchaRes
    } catch (error) {
        console.error('请求错误:', error);
        // 处理错误情况
    }
    return {repCode: '500', repMsg: '请求失败', repData: null, success: false};
}
