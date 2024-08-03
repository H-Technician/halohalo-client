// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
    "@/assets/css/fonts.css",
    "@/assets/css/global.css"
  
  ],
  app: {
    buildAssetsDir: '/halohalo_web/',
    rootId: "hl_app",
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    {
      src: '@/plugins/wangeditor',
      mode: 'client',
    },
    {
      src: '@/plugins/pinia'
    }
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/colors.scss" as *;'
        }
      }
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        prependPath: true
      }
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:8080/api/**',
      }
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: '/api',
      aesKey: 'E5B056F43EBD7A2D45B3CFD8F1BE4A18',
      jwtDomain: '.v.hblog.top',
      jwtExpire: 86400000,
      jwtRefreshExpire: 864000000,
    }
  },
  experimental: {
    inlineSSRStyles: false,
  },
  layouts: {
    default: null, // 不使用布局
  }
  
})
