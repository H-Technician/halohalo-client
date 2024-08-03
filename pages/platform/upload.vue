<template>
    <div class="platform-upload">
        <!-- 导航栏 -->
        <div class="upload-tabs" :style="isShowUploadTab ? '' : 'display: none'">
            <ul>
                <li v-for="item in tabList" @click="activeUploadTab(item.path)" :class="isActiveUploadTab === item.path ? 'is_active' : ''">
                    {{ item.name  }}
                </li>
            </ul>
        </div>
        <div class="upload-body">
            <NuxtPage />
        </div>
    </div>
</template>
<script setup lang="ts">
// 获取路由实例
const router = useRouter();
const route = useRoute();
const isShowUploadTab = ref(false);
const isActiveUploadTab = ref('/platform/upload/video/frame');
const activeUploadTab = (routerPath: string) => {
    if (isActiveUploadTab.value !== routerPath) {
        router.push(routerPath);
        isActiveUploadTab.value = routerPath;
    }
};
const tabList = ref([
    {
        name: '视频投稿',
        path: '/platform/upload/video/frame'
    },
    {
        name: '专栏投稿',
        path: '/platform/upload/text/edit'
    },
    {
        name: '音频投稿',
        path: '/platform/upload/audio/frame'
    },
    {
        name: '贴纸投稿',
        path: '/platform/upload/sticker'
    },
    {
        name: '视频素材投稿',
        path: '/platform/upload/videoMaterial'
    }
]);
//获取url路由中的查询参数
// watch(() => route.query, (newQuery, oldQuery) => {
//   const idFromQuery = newQuery.id as string | undefined;
//   const typeFromQuery = newQuery.type as string | undefined;

//   if (idFromQuery) {
//     console.log('ID from query:', idFromQuery, typeFromQuery);
//     isShowUploadTab.value = false;
//   } else {
//     console.log('No "id" query parameter found.');
//   }
// }, { deep: true });
// 监听路由变化,如果是由其它上传页面跳转来的,则隐藏导航栏，如果不是则显示导航栏
watchEffect(() => {
    if (route.path !== '/platform/upload' && route.path !== '/platform/upload/video/frame') {
        isShowUploadTab.value = true;
        isActiveUploadTab.value = route.path;
    } else {
        isShowUploadTab.value = false;
    }
});
// 监听路由变化,如果是由视频上传页面跳转来的,则隐藏导航栏
watchEffect(() => {
    if (route.path === '/platform/upload/video/frame' || route.path === '/platform/upload') {
        isShowUploadTab.value = false;
    }
})

</script>
<style scoped lang="scss">
.platform-upload {
    margin: 0 auto;
}
.upload-tabs {
    margin-top: 16px;
    border-bottom: 1px solid $item-color-hover;
    ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;
        height: 40px;
        li {
            display: block;
            cursor: pointer;
            margin-left: 40px;
        }
        .is_active {
            color: $theme-color;
            border-bottom: 3px solid $theme-color;
        }
    }
}
.upload-body {
    width: inherit;
    // height: calc(100vh - 100px);
    background: #fff;
    padding-bottom: 20px;
    display: flow-root;
}
</style>