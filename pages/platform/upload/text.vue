<template>
    <div class="text-upload">
        <!-- 导航栏 -->
        <div class="upload-text-tabs">
            <ul>
                <li v-for="item in textTabList" @click="activeUploadTextTab(item.path)" :class="isActiveUploadTextTab === item.path ? 'is_active' : ''">
                    {{ item.name  }}
                </li>
            </ul>
        </div>
        <div class="text-body">
            <NuxtPage />
        </div>
    </div>
</template>
<script setup lang="ts">
// 获取路由实例
const router = useRouter();
const isActiveUploadTextTab = ref('/platform/upload/text/edit');
const activeUploadTextTab = (routerPath: string) => {
    if (isActiveUploadTextTab.value !== routerPath) {
        router.push(routerPath);
        isActiveUploadTextTab.value = routerPath;
    }
};
const textTabList = ref([
    {
        name: '专栏投稿',
        path: '/platform/upload/text/edit'
    },
    {
        name: '草稿箱',
        path: '/platform/upload/text/draft'
    }
]);
</script>
<style scoped lang="scss">
.text-upload {
    margin: 0 auto;
    padding: 0 100px;
}
.upload-text-tabs {
    margin-top: 16px;
    border-bottom: 1px solid $item-color-hover;
    ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;
        height: 30px;
        li {
            display: block;
            cursor: pointer;
            margin-left: 40px;
            font-size: 12px;
        }
        .is_active {
            color: $theme-color;
            font-family: "HarmonyOS_Sans_SC_Medium";
            border-bottom: 3px solid $theme-color;
        }
    }
}
.text-body {
    width: inherit;
    min-height: calc(100vh - 126px);
    background: #fff;
    display: flow-root;
}
</style>