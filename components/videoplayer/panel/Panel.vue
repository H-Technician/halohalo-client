<template>
    <div @mouseleave="hide" class="player-ctrl-menu-panel_wrap">
        <div @mousemove="show" class="player-ctrl-menu-panel-area">
            <slot name="reference"></slot>
        </div>
        <div class="player-ctrl-menu-panel" :style="props.panelStyle">
            <div
                class="player-ctrl-menu-panel-box"
                :class="isPanelShow ? 'panelShow' : 'panelHide'"
                :style="{ display: panelDisplay }"
            >
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
let inTimer: string | number | NodeJS.Timeout | undefined;  // 节流计时器
// 气泡框的显隐
const panelDisplay = ref("none");
const isPanelShow = ref(false);
//定义popover显示回调
const emit = defineEmits(['isShowPanel']);

// let outTimer;
const props = defineProps({
    // panel样式
    panelStyle: {
        type: String,
        default() {
            return"";
        }
    }
})

const show = () => {
    clearTimeout(inTimer);
    inTimer = setTimeout(() => {
        panelDisplay.value = "block";
        isPanelShow.value = true;
        emit('isShowPanel', true);
    }, 100);
}
const hide = () => {
    clearTimeout(inTimer);
    inTimer = setTimeout(() => {
        isPanelShow.value = false;
        panelDisplay.value = "none";
        emit('isShowPanel', false);
    }, 100);
}

</script>

<style scoped lang="scss">
.player-ctrl-menu-panel_wrap {
    position: relative;
    .player-ctrl-menu-panel-area {
        position: relative;
    }
    .player-ctrl-menu-panel {
        position: absolute;
        transition: .3s;
        z-index: 100;
        bottom: 100%;
        left: 50%;
        transform: translate3d(-50%, 0, 0);   /* 水平左移半个元素身位，使其水平与父元素居中 */
        .player-ctrl-menu-panel-box {
            border-radius: 2px;
            transform: translateZ(2px);
        }
        .panelHide {
            animation: fade-out 0.6s ease-out forwards;
            transform-origin: bottom;
        }

        .panelShow {
            animation: fade-in 0.6s ease-out forwards;
            transform-origin: bottom;
        }
    }
}

/* 淡入动画 */
@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateZ(-2px);
    }
    100% {
        opacity: 1;
        transform: translateZ(0);
    }
}

/* 淡出动画 */
@keyframes fade-out {
    0% {
        opacity: 1;
        transform: translateZ(0);
    }
    100% {
        opacity: 0;
        transform: translateZ(-2px);
    }
}
</style>