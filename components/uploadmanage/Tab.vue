<template>
    <div class="upload-manager-tabs">
        <ul>
            <li v-for="item in tabList" @click="activeArticle(item.path)" :class="isActiveArticle === item.path ? 'is_active' : ''">
                {{ item.name  }}
            </li>
        </ul>
        <div class="upload-manager-tabs-search" v-if="props.isShowSearch">
            <UploadmanageSerchInput></UploadmanageSerchInput>
        </div>
    </div>
</template>
<script setup lang="ts">
// 获取路由实例
const route = useRoute();
const router = useRouter();
const isActiveArticle = ref('/platform/upload-manager/article');
const props = defineProps({
    isShowSearch: {
        type: Boolean,
        default: false
    }
});
const activeArticle = (routerPath: string) => {
    if (isActiveArticle.value !== routerPath) {
        router.push(routerPath);
        isActiveArticle.value = routerPath;
    }
};
const tabList = ref([
    {
        name: '视频管理',
        path: '/platform/upload-manager/article'
    },
    {
        name: '专栏管理',
        path: '/platform/upload-manager/text'
    },
    {
        name: '音频管理',
        path: '/platform/upload-manager/audios'
    },
    {
        name: '贴纸管理',
        path: '/platform/upload-manager/sticker-manage'
    },
    {
        name: '视频素材管理',
        path: '/platform/upload-manager/video-material-manage'
    }
]);
// 监听路由变化,激活对应的导航
watchEffect(() => {
    let match = tabList.value.find((item) => item.path === route.path);
    if (match) {
        isActiveArticle.value = match.path;
    }
});
</script>
<style scoped lang="scss">
.upload-manager-tabs {
    margin-top: 16px;
    border-bottom: 1px solid $item-color-hover;
    display: flex;
    justify-content: space-between;
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
</style>