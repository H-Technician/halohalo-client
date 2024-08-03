// composables/useCookies.ts  
import Cookies from 'js-cookie'  
  
export function useCookies() {  
    // 你可以在这里添加一些常用的 cookie 操作函数  
    const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {  
        // 如果 options 没有被提供或者不是对象，则设置默认选项  
        const defaultOptions: Cookies.CookieAttributes = {  
        path: '/', // 默认路径为根路径  
        // domain: 默认为空字符串，表示当前域名。如果需要设置 domain，可以传入相应的值  
        // ... 可以添加其他默认选项，如 expires, secure 等  
        };  
        
        // 合并默认选项和传入的选项  
        const mergedOptions = { ...defaultOptions, ...options };  
        
        // 使用 js-cookie 设置 cookie  
        Cookies.set(name, value, mergedOptions);  
    };  
    
    const getCookie = (name: string) => {  
        return Cookies.get(name)  
}  
  
const removeCookie = (name: string, options?: Cookies.CookieAttributes) => {  
// 默认情况下，不指定 path 和 domain，js-cookie 会使用当前页面的 path 和 domain  
// 如果 cookie 设置了特定的 path 或 domain，你需要在这里指定它们  
    const defaultOptions: Cookies.CookieAttributes = {};  

    // 合并默认选项和传入的选项（如果有的话）  
    const mergedOptions = { ...defaultOptions, ...options };  

    // 调用 js-cookie 的 remove 方法来删除 cookie  
    Cookies.remove(name, mergedOptions);  
}   
  
  const removeAllCookies = () => {  
    const cookies = Cookies.get(); // 注意：js-cookie 的 get 方法默认不返回所有 cookie，而是返回指定名称的 cookie  
    // 但是我们可以遍历 document.cookie 来获取所有 cookie 的名称  
    document.cookie.split("; ").forEach((c) => {  
      const [name] = c.split("=");  
      Cookies.remove(name);  
    });  
  };
  
  // 返回这些函数，以便在组件中使用  
  return {  
    setCookie,  
    getCookie,  
    removeCookie,
    removeAllCookies,  
  }  
}