<template>
    <div class="center-search-container" ref="centerSearchContainer">
            <div class="center-search__bar" :class="isSearchPopShow ? 'is-focus' : ''">
                <!-- 输入框 -->
                <div
                    id="nav-searchform"
                    :class="isSearchPopShow ? 'nav-searchform-active' : ''"
                    ref="searchForm"
                >
                    <div class="nav-search-content">
                        <el-input
                            class="nav-search-input"
                            :class="isSearchPopShow ? 'nav-search-input-active' : ''"
                            v-model="searchInput"
                            placeholder="请输入搜索内容"
                            @focus="searchPopShow()"
                            @input="handleInput"
                            @blur="closesearchPopShow()"
                        ></el-input>
                    </div>
                    <div
                        class="nav-search-clean"
                        :style="searchInput == '' ? 'display: none;' : ''"
                        @click.stop="searchInput = ''"
                    >
                        <el-icon size="16" style="vertical-align: 30%;"><ElIconCircleCloseFilled /></el-icon>
                    </div>
                    <div class="nav-search-btn">
                        <el-icon><ElIconSearch /></el-icon>
                    </div>
                </div>
                <!-- 气泡框 -->
                <div class="search-panel" :style="isSearchPopShow ? '' : 'display: none;'" ref="searchPop">
                    <div class="history" v-if="searchInput == ''">
                        <div class="header">
                            <div class="title">搜索历史</div>
                            <div class="clear">清空</div>
                        </div>
                        <div class="histories-wrap" :style="isHistoryOpen ? 'max-height: 171px;' : 'max-height: 91px;'">
                            <div class="histories">
                                <div class="history-item" v-for="(item, index) in histories" :key="index">
                                    <div class="history-text">
                                        {{ item }}
                                    </div>
                                    <div class="close">
                                        <el-icon size="14" style="opacity: 0.4; color: #808385;"><ElIconCircleCloseFilled /></el-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="history-fold" v-if="isHistoryOpen" @click.stop="isHistoryOpen = false;">
                            <div class="fold-text">收起</div>
                            <el-icon class="icon-xiajiantou" style="transform: rotate(180deg); margin-left: 2px;" size="12">
                                <ElIconArrowDownBold />
                            </el-icon>
                        </div>
                        <div class="history-fold" v-else @click.stop="isHistoryOpen = true;">
                            <div class="fold-text">展开更多</div>
                            <el-icon class="icon-xiajiantou" size="12" style="margin-left: 2px;">
                                <ElIconArrowDownBold />
                            </el-icon>
                        </div>
                    </div>
                    <div class="trending" v-if="searchInput == ''">
                        <div class="header">
                            <div class="title">halohalo热搜</div>
                        </div>
                        <div class="trendings-double" v-if="screenWidth >= 1450  && centerSearchWidth >= 360">
                            <div class="trendings-col" style="max-width: calc(50% - 5px);">
                                <div
                                    class="trending-item"
                                    v-for="(item, index) in histories" :key="index"
                                >
                                    <div class="trending-wrap">
                                        <div class="trendings-rank" :class="index < 2 ? 'topThree' : ''">{{ index * 2 + 1 }}</div>
                                        <div class="trendings-text">{{ item }}</div>
                                        <img src="~assets/img/icon_new.png" alt="" class="trending-mark" v-if="true">
                                        <!-- v-if="histories" -->
                                        <img src="~assets/img/icon_hot.png" alt="" class="trending-mark" v-if="false">
                                    </div>
                                </div>
                            </div>
                            <div class="trendings-col" style="max-width: calc(50% - 5px);">
                                <div
                                    class="trending-item"
                                    v-for="(item, index) in histories" :key="index"
                                >
                                    <div class="trending-wrap">
                                        <div class="trendings-rank" :class="index < 1 ? 'topThree' : ''">{{ index * 2 + 2 }}</div>
                                        <div class="trendings-text">{{ item }}</div>
                                        <img src="~assets/img/icon_new.png" alt="" class="trending-mark" v-if="false">
                                        <img src="~assets/img/icon_hot.png" alt="" class="trending-mark" v-if="true">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="trendings-double" v-else>
                            <div class="trendings-col" style="margin-right: unset;">
                                <div
                                    class="trending-item"
                                    v-for="(item, index) in histories" :key="index"
                                >
                                    <div class="trending-wrap">
                                        <div class="trendings-rank" :class="index < 3 ? 'topThree' : ''">{{ index + 1 }}</div>
                                        <div class="trendings-text">{{ item }}</div>
                                        <img src="~assets/img/icon_new.png" alt="" class="trending-mark" v-if="true">
                                        <img src="~assets/img/icon_hot.png" alt="" class="trending-mark" v-if="false">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="suggestions" v-if="searchInput != ''">
                        <!-- v-if="searchInput != ''" -->
                        <div class="suggest-item"
                            v-for="(item, index) in histories"
                            :key="index"
                        >
                            {{ item }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script lang="ts" setup>
let isSearchPopShow = ref(false);
const handleInput = ref();
const searchInput = ref("");
const isComposite = ref(false);
const matchingWord: any[] = [];
const isHistoryOpen = ref(true);
const isOPenHeaderBarCenter = ref(false);
const centerSearchContainer = ref<HTMLElement | null>(null);
const props = defineProps({
    OPenHeaderCenter: {
        type: Boolean
    }
})
watchEffect(() => {
  if (props.OPenHeaderCenter) {
    isOPenHeaderBarCenter.value = true
  } else {
    isOPenHeaderBarCenter.value = false
  }
});

// 浏览器宽度
const screenWidth = ref<number>(0);
const centerSearchWidth = ref<number>(0);
// 监听窗口大小变化的处理函数
const handleResize = () => {
    screenWidth.value = window.innerWidth;
};

let histories = ref(['第一条历史记录','第二条历史记录','第三条历史记录','第四条历史记录','第五条历史记录'])
// 显示搜索气泡框
const searchPopShow  = () => {
    isSearchPopShow.value =true;
    
    //getMatchingWord();
    // console.log("显示热搜框: ", this.isSearchPopShow);
}
const closesearchPopShow = () => {
    isSearchPopShow.value=false;
    
}
// 初始化ResizeObserver
let resizeObserver: ResizeObserver | null = null;
// 在组件挂载后开始监听
onMounted(() => {
  handleResize(); // 初始时获取一次宽度
  window.addEventListener('resize', handleResize);
  if (centerSearchContainer.value) {
    resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLElement) {
            centerSearchWidth.value = entry.target.offsetWidth;
        }
      });
    });
    resizeObserver.observe(centerSearchContainer.value);
  }
});

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

