<template>
    <!-- 固钉频道栏 -->
    <div class="home-channel-fixed"
    @mouseenter="isOpenChannelfixedDown = true"
    @mouseleave="isOpenChannelfixedDown = false"
    >
       <!-- 左边 -->
        <div class="channel-fixed-left">
            <div class="channel-fixed-icons">
                <NuxtLink to="" target="_blank" class="channel-fixed-icons__item">
                    <IconsHomechannelDongTai class="icon-dongtai"/>
                    <span class="icon-title">动态</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-fixed-icons__item">
                    <IconsHomechannelReMen class="icon-remen"/>
                    <span class="icon-title">热门</span>
                </NuxtLink>
            </div>
        </div>
        <el-divider direction="vertical" style="justify-content: center; color: #666666;"/>
        <!-- 右边 -->
        <div class="right-channel-fixed-container">
            <!-- 中间频道 -->
            <div class="channel-fixed-items" :class="isOpenChannelfixedDown ? 'channel-fixed-items__left-down' : 'channel-fixed-items__left'">
                <!-- 番剧 -->
                <NuxtLink to="" target="_blank" class="channel-fixed-link" :class="isOpenChannelfixedDown ? '' : 'channel-fixed-link-list'" v-for="(item, index) in channel.slice(0, ChannelEndNum1)" :key="index">
                    <span>{{item.title}}</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-fixed-link" :class="isOpenChannelfixedDown ? '' : 'channel-fixed-link-list'" v-for="(item, index) in channelfixed.slice(0, 3)" :key="index">
                    <span>{{item.title}}</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-fixed-link" :class="isOpenChannelfixedDown ? '' : 'channel-fixed-link-list'" v-for="(item, index) in channel.slice(ChannelEndNum1, ChannelEndNum2)" :key="index">
                    <span>{{item.title}}</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-fixed-link" :class="isOpenChannelfixedDown ? '' : 'channel-fixed-link-list'" v-for="(item, index) in channelfixed.slice(3, 6)" :key="index">
                    <span>{{item.title}}</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-fixed-link" :class="isOpenChannelfixedDown ? '' : 'channel-fixed-link-list'" v-for="(item, index) in channel.slice(ChannelEndNum2)" :key="index">
                    <span>{{item.title}}</span>
                </NuxtLink>
            </div>
            <div class="channel-fixed-right-icon">
                <el-icon size="10" class="xiajiantou" :style="[{transform:isOpenChannelfixedDown ? 'rotate(180deg)' : ''}]" style="transition:transform 0.3s linear;">
                    <ElIconArrowDownBold />
                </el-icon>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import channelJson from 'assets/json/channel.json';
import channelfixedJson from 'assets/json/channelfixed.json';
const isOpenChannelfixedDown = ref(false)
const channel = channelJson;
const channelfixed = channelfixedJson;
// 声明一个ref来存储浏览器宽度
const screenWidth = ref<number>(0);
const ChannelEndNum1 = ref<number>(0);
const ChannelEndNum2 = ref<number>(0);
// 监听窗口大小变化的处理函数
const handleResize = () => {
    screenWidth.value = window.innerWidth;
    if (screenWidth.value <= 1367) {
        ChannelEndNum1.value = 10;
        ChannelEndNum2.value = 20;
    } else if (1367 < screenWidth.value) {
        if (screenWidth.value  <= 2200){
            ChannelEndNum1.value = 11;
            ChannelEndNum2.value = 22;
        } else if (2200 < screenWidth.value) {
            ChannelEndNum1.value = 12;
            ChannelEndNum2.value = 24;
        }    
    } 
};
// 在组件挂载后开始监听
onMounted(() => {
  handleResize(); // 初始时获取一次宽度
  window.addEventListener('resize', handleResize);
});

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
<style scoped lang="scss">
.home-channel-fixed {
    box-sizing: border-box;
    position: fixed;
    max-width: calc(1980px + 2 * 60px);
    min-width: 1236px;
    width: 100%;
    top: 64px;
    z-index: 2;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,.1);
    animation-name: scale-up;
    transition: all .8s ease;
    overflow: hidden;
}

.home-channel-fixed:hover {
    height: calc-size(auto);
}

.channel-fixed-left {
    height: 100%;
    // width: 140px;
}

.channel-fixed-icons {
    position: absolute;
    height: 28px;
    // bottom: 0;
    top: 16px;
}

.channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item {
    display: inline;
    height: 28px;
    justify-content: center;
    margin: 0 4px;
    color: $text-color;
    fill: $text-color;
    cursor: pointer;
    text-decoration: none;
}

.channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item:hover {
    color: $theme-color;
    fill: $theme-color;
}

.channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item span {
    font-size: 14px;
}

.channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item .icon-dongtai,
.channel-fixed-icons .channel-fixed-icons__item .icon-remen {
    width: 22px;
    height: 22px;
    margin-right: 4px;
    vertical-align: -5px;
}

.right-channel-fixed-container {
    width: 100%;
    display: block;
    justify-content: space-between;
    right: 0;
    padding: 0 4px;
}

.channel-fixed-items {
    position: relative;
    display: grid;     /* 网格布局 */
    width: 100%;  
    grid-column: span 4;    /* 元素应该跨越4个网格列 */
    grid-gap: 10px;     /* 子元素之间的间隔 */
    scroll-behavior: smooth;
    transition: grid-template-rows 0.5s ease;
}

.channel-fixed-link {
    display: inline-block;
    box-sizing: content-box;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f4f6;
    border-radius: 6px;
    background-color: #f6f7f8;
    color: $text-color;
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    transition: background-color .3s, color .3s;
    cursor: pointer;

    &:hover {
        background-color: $background--hover;
    }
}

.channel-fixed-right-icon {
    position: absolute;
}

.channel-fixed-right-icon .xiajiantou {
    color: #000000;
}

@media (max-width: 1099.9px) {
    .home-channel-fixed {
        padding: 12px 50px;
    }

    .channel-fixed-left {
        width: 140px;
    }

    .channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item {
        margin: 0 4px;
    }

    .channel-fixed-items__left {
        grid-template-columns: repeat(13,1fr);      /* 有13列，每行的高度是 1fr，表示等分可用高度 */
    }

    .channel-fixed-link {
        height: 22px;
        line-height: 22px;
    }

    .channel-fixed-link-list:nth-of-type(1n + 14) {
        display: none !important;    /* 第14个元素及之后的隐藏 */
    }

    .channel-fixed-right-icon {
        right: 25px;
        top: 14px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .home-channel-fixed {
        padding: 12px 50px;
    }

    .channel-fixed-left {
        width: 140px;
    }

    .channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item {
        margin: 0 4px;
    }

    .channel-fixed-items__left {
        grid-template-columns: repeat(13,1fr);      /* 有14列，每行的高度是 1fr，表示等分可用高度 */
    }

    .channel-fixed-link {
        height: 28px;
        line-height: 28px;
    }

    .channel-fixed-link-list:nth-of-type(1n + 14) {
        display: none !important;    /* 第15个元素及之后的隐藏 */
    }

    .channel-fixed-right-icon {
        right: 25px;
        top: 14px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .home-channel-fixed {
        padding: 14px 60px;
    }

    .channel-fixed-left {
        width: 150px;
    }

    .channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item {
        margin: 0 8px;
    }

    .channel-fixed-items__left {
        grid-template-columns: repeat(14,1fr);      /* 有14列，每行的宽度是 1fr，表示等分可用宽度 */
    }

    .channel-fixed-link {
        height: 28px;
        line-height: 28px;
    }

    .channel-fixed-link-list:nth-of-type(1n + 15) {
        display: none !important;    /* 第15个元素及之后的隐藏 */
    }

    .channel-fixed-right-icon {
        right: 30px;
        top: 16px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .home-channel-fixed {
        padding: 14px 60px;
    }

    .channel-fixed-left {
        width: 150px;
    }

    .channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item {
        margin: 0 8px;
    }

    .channel-fixed-items__left {
        grid-template-columns: repeat(14,1fr);      /* 有14列，每行的宽度是 1fr，表示等分可用宽度 */
    }

    .channel-fixed-link {
        height: 28px;
        line-height: 28px;
    }

    .channel-fixed-link-list:nth-of-type(1n + 15) {
        display: none !important;    /* 第15个元素及之后的隐藏 */
    }

    .channel-fixed-right-icon {
        right: 30px;
        top: 16px;
    }
}

@media (min-width: 2200px) {
    .home-channel-fixed {
        padding: 16px 70px;
    }

    .channel-fixed-left {
        width: 150px;
    }

    .channel-fixed-left .channel-fixed-icons .channel-fixed-icons__item {
        margin: 0 8px;
    }
    
    .channel-fixed-items__left {
        grid-template-columns: repeat(15,1fr);      /* 有15列，每行的宽度是 1fr，表示等分可用宽度 */
    }

    .channel-fixed-link {
        height: 30px;
        line-height: 30px;
    }

    .channel-fixed-link-list:nth-of-type(1n + 16) {
        display: none !important;    /* 第15个元素及之后的隐藏 */
    }

    .channel-fixed-right-icon {
        right: 35px;
        top: 18px;
    }
}
    /* 频道打开后*/
@media (max-width: 1099.9px) {
    .channel-fixed-items__left-down {
        grid-template-columns: repeat(13,1fr);      /* 有13列，每行的宽度是 1fr，表示等分可用宽度 */
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-fixed-items__left-down {
        grid-template-columns: repeat(13,1fr);      /* 有14列，每行的宽度是 1fr，表示等分可用宽度 */
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-fixed-items__left-down {
        grid-template-columns: repeat(14,1fr);      /* 有14列，每行的宽度是 1fr，表示等分可用宽度 */
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-fixed-items__left-down {
        grid-template-columns: repeat(14,1fr);      /* 有14列，每行的宽度是 1fr，表示等分可用宽度 */
    }
}

@media (min-width: 2200px) {
    .channel-fixed-items__left-down {
        grid-template-columns: repeat(15,1fr);      /* 有15列，每行的宽度是 1fr，表示等分可用宽度 */
    }

}

</style>