<template>
    <div class="category-select">
        <div class="select-controller"
            ref="categorySelectController"
            :class="isShowPop ? 'select-controller-selecting' : ''"
            @click="isShowPop = !isShowPop"
        >
            <p class="select-item-inserted">{{ categoryMain }} → {{ categorySub }}</p>
            <el-icon size="12" class="icon-xiajiantou" :class="isShowPop ? 'selecting-icon' : ''"><ElIconArrowDown /></el-icon>
        </div>
        <div class="drop-container" ref="categoryPop" :style="isShowPop ? '' : 'display: none;'">
            <div class="drop-main">
                <div v-if="categoryList.length != 0">
                    <div
                        class="drop-main-item"
                        :class="main == index ? 'drop-main-item-selected' : ''"
                        v-for="(item, index) in categoryList"
                        :key="index"
                        @click="selectMain(index)"
                    >{{ item.name }}</div>
                </div>
                
            </div>
            <div class="drop-sub" v-if="categoryList.length != 0">
                <div
                    class="drop-sub-item"
                    v-for="(item, index) in categoryList[main].subCategories"
                    :key="index"
                    @click="selectSub(index)"
                >
                    <p class="item-name"
                        :class="sub == index ? 'drop-sub-item-selected' : ''"
                    >{{ item.sub_name }}</p>
                    <p class="item-descr" v-if="item.sub_descr">{{ item.sub_descr }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Category } from '@/types/category'
import { getAategoryApi } from '@/api/category';
const categoryList = ref<Category[]>([]);
const categoryMain = ref("生活");
const categorySub = ref("搞笑");
const isShowPop = ref(false);
const main = ref(0);    // 选中主分区在categoryList中的index 控制pop的显示
const sub = ref(0);     // 选中子分区在categoryList中的index 控制pop的显示
const emit = defineEmits(['SelectCategory']);
const categorySelectController = ref<HTMLElement | null>(null);
const categoryPop = ref<HTMLElement | null>(null);
// 点击空白处关闭气泡
const handleOutsideClick = (event: { target: any; }) => {
    if (categorySelectController.value && categoryPop.value) {
        if (
            !categorySelectController.value.contains(event.target)
            && !categoryPop.value.contains(event.target)
        ) {
            isShowPop.value = false;
        }
    }
};

// 点击主分类
const selectMain = (mainIndex: number) => {
    main.value = mainIndex;
};
// 点击子分类的回调
const selectSub = (subIndex: number) => {
    sub.value = subIndex;
    categoryMain.value = categoryList.value[main.value].name;
    categorySub.value = categoryList.value[main.value].subCategories[subIndex].sub_name;
    const categoryId = categoryList.value[main.value].id;
    const categorySubId = categoryList.value[main.value].subCategories[subIndex].sub_id;
    isShowPop.value = false;
    emit("SelectCategory", categoryId, categorySubId, categoryList.value[main.value].subCategories[subIndex].sub_tag);     // 将分区更新回父组件
}

const getCategoryList = async () => {
    const response = await getAategoryApi();
    if (response.code === 200) {
        categoryList.value = response.data as Category[];
    } else {
        throw new Error('获取分区信息失败');
    }
    
}
onMounted(async () => {      
    // 页面渲染后创建点击事件的监听器
    window.addEventListener("click", handleOutsideClick);
    getCategoryList();
})
onBeforeUnmount(() => {
    // 关闭页面前清除点击事件的监听器
    window.removeEventListener("click", handleOutsideClick);
})

</script>

<style scoped lang="scss">
.category-select {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 300px;
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
            width: 128px;
            height: 264px;
            overflow-x: hidden;
            overflow-y: auto;

            .drop-main-item {
                padding: 12px 24px;
                width: 128px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;

                &:hover {
                    background-color: #f4f5f7;
                }
            }

            .drop-main-item-selected {
                color: $theme-color;
            }
        }

        .drop-sub {
            border-left: 1px solid #e5e9ef;
            padding-top: 12px;
            min-width: 256px;
            height: 264px;
            overflow-x: hidden;
            overflow-y: auto;

            .drop-sub-item {
                padding: 0 24px;
                display: flex;
                align-items: center;
                cursor: pointer;
                min-width: 128px;

                .item-name {
                    font-size: 14px;
                    color: #212121;
                    margin-right: 18px;
                    white-space: nowrap;
                }

                .item-descr {
                    font-size: 13px;
                    color: #999;
                    white-space: nowrap;
                }

                &:hover {
                    background-color: #f4f5f7;
                }
            }

            .drop-sub-item-selected {
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