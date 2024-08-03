import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.component('WangEditor', Editor)
    nuxt.vueApp.component('WangToolbar', Toolbar)
})