</script>
<style scoped>
.center-search-container {
    flex: 1 auto; /* 宽度占80% 居中*/
    height: 40px;
    max-width: 400px;
}

.center-search-container .is-focus {
    box-shadow: 0 0 30px rgba(0,0,0,.1);
    border-radius: 8px;
}

.center-search-container .center-search__bar {
    position: relative;
    margin: 0 auto;
}

.is-focus #nav-searchform {
    background-color: #fff;
    border-bottom: none;
}

#nav-searchform {
    width: auto;
    display: flex;
    align-items: center;
    padding: 0 48px 0 4px;
    position: relative;
    z-index: 0;
    overflow: hidden;
    border: 1px solid #e3e6e8;
    height: 40px;
    border-radius: 8px;
    background-color: #f2f3f4;
    opacity: .9;
    transition: background-color .3s;
    /* margin-right: -2px; */
    flex: 1;
    min-width: 160px;
}

.nav-searchform-active {
    transition: background-color 0s !important;
    background-color: #fff !important;
    border-radius: 8px 8px 0 0 !important;
}

#nav-searchform .nav-search-input :deep(.el-input__wrapper) {
    background-color: rgba(255,255,255,0);
}

#nav-searchform .nav-search-input :deep(.el-input__inner) {
    line-height: normal;
}
#nav-searchform:hover {
    background-color: #fff;
}
.nav-search-content {
    flex: 1;
}

.nav-search-input :deep(.el-input__wrapper) {
    background-color: #f2f3f4;
    border-radius: 6px;
    box-shadow: none;
    padding: 1px 30px 1px 11px;
}
/* 兼容其它浏览器 placeholder  */
.nav-search-input :deep(::-webkit-input-placeholder) {
    font-family: "HarmonyOS_Sans_SC_Medium";
}
.nav-search-input :deep(::-moz-placeholder) {
    font-family: "HarmonyOS_Sans_SC_Medium";
}
.nav-search-input :deep(:-ms-input-placeholder) {
    font-family: "HarmonyOS_Sans_SC_Medium";
}
.nav-search-input :deep(::-ms-input-placeholder) {
    font-family: "HarmonyOS_Sans_SC_Medium";
}
.nav-search-input-active :deep(.el-input__wrapper) {
    background-color: #e6e8e9 !important;
}

.nav-search-clean {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    right: 55px;
    cursor: pointer;
    opacity: 0.15;
}

.nav-search-clean:hover {
    opacity: 0.25;
}

.nav-search-btn {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    color: #000000;
    line-height: 32px;
    cursor: pointer;
    transition: background-color .3s;
    opacity: 0.55;
}

.nav-search-btn:hover {
    background-color: #d3d5d8;
}

.center-search__bar {
    font-size: 18px;
}

.center-search-container .center-search__bar .search-panel {
    /* width: calc(100% - 2px); */
    min-width: 160px;
    max-height: 612px;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #e3e6e8;
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 13px 0 13px;
    -webkit-font-smoothing: antialiased;
    /* position: absolute; */
    margin: 0;
    flex: 1;
    /* opacity: .9; */
}
.center-search-container .center-search__bar .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
}

.center-search-container .center-search__bar  .header .title {
    height: 24px;
    font-size: 14px;
    line-height: 24px;
}

.center-search-container .center-search__bar  .header .clear {
    font-size: 14px;
    line-height: 15px;
    height: 15px;
    color: #000000;
    cursor: pointer;
}


.center-search-container .center-search__bar .histories-wrap {
    padding: 0 16px;
    overflow: hidden;
}

.center-search-container .center-search__bar .histories {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    margin-right: -10px;
    margin-bottom: 4px;
}

.center-search-container .center-search__bar .histories .history-item {
    position: relative;
    box-sizing: border-box;
    height: 30px;
    padding: 7px 10px 8px;
    font-size: 12px;
    line-height: 15px;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}

.center-search-container .center-search__bar .histories .history-item .history-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 96px;
}

.center-search-container .center-search__bar .histories .history-item .close {
    display: none;
    box-sizing: border-box;
    position: absolute;
    width: 13px;
    height: 13px;
    top: -6px;
    right: -3px;
    padding: 2px;
}

.center-search-container .center-search__bar .histories .history-item:hover .close {
    display: block;
}

.center-search-container .center-search__bar .histories .history-item .close i {
    font-size: 10px;
    color: #fff;
    background-color: #ccc;
    border-radius: 50%;
}

.center-search-container .center-search__bar .history-fold {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    margin: 0 auto 14px;
    color: #808385;
    cursor: pointer;
}

.center-search-container .center-search__bar .fold-text {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
}

.center-search-container .center-search__bar .trendings-double {
    display: flex;
    
}

.center-search-container .center-search__bar .trendings-double .trendings-col {
    flex: 1;
}

.center-search-container .center-search__bar .trendings-double .trendings-col:first-child {
    margin-right: 10px;
}

.center-search-container .center-search__bar .trending-wrap {
    box-sizing: border-box;
    height: 38px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 16px;
}

.center-search-container .center-search__bar .trending-item .trendings-rank {
    width: 13px !important;
    margin-right: 10px;
    color: #8a8a8a;
    font-size: 14px;
}

.center-search-container .center-search__bar .trending-wrap .topThree {
    color: #121212;
}

.center-search-container .center-search__bar .trending-item .trendings-text {
    font-size: 13px;
    line-height: 17px;
    height: 17px;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0;
}

.center-search-container .center-search__bar .trending-item .trending-mark {
    height: 14px;
    margin-right: 16px;
}

.center-search-container .center-search__bar .suggestions {
    margin-top: -6px;
    margin-bottom: -6px;
    overflow: hidden;
    width: 100%;
}

.center-search-container .center-search__bar .suggest-item {
    height: 32px;
    display: block;
    line-height: 32px;
    font-size: 13px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    padding: 0 16px;
    margin-bottom: 4px;
    flex: 1;
    width: 100%;
}

.center-search-container .center-search__bar .suggest-item:hover, .center-search-container .center-search__bar .suggest-item:focus {
    outline: none;
}
</style>
<style lang="scss" scoped>
.center-search-container .center-search__bar .suggest-item:focus {
    color: $upload-background;
}
.center-search-container .center-search__bar .suggest-item:hover {
    background-color: $item-color-hover;
} 
.center-search-container .center-search__bar .header .clear:hover {
    color: $theme-color;
}
.center-search-container .center-search__bar .histories .history-item .history-text:hover {
    color: $theme-color;
}
.center-search-container .center-search__bar .history-fold:hover {
    color: $theme-color;
}
.center-search-container .center-search__bar .trending-item:hover {
    background-color: $item-color-hover;
}
.center-search-container .center-search__bar .histories .history-item {
    background-color: $background--;
}
.center-search-container .center-search__bar .histories .history-item .history-text {
    color: $text-color;
}
.center-search-container .center-search__bar .suggest-item  {
    color: $text-color;
}
.center-search-container .center-search__bar .trending-item .trendings-text {
    color: $text-color;
}
.center-search-container .center-search__bar .trending-item .trendings-rank .topThree {
    color: $upload-background;
}
</style>
  