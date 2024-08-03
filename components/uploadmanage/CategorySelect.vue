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
        <div class="drop-container" ref="selectPop" :style="isShowPop && categoryList.length != 0 ? '' : 'display: none;'">
            <div class="drop-main">
                <div v-if="categoryList.length != 0">
                    <div
                        class="drop-main-item"
                        :class="main == index ? 'drop-main-item-selected' : ''"
                        v-for="(item, index) in categoryList"
                        :key="index"
                        @click="selectMain(index)"
                    >{{ item.name }} {{ 0 }}<el-icon style="margin-left: 6px;" v-if="main == index"><ElIconSelect /></el-icon></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Category } from '@/types/category'
import { getAategoryApi } from '@/api/category';
const categoryList = ref<Category[]>([]);
const selectMainText = ref("");
const isShowPop = ref(false);
const isSelected = ref(false);
const main = ref(0);    // 选中主分区在authList中的index 控制pop的显示
const emit = defineEmits(['SelectCategory']);
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
    selectMainText.value = categoryList.value[main.value].name;
    emit("SelectCategory", categoryList.value[main.value].name);
    isShowPop.value = false;
};
// 获取分区列表
const getCategoryList = async () => {
    const response = await getAategoryApi();
    if (response.code === 200) {
        categoryList.value = response.data as Category[];
        categoryList.value.unshift({
            id: 0,
            name: "全部分区",
            subCategories: []
        });
    } else {
        throw new Error('获取分区信息失败');
    }
    
}
onMounted(async () => {      
    // 页面渲染后创建点击事件的监听器
    window.addEventListener("click", handleOutsideClick);
    await getCategoryList();
    selectMainText.value = categoryList.value[main.value].name;
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
    min-width: 120px;
    width: auto;
    height: 40px;
    box-sizing: border-box;

    .select-controller {
        box-sizing: border-box;
        padding: 7px 12px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        min-width: 120px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        color: #000;
        transition: border .3s ease;
        background: #fff;
        width: auto;

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
            color: #000;
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
        top: 38px;
        z-index: 10;
        display: flex;

        .drop-main {
            padding: 12px 0;
            width: auto;
            height: auto;
            overflow-x: hidden;
            overflow-y: auto;

            .drop-main-item {
                padding: 10px 13px;
                width: auto;
                min-width: 120px;
                box-sizing: border-box;
                cursor: pointer;
                display: flex;
                justify-content: start;
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
</style>