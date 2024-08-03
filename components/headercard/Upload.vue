<template>
    <div class="upload-popover">
        <div class="upload-popover-content">
            <NuxtLink class="upload-popover-content-item" to="/platform/upload/text/edit?spm_id_from=333.1007.0.0" target="_blank">
                <IconsHeaderbarUploadZhuanLan />
                <span class="upload-text">专栏投稿</span>
            </NuxtLink>
            <NuxtLink class="upload-popover-content-item">
                <IconsHeaderbarUploadYinPin />
                <span class="upload-text">音频投稿</span>
            </NuxtLink>
            <NuxtLink class="upload-popover-content-item">
                <IconsHeaderbarUploadTieZhi />
                <span class="upload-text">贴纸投稿</span>
            </NuxtLink>
            <NuxtLink class="upload-popover-content-item" to="/platform/upload/video/frame?spm_id_from=333.1007.0.0" target="_blank">
                <IconsHeaderbarUploadVideo />
                <span class="upload-text">视频投稿</span>
            </NuxtLink>
            <NuxtLink class="upload-popover-content-item" to="/platform/upload-manager/article?spm_id_from=333.1007.0.0" target="_blank">
                <IconsHeaderbarUploadManage />
                <span class="upload-text">投稿管理</span>
            </NuxtLink>
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['isLogin']);
</script>
<style scoped lang="scss">
.upload-popover {
    width: 320px;
    height: 70px;
    padding: 10px;
    box-sizing: border-box;

    .upload-popover-content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);

        .upload-popover-content-item {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            display: flex;
            align-items: center;
            flex-direction: column;
            flex-shrink: 0;
            text-align: center;
            text-decoration: none;

            .upload-text {
                font-size: 12px;
                color: $item-color;
            }
            &:hover {
                background-color: $background--hover;
            }
        }
    }
}
</style>