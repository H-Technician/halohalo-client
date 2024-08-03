<template>
    <div class="home-channel">
        <!-- 左边 -->
        <div class="channel-icons">
            <NuxtLink to="" target="_blank" class="channel-icons__item">
                <div class="icon-bg icon-bg__dynamic">
                    <picture class="v-img icon-bg--up" v-if="false">
                        <img src="~/assets/img/header.jpg" alt="">
                    </picture>
                    <IconsHomechannelDongTai class="iconfont icon-dongtai" v-else/>
                </div>
                <span class="icon-title">动态</span>
            </NuxtLink>
            <NuxtLink to="" target="_blank" class="channel-icons__item">
                <div class="icon-bg icon-bg__popular">
                    <IconsHomechannelReMen class="iconfont icon-remen"/>
                </div>
                <span class="icon-title">热门</span>
            </NuxtLink>
        </div>
        <!-- 右边 -->
        <div class="right-channel-container">
            <!-- 中间频道 -->
            <div class="channel-items__left">
                <NuxtLink to="" target="_blank" class="channel-popover-list" v-for="item in channel">
                    <Popover :popStyle="item.id < 10 ? 'padding-bottom: 4px;' : '' || item.id > 14 ? 'padding-top: 4px;' : '' || 10 <= item.id && item.id < channelitem ? 'padding-bottom: 4px;':'' || channelitem <= item.id && item.id < 15 ? 'padding-top: 4px;':''" :placement="item.id < 10 ? 'top' : '' || item.id > 14 ? 'bottom' : '' || 10 <= item.id && item.id < channelitem ? 'top' :'' || channelitem <= item.id && item.id < 15 ? 'bottom' :''">
                        <template #reference>
                            <div class="channel-link">
                                <span>{{item.title}}</span>
                            </div>
                        </template>
                        <template #content v-if="item.isdown">
                            <object>
                                <div class="channel-popover">
                                    <a href="" target="_blank" class="channel-popover-item" v-for="index in item.downlist">
                                        <span>{{index.title}}</span>
                                    </a>
                                </div>
                            </object>
                        </template>
                    </Popover>
                </NuxtLink>
                <Popover popStyle="padding-top: 4px; left: 0;" @isShowPopover="isShowdown">
                    <template #reference>
                        <div class="channel-link-fixed">
                            <span>展开</span>
                            <el-icon class="channel-link-fixed-icon" :style="[{transform:isXiaJiantou ? 'rotate(180deg)' : ''}]" style="transition:transform 0.2s linear;">
                                <ElIconArrowDownBold />
                            </el-icon>
                        </div>
                    </template>
                    <template #content>
                        <div class="channel-fixed-popover">
                            <NuxtLink to="" target="_blank" class="channel-fixed-popover-item" v-for="item in channel.slice(isChannelDownNum)">
                                <span>{{item.title}}</span>
                            </NuxtLink>
                        </div>
                    </template>
                </Popover>
            </div>
            <!-- 右边 -->
            <div class="channel-items__right">
                <NuxtLink to="" target="_blank" class="channel-link__right">
                    <IconsHomechannelZhuanLan class="channel-iconfont"/>
                    <span>专栏</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-link__right">
                    <IconsHomechannelZhiBo class="channel-iconfont"/>
                    <span>直播</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-link__right">
                    <IconsHomechannelHuoDong class="channel-iconfont"/>
                    <span>活动</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-link__right">
                    <IconsHomechannelKeTang class="channel-iconfont"/>
                    <span>课堂</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-link__right">
                    <IconsHomechannelSheQu class="channel-iconfont"/>
                    <span>社区中心</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="channel-link__right">
                    <IconsHomechannelXinGe class="channel-iconfont"/>
                    <span>新歌热榜</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import channelJson from 'assets/json/channel.json';
const channel = channelJson;
const channelitem = ref<number>(0);
// 声明一个ref来存储浏览器宽度
const screenWidth = ref<number>(0);
const isChannelDownNum = ref<number>(0);
// 监听窗口大小变化的处理函数
const handleResize = () => {
    screenWidth.value = window.innerWidth;
    if (screenWidth.value <= 1367) {
        channelitem.value = 10;
        isChannelDownNum.value = 17;
    } else if (1367 < screenWidth.value) {
        if (screenWidth.value  <= 1701){
            channelitem.value = 12;
            isChannelDownNum.value = 21;
        } else if (1701 < screenWidth.value) {
            if (screenWidth.value  <= 2200) {
                channelitem.value = 24;
                isChannelDownNum.value = 23;
            }else if (2200 < screenWidth.value) {
                channelitem.value = 15;
                isChannelDownNum.value = 27;
            }
        }    
    } 
};
const isXiaJiantou = ref<boolean>(false);
const isShowdown= (isShowdown: boolean) => {
    // console.log(msg.value)
    if (isShowdown) {
        isXiaJiantou.value = true;
    } else {
        isXiaJiantou.value = false;
    }
}
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
.home-channel {
    box-sizing: border-box;
    position: relative;
    max-width: calc(1980px + 2 * 60px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: #ffffff;
}

@media (max-width: 1366.9px) {
    .home-channel {
        height: 100px;
    }
    .home-channel {
        padding: 0 50px;
    }

}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .home-channel {
        height: 110px;
    }
    .home-channel {
        padding: 0 60px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .home-channel {
        height: 120px;
    }
    .home-channel {
        padding: 0 60px;
    }
}

@media (min-width: 2200px) {
    .home-channel {
        height: 130px;
    }
    .home-channel {
        padding: 0 70px;
    }
}

.channel-icons {
    z-index: 0;
    display: flex;
    align-items: center;
}

@media (max-width: 1366.9px) {
    .channel-icons {
        margin-right: 4px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-icons {
        margin-right: 8px;
    }
}

@media (min-width: 1701px) {
    .channel-icons {
        margin-right: 20px;
    }
}

.channel-icons__item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    color: $text-color;
    cursor: pointer;
    text-decoration: none;
}

@media (max-width: 1099.9px) {
    .channel-icons__item {
        margin-right: 10px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-icons__item {
        margin-right: 16px;
    }
}

@media (min-width: 1367px) and (max-width: 2199.9px) {
    .channel-icons__item {
        margin-right: 24px;
    }
}

@media (min-width: 2200px) {
    .channel-icons__item {
        margin-right: 32px;
    }
}

.icon-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    border-radius: 50%;
    transition: background-color .3s;
    color: #fff;
}

@media (min-width: 1367px) {
    .icon-bg {
        width: 46px;
        height: 46px;
    }
}

@media (max-width: 1366.9px) {
    .icon-bg {
        width: 40px;
        height: 40px;
    }
}

.icon-bg__dynamic {
    background: #48cc69;
}

.icon-bg__dynamic:hover {
    background: #6eda89;
}

.v-img {
    position: relative;
    display: inline-block;
    line-height: 1;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background-color: #bcbdbf;
}

.icon-bg--up {
    overflow: hidden;
    border-radius: 50%;
}

.icon-bg--up>img {
    border-radius: 50%;
}

.v-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
}

.icon-title {
    text-align: center;
    font-size: 13px;
    line-height: 18px;
}

@media (min-width: 1367px) and (max-width: 2199.9px) {
    .icon-title {
        font-size: 14px;
        line-height: 20px;
    }
}

@media (min-width: 2200px) {
    .icon-title {
        font-size: 15px;
        line-height: 20px;
    }
}

.icon-bg__popular {
    background: #f07775;
}

.icon-bg__popular:hover {
    background: #eb908f;
}

.icon-bg .iconfont {
    width: 25px;
    height: 25px;
    font-size: 24px;
    line-height: 25px;
    margin-left: 2px;
}
.icon-bg .icon-dongtai, .icon-bg .icon-remen{
    color: #ffffff;
    fill: #ffffff;
}
.right-channel-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    right: 0;
}

.channel-items__left {
    position: relative;
    display: grid;     /* 网格布局 */
    width: 100%;
    grid-auto-flow: row;     
    grid-column: span 4;    /* 元素应该跨越4个网格列 */
    grid-gap: 10px;     /* 子元素之间的间隔 */
    grid-template-rows: repeat(2,1fr);      /* 有两行，每行的高度是 1fr，表示等分可用高度 */
    border-right: 1px solid #bcbdbf;

    a {
        text-decoration: none;
    }
}

.channel-items__left .channel-popover {
    padding: 10px 15px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 20px;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(1, 1fr));
    height: 110px;
    width: auto;
}

.channel-items__left .channel-popover .channel-popover-item {
    height: 20px;
    line-height: 20px;
    width: auto;
    color: $text-color;
    padding: 4px 6px;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        border-radius: 4px;
        background-color: $background--hover;
    }

}
.channel-items__left .channel-popover .channel-popover-item span {
    display: inline-block;
    white-space: nowrap;
    line-height: 20px;
    font-size: 12px;
}

.channel-items__left .channel-fixed-popover {
    padding: 10px 15px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 20px;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(1, 1fr));
    height: 110px;
    width: auto;
}

.channel-items__left .channel-fixed-popover .channel-fixed-popover-item {
    height: 20px;
    line-height: 20px;
    width: auto;
    color: $text-color;
    padding: 4px 6px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        border-radius: 4px;
        background-color: $background--hover;
    }

}
.channel-items__left .channel-fixed-popover .channel-fixed-popover-item span {
    display: inline-block;
    white-space: nowrap;
    line-height: 20px;
    font-size: 12px;
}

@media (max-width: 1366.9px) {
    .channel-items__left {
        padding-right: 20px;
        grid-template-columns: repeat(9,1fr);
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(11,1fr);
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(12,1fr);
    }
}

@media (min-width: 2200px) {
    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(14,1fr);
    }
}

.channel-link {
    display: inline-block;
    box-sizing: content-box;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f4f6;
    border-radius: 6px;
    background-color: #f6f7f8;
    color: $text-color;
    text-align: center;
    font-weight: 400;
    transition: background-color .3s, color .3s;
    cursor: pointer;
}

.channel-link:hover {
    background-color: $background--hover;
}

.channel-link-fixed {
    grid-row: 2;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f4f6;
    border-radius: 6px;
    background-color: #f6f7f8;
    color: $text-color;
    fill: $text-color;
    text-align: center;
    font-weight: 400;
    transition: background-color .3s, color .3s;
    cursor: pointer;

    .channel-link-fixed-icon {
        width: 10px;
        height: 10px;
        margin-left: 4px;
        vertical-align: -4px;
    }
}

.channel-link-fixed:hover {
    background-color: $background--hover;
}

@media (max-width: 1099.9px) {
    .channel-link {
        font-size: 13px;
        height: 22px;
        line-height: 22px;
    }
    .channel-popover-list:nth-of-type(1n + 18) {
        display: none !important;    /* 第18个元素及之后的隐藏 */
    }
    .channel-link-fixed {
        font-size: 13px;
        height: 22px;
        line-height: 22px;
        grid-column: 9;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-link {
        font-size: 13px;
        height: 26px;
        line-height: 26px;
    }
    .channel-popover-list:nth-of-type(1n + 18) {
        display: none !important;    /* 第18个元素及之后的隐藏 */
    }
    .channel-link-fixed {
        font-size: 13px;
        height: 26px;
        line-height: 26px;
        grid-column: 9;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-link {
        font-size: 14px;
        height: 26px;
        line-height: 26px;
    }
    .channel-popover-list:nth-of-type(1n + 22) {
        display: none !important;    /* 第22个元素及之后的隐藏 */
    }
    .channel-link-fixed {
        font-size: 14px;
        height: 26px;
        line-height: 26px;
        grid-column: 11;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-link {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
    }
    .channel-popover-list:nth-of-type(1n + 24) {
        display: none !important;    /* 第24个元素及之后的隐藏 */
    }
    .channel-link-fixed {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        grid-column: 12;
    }
}

@media (min-width: 2200px) {
    .channel-link {
        font-size: 15px;
        height: 30px;
        line-height: 30px;
    }

    .channel-popover-list:nth-of-type(1n + 28) {
        display: none !important;    /* 第28个元素及之后的隐藏 */
    }
    .channel-link-fixed {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        grid-column: 14;
    }
}

.channel-items__right {
    grid-column: span 1;
    grid-row-gap: 10px;
    grid-auto-flow: column;
    display: grid;
    grid-template-rows: repeat(2,1fr);
    flex-shrink: 0;
}

@media (max-width: 1099.9px) {
    .channel-items__right {
        width: 210px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-items__right {
        width: 230px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-items__right {
        width: 240px;
    }
}

@media (min-width: 1701px) {
    .channel-items__right {
        width: 258px;
    }
}

.channel-link__right {
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-decoration: none;
    width: 100%;
    height: 100%;
    color: $text-color;
    fill: $text-color;
    text-align: center;
    font-weight: 400;
    transition: color .3s;
    cursor: pointer;
}

.channel-link__right:hover {
    color: $theme-color;
    fill: $theme-color;
}

@media (max-width: 1366.9px) {
    .channel-link__right {
        font-size: 13px;
        height: 28px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-link__right {
        font-size: 14px;
        height: 28px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-link__right {
        font-size: 14px;
        height: 32px;
    }
}

@media (min-width: 2200px) {
    .channel-link__right {
        font-size: 15px;
        height: 32px;
    }
}
</style>