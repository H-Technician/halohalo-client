<template>
    <div class="player-ctrl-quality-menu_wrap">
        <ul class="player-ctrl-quality-menu">
            <li class="player-ctrl-quality-menu-item" 
            v-for="(item, index) in playQualityList"
            @click="selectedBackrate(index)"
            :class="isSelectedQuality === item.index ?'player-ctrl-quality-menu-item-selected': ''">
            {{ item.value }}
            </li>
        </ul>
        
    </div>
</template>
<script setup lang="ts">
const isSelectedQuality = ref<number>(1); // 默认选中的播放速度
// 播放速度列表
interface Playbackrate {
    index: number;
    value: string;
    quality: number;
}
// 播放速度列表
const playQualityList = ref<Playbackrate[]>([
    {
        index: 0,
        value: '4K 超清',
        quality: 2.0
    },
    {
        index: 1,
        value: '1080P 60帧',
        quality: 1.5
    },
    {
        index: 2,
        value: '1080P 高清',
        quality: 1.25
    },
    {
        index: 3,
        value: '720P 高清',
        quality: 1.0
    },
    {
        index: 4,
        value: '480P 清晰',
        quality: 0.75
    },
    {
        index: 5,
        value: '360P 流畅',
        quality: 0.5
    },
    {
        index: 6,
        value: '自动',
        quality: 0.5
    }
])
const selectedBackrate = (index: number) => {
    isSelectedQuality.value = index;
}
</script>
<style scoped lang="scss">
.player-ctrl-quality-menu_wrap {
    height: auto;
    max-height: 580px;
    width: auto;
    background: hsla(0, 0%, 8%, .9);
    border-radius: 2px;
    .player-ctrl-quality-menu {
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        list-style: none;
        .player-ctrl-quality-menu-item {
            box-sizing: border-box;
            cursor: pointer;
            height: 36px;
            line-height: 36px;
            text-align: flex-start;
            width: 145px;
            color: #ffffff;
            font-size: 13px;
            padding-left: 20px;
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .player-ctrl-quality-menu-item-selected {
            color: $theme-color;
        }
    }
  
}
</style>