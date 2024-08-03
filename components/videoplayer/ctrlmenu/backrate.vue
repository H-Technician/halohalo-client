<template>
    <div class="player-ctrl-playbackrate-menu_warp">
        <ul class="player-ctrl-playbackrate-menu">
            <li class="player-ctrl-playbackrate-menu-item" 
            v-for="(item, index) in playbackrateList"
            @click="selectedBackrate(index)"
            :class="isSelectedBackrate === item.index ?'player-ctrl-playbackrate-menu-item-selected': ''">
            {{ item.value }}
            </li>
        </ul>
        
    </div>
</template>
<script setup lang="ts">
const isSelectedBackrate = ref<number>(3); // 默认选中的播放速度
// 播放速度列表
interface Playbackrate {
    index: number;
    value: string;
    backrate: number;
}
const emit = defineEmits(['selectedBackrate']);
// 播放速度列表
const playbackrateList = ref<Playbackrate[]>([
    {
        index: 0,
        value: '2.0X',
        backrate: 2.0
    },
    {
        index: 1,
        value: '1.5X',
        backrate: 1.5
    },
    {
        index: 2,
        value: '1.25X',
        backrate: 1.25
    },
    {
        index: 3,
        value: '1.0X',
        backrate: 1.0
    },
    {
        index: 4,
        value: '0.75X',
        backrate: 0.75
    },
    {
        index: 5,
        value: '0.5X',
        backrate: 0.5
    }
])
const selectedBackrate = (index: number) => {
    isSelectedBackrate.value = index;
    emit('selectedBackrate', playbackrateList.value[index].backrate);
}
</script>
<style scoped lang="scss">
.player-ctrl-playbackrate-menu_warp {
    height: auto;
    width: 70px;
    background: hsla(0, 0%, 8%, .9);
    border-radius: 2px;
    .player-ctrl-playbackrate-menu {
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        list-style: none;
        .player-ctrl-playbackrate-menu-item {
            cursor: pointer;
            height: 36px;
            line-height: 36px;
            text-align: center;
            width: 100%;
            color: #ffffff;
            font-size: 13px;
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .player-ctrl-playbackrate-menu-item-selected {
            color: $theme-color;
        }
    }
  
}
</style>