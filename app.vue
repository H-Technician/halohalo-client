<template>
    <NuxtPage/>
</template>
<script setup lang="ts">
import { log } from '@/utils/log'
//SEO 优化信息
// useSeoMeta({
//     //网站标题
//     title: 'halohalo-弹幕网',
//     //网站描述
//     description: 'halohalo-弹幕网',
//     //网站关键词
//     keywords: 'halohalo-弹幕网',
//     charset: 'utf-8',
//     viewport: 'width=device-width, initial-scale=1',
//     ogLocale: 'zh_CN',
//     ogType: 'website',
//     ogTitle: 'halohalo-弹幕网',
// })
onMounted(() => {
    log();
})
</script>
<style lang="scss">
:root {
    --el-color-primary: $theme-color;
}
</style>
