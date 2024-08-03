<template>
    <div class="text-edit">
        <div class="text-edit-container">
            <ClientOnly>
                <div style="border: 1px solid #ccc; margin-top: 10px">
                <WangToolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
            
                <WangEditor style="height: 350px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
                    @onCreated="handleCreated" @onChange="handleChange" @onDestroyed="handleDestroyed" @onFocus="handleFocus"
                    @onBlur="handleBlur" @customAlert="customAlert" @customPaste="customPaste" />
                </div>
            </ClientOnly>
        </div>
    </div>
</template>
<script  setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'

const mode = 'simple'

const isClient = ref(false)
if (process.client) {
isClient.value = true
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p></p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
setTimeout(() => {
    valueHtml.value = '<p></p>'
}, 1500)
})

const toolbarConfig = {
    excludeKeys: [
    "blockquote",
    "bgColor",
    "fontFamily",
    "todo",
    "group-indent",
    "insertTable",
    "group-image",
    "group-video",
    "group-link",
    "insertVideo",
    "codeBlock",
    "fullScreen"
  ],
  insertKeys: {
    index: 20,
    keys: "uploadImage"
  }
}
const editorConfig = { placeholder: '请输入文章内容...'}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
const editor = editorRef.value
if (editor == null) return
editor.destroy()
})


const handleCreated = (editor: any) => {
editorRef.value = editor // 记录 editor 实例，重要！
};

const handleChange = (editor: any) => {
// console.log('change:', editor.getHtml());
};

const handleDestroyed = (editor: any) => {
// console.log('destroyed', editor);
};

const handleFocus = (editor: any) => {
// console.log('focus', editor);
};

const handleBlur = (editor: any) => {
// console.log('blur', editor)
}
const customAlert = (info: any, type: any) => { alert(`【自定义提示】${type} - ${info}`) }
const customPaste = (editor: any, event: any, callback: any) => {
// console.log('ClipboardEvent 粘贴事件对象', event)
// const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
// const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
// const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

// 自定义插入内容
editor.insertText('xxx')

// 返回 false ，阻止默认粘贴行为
event.preventDefault()
callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

// 返回 true ，继续默认的粘贴行为
// callback(true)
}
</script> 
<style scoped>
.text-edit {
    padding-top: 20px;
    margin: 0 auto;
}
</style>
  