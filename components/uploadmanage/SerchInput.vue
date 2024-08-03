<template>
    <div class="search-input-box"
    ref="serchInputBox">
        <div class="search-input"
        @click="isFocusSearch = true" 
        :class="isFocusSearch ? 'focus' : ''">
            <input type="text" placeholder="搜索稿件" v-model="searchKeywords" />
            <el-icon class="search-icon">
            <ElIconSearch/>
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
const serchInputBox = ref<HTMLElement | null>(null);
const isFocusSearch = ref(false);
const searchKeywords = ref('');
// 点击空白处关闭气泡
const handleOutsideClick = (event: { target: any; }) => {
    if (serchInputBox.value) {
        if (!serchInputBox.value.contains(event.target)) {
            isFocusSearch.value = false;
        }
    }
};
onMounted(async () => {      
    // 页面渲染后创建点击事件的监听器
    window.addEventListener("click", handleOutsideClick);
})
onBeforeUnmount(() => {
    // 关闭页面前清除点击事件的监听器
    window.removeEventListener("click", handleOutsideClick);
})
</script>
<style scoped lang="scss">
.search-input-box{
    .search-input {
        height: 32px;
        width: 240px;
        border: 1px solid #e7e7e7;
        padding: 3px 10px;
        box-sizing: border-box;
        border-radius: 6px;
        display: flex;
        align-items: center;

        input {
            border: none;
            outline: none;
            padding: 0;
            width: 196px;
            &:focus {
                border: none;
                outline: none;
            }
        }

        .search-icon {
            color: $item-color;
            cursor: pointer;
        }

    }
    .focus {
        border: 1px solid $theme-color;
    }
}
</style>