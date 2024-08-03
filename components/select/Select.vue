<template>
    <div class="select-box">
        <div class="select-controller"
            ref="selectController"
            :class="isShowPop ? 'select-controller-selecting' : ''"
            @click="isShowPop = !isShowPop"
        >
            <p :class="isSelected ? 'select-item-inserted' : 'select-item'">{{ selectMainText }}</p>
            <el-icon size="12" class="icon-xiajiantou" :class="isShowPop ? 'selecting-icon' : ''"><ElIconArrowDown /></el-icon>
        </div>
        <div class="drop-container" ref="selectPop" :style="isShowPop && authList.length != 0 ? '' : 'display: none;'">
            <div class="drop-main">
                <div v-if="authList.length != 0">
                    <div
                        class="drop-main-item"
                        :class="main == index ? 'drop-main-item-selected' : ''"
                        v-for="(item, index) in authList"
                        :key="index"
                        @click="selectMain(index)"
                    >作者声明：{{ item.item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Auth } from '@/types/auth'
import { getAuthApi } from '@/api/upload';
const authList = ref<Auth[]>([]);
const selectMainText = ref(" 请选择符合您视频内容的创作声明");
const isShowPop = ref(false);
const isSelected = ref(false);
const main = ref(0);    // 选中主分区在authList中的index 控制pop的显示
const emit = defineEmits(['SelectAuth']);
const selectController = ref<HTMLElement | null>(null);
const selectPop = ref<HTMLElement | null>(null);
// 点击空白处关闭气泡
const handleOutsideClick = (event: { target: any; }) => {
    if (selectController.value && selectPop.value) {
        if (
            !selectController.value.contains(event.target)
            && !selectPop.value.contains(event.target)
        ) {
            isShowPop.value = false;
        }
    }
};

// 点击创作者声明
const selectMain = (mainIndex: number) => {
    if (!isSelected.value) {
        isSelected.value = true;
    }
    main.value = mainIndex;
    selectMainText.value = authList.value[main.value].item;
    emit("SelectAuth", authList.value[main.value].item);
    isShowPop.value = false;
};
// 获取作者声明
const getAuth = async () => {
    const response = await getAuthApi();
    if (response.code = 200) {
        authList.value = response.data as Auth[];
    }
}

onMounted(async () => {      
    // 页面渲染后创建点击事件的监听器
    window.addEventListener("click", handleOutsideClick);
    await getAuth();
})
onBeforeUnmount(() => {
    // 关闭页面前清除点击事件的监听器
    window.removeEventListener("click", handleOutsideClick);
})

</script>

<style scoped lang="scss">
.select-box {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-width: 460px;
    height: 40px;
    box-sizing: border-box;

    .select-controller {
        box-sizing: border-box;
        padding: 7px 12px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        min-width: 200px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        color: #99a2aa;
        transition: border .3s ease;
        background: #fff;

        .select-item-inserted {
            color: #222;
            line-height: 22px;
            height: 22px;
            font-size: 14px;
            display: inline-block;
            white-space: nowrap;
            margin: 0;
        }

        .select-item {
            color: #99a2aa;
            line-height: 22px;
            height: 22px;
            font-size: 14px;
            display: inline-block;
            white-space: nowrap;
            margin: 0;
        }

        &:hover {
            border-color: $theme-color;
        }

        .selecting-icon {
            transform: rotate(180deg);
        }

        .icon-xiajiantou {
            transition: transform 0.3s;
            margin-left: 4px;
        }
    }

    .select-controller-selecting {
        border-color: $theme-color;
    }

    .drop-container {
        background: #fff;
        border: 1px solid #e5e9ef;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.14);
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 46px;
        z-index: 10;
        display: flex;

        .drop-main {
            padding: 12px 0;
            width: auto;
            height: 240px;
            overflow-x: hidden;
            overflow-y: auto;

            .drop-main-item {
                padding: 10px 24px;
                width: auto;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #99a2aa;
                font-size: 14px;

                &:hover {
                    background-color: #f4f5f7;
                }
            }

            .drop-main-item-selected {
                color: $theme-color;
            }
        }

    }
}

*::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
}



</style>