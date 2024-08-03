export default defineNuxtRouteMiddleware((to: { path: string; }, from: any) => {
    // 登录状态
    const isLogin = useIsLogin();
    if (!isLogin.value && /^\/platform\/.+$/.test(to.path)) {
        return navigateTo('/passport/login')
    } 
    if (isLogin.value && to.path === '/passport/login') {
        return navigateTo('/platform/home')
    } 
    if (to.path === '/platform/upload/text') {
        return navigateTo('/platform/upload/text/edit');
    }

    if (to.path === '/platform/upload') {
        return navigateTo("/platform/upload/video/frame");
    }
    if (to.path === '/platform/upload-manager') {
        return navigateTo("/platform/upload-manager/article");
    }
})