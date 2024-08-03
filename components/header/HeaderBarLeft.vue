<template>
    <div class="header-bar-left">
        <a href="/" target="_self" class="entry-logo" :style="props.OPenHeaderLeft ? '' : 'display: none'">
            <picture class="logo">
                <img src="~assets/img/headerlogo.png" alt="">
            </picture>
        </a>
        <Popover @isShowPopover="isOpenxiajiantou" popStyle="padding-top: 4px; margin-left: 260%;" 
        :style="props.OPenHeaderLeft ? '' : 'display: none'">
            <template #reference>
                <a href="/" target="_self" class="title-entry" :style="props.OPenHeaderLeft ? '' : 'display: none'">
                    <span>首页</span>
                    <el-icon class="icon-xiajiantou" :size="10" 
                    :style="[{transform:isOpentitleMenu ? 'rotate(180deg)' : ''}]" 
                    style="transition:transform 0.2s linear;">
                        <ElIconArrowDownBold />
                    </el-icon>
                </a>
            </template>
            <template #content>
                <HeadercardTitleCard />
            </template>
        </Popover>
        <a href="/" target="_self" class="home-title-entry" :style="props.OPenHeaderLeft ? 'display: none' : ''">
            <IconsHeaderbarTitleLogo class="home-title-icon"/>
            <span>首页</span>
        </a>
        <NuxtLink to="/" target="_blank" class="default-entry" 
        :class="props.OPenHeaderLeft ? 'default-entry-slide-down-color' : 'default-entry-color'">
            <span>番剧</span>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="default-entry" 
        :class="props.OPenHeaderLeft ? 'default-entry-slide-down-color' : 'default-entry-color'">
            <span>漫画</span>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="default-entry" 
        :class="props.OPenHeaderLeft ? 'default-entry-slide-down-color' : 'default-entry-color'">
            <span>直播</span>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="default-entry" 
        :class="props.OPenHeaderLeft ? 'default-entry-slide-down-color' : 'default-entry-color'">
            <span>游戏中心</span>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="default-entry" 
        :class="props.OPenHeaderLeft ? 'default-entry-slide-down-color' : 'default-entry-color'">
            <span>会员购</span>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="default-entry" 
        :class="props.OPenHeaderLeft ? 'default-entry-slide-down-color' : 'default-entry-color'">
            <span>漫画</span>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="default-entry" 
        :class="props.OPenHeaderLeft ? 'default-entry-slide-down-color' : 'default-entry-color'">
            <span>赛事</span>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="default-entry-right">
            <HeaderScroll :iscolor="isScroll"/>
        </NuxtLink>
        <NuxtLink to="/" target="_blank" class="download-entry" 
        :class="[props.OPenHeaderLeft ? 'download-entry-slide-down-color' : 'download-entry-color', props.isShowCenter ? 'download-entry-show' : '']">
            <IconsHeaderbarDownLoad class='download-icon'/>
            <span>下载客户端</span>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
const isScroll = ref(false)
const props = defineProps({
    OPenHeaderLeft: {
        type: Boolean
    },
    isShowCenter: {
        type: Boolean,
        default: () => {
            return true;
        }
    }
})
const isOpentitleMenu = ref(false);
const isOpenxiajiantou = (isOpenxiajiantou: boolean) => {
    if (isOpenxiajiantou) {
        isOpentitleMenu.value = true;
    } else {
        isOpentitleMenu.value = false;
    }
}
watchEffect(() => {
  isScroll.value = props.OPenHeaderLeft;
});
</script>
<style scoped>
.header-bar-left {
    display: flex;
    align-items: center;
    flex-shrink: 0;     /*容器空间不足时不缩小，即固定大小*/
    margin-right: 20px;
    border: 0;
    font-family: inherit;
    font-size: 100%;
    font-weight: 400;
    font-style: normal;
    line-height: 1.25;
}

.logo {
    height: 60%;
    width: auto;
    display: flex;
    align-items: center;
    margin-right: 6px;
    margin-left: 8px;
    cursor: pointer;
}

.logo img {
    height: 100%;
}

.entry-logo {
    display: flex;
    text-decoration: none;
    align-items: center;
    height: 64px;
    transition: transform .3s;
    transform: rotate(0);
    font-weight: 600;
}

.home-title-entry {
    height: 64px;
    line-height: 64px;
    text-decoration: none;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    margin-right: 15px;
    margin-left: 15px;
}

.entry-logo {
    display: flex;
    align-items: center;
    height: 64px;
    transition: transform .3s;
    transform: rotate(0);
    font-weight: 600;
    margin-left: 8px;
}

.logo {
    height: 60%;
    width: auto;
    display: flex;
    align-items: center;
    margin-right: 6px;
    margin-left: 10px;
    cursor: pointer;
}

.logo img {
    height: 100%;
}
.title-entry {
    height: 64px;
    line-height: 64px;
    text-decoration: none;
    color: #000000;
    font-size: 14px;
    cursor: pointer;
    margin-right: 15px;
    margin-left: 15px;
}

.title-entry .icon-xiajiantou {
    margin-left: 5px;
    position: relative;
}

.home-title-entry .home-title-icon {
    width: 18px;
    height: 18px;
    line-height: 64px;
    vertical-align: -5%;
    fill: #ffffff;
    color: #ffffff;
    margin-left: 8px;
    margin-right: 6px;
}

.default-entry span {
    display: inline-block;
    position: relative;
}

.download-entry span {
    margin-left: 4px;
    display: inline-block;
    position: relative;
}

.default-entry,
.download-entry {
    height: 64px;
    line-height: 64px;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    margin-right: 15px;
}
.default-entry-color, .download-entry-color {
    color: #ffffff;
    fill: #ffffff;
}
.default-entry-slide-down-color, .download-entry-slide-down-color {
    color: #000000;
    fill: #000000;
}
.download-entry .download-icon {
    width: 16px;
    height: 16px;
    line-height: 64px;
    vertical-align: -4%;
}

.default-entry-right {
    height: 64px;
    display: flex;
    /* line-height: 64px; */
    cursor: pointer;
    margin-right: 15px;
    align-items: center;
}

/* 跳动效果 */
@keyframes jump {
  0%, 100% {
    transform: translateY(0); /* 起始和结束状态，图标回到原位 */
  }
  50% {
    transform: translateY(-5px); /* 中间状态，图标向上跳动 20px */
  }
}

.default-entry:hover span {
    animation: jump 0.3s; /* 应用跳动动画效果 */
}
@media (max-width: 1366.9px) {
  .download-entry-show  {
        display: none;
    }
}
</style>
  