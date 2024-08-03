<template>
    <div class="article-content">
        <!-- 顶部导航栏 -->
        <UploadmanageTab :isShowSearch="true"></UploadmanageTab>
        <div class="article-header">
            <ul>
                <li 
                    v-for="(item, index) in tabitems" 
                    :key="index"
                    :class="{ is_active: isActiveIndex === index }"
                    @click="toggleActive(index)"
                >
                    {{ item.text }} {{ item.count }}
                </li>
                <div class="text-split_wrap" v-if="isActiveIndex === 0">
                    <div class="text-split-item"
                    v-for="(item, index) in items"
                    :class="{ is_active: isItemActiveIndex === index }"
                    @click="itemActive(index)">
                    {{ item.text }} {{ item.count }}
                    </div>
                </div>
            </ul>
            <div class="article-header-right" v-if="isActiveIndex === 0">
                <UploadmanageCategorySelect/>
                <UploadmanageSortSelect style="margin-left: 20px;"/>
            </div>
        </div>
        <div class="article-content_wrap">
            <div class="info-wrp">
                <img src="@/assets/img/platform/article_empty.png" alt="">
                <div class="text">一个稿件都没有，请换个筛选条件</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const isActiveIndex = ref(0);  // 默认选中
const isItemActiveIndex = ref(0);
const tabitems = [
  { text: '全部稿件', count: 0 },
  { text: '草稿', count: 0 },
];
const items = [
  { text: '执行中', count: 0 },
  { text: '已通过', count: 0 },
  { text: '未通过', count: 0 },
];
const toggleActive = (index: number) => {
  isActiveIndex.value = index;
}
const itemActive = (index: number) => {
  isItemActiveIndex.value = index;
}
</script>
<style scoped lang="scss">
.article-content{
    .article-header {
        margin: 8px 0 26px;
        height: 32px;
        display: flex;
        justify-content: space-between;
        position: relative;
        ul {
            list-style: none;
            display: flex;
            padding: 0;
            margin: 0;
            height: 32px;
            display: flex;
            align-items: center;
            li {
                display: block;
                cursor: pointer;
                margin-left: 40px;
                font-size: 14px;
            }
            .is_active {
                color: $theme-color;
            }
            
        }
        .article-header-right {
            display: flex;
        }
        .text-split_wrap {
            position: absolute;
            height: 20px;
            display: flex;
            top: 34px;
            left: 24px;
            color: rgba(80, 80, 80, .7);;

            .text-split-item {
                box-sizing: border-box;
                margin: 1px;
                padding: 0 16px 0 16px;
                font-size: 14px;
                cursor: pointer;
                &:nth-child(1) {
                    border-right: 1px solid #e7e7e7;
                }
                &:nth-child(2) {
                    border-right: 1px solid #e7e7e7;
                }
            }
        }
    }
    .article-content_wrap {
        height: auto;
        width: 100%;
        .info-wrp {
            padding: 50px 0 0 0;
            text-align: center;
            img {
                margin: 20px 0;
            }
            .text {
                font-size: 14px;
                padding: 20px 0;
            }
        }
    }
}
</style>