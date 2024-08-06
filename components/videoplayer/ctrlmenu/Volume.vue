<template>
    <div class="player-ctrl-volume-box" 
    ref="volumeBoxRef"
    @mouseover="startListeningToWheel" 
    @mouseout="stopListeningToWheel" 
    @wheel.prevent="handleVolumeChangeWithWheel">
        <div class="player-ctrl-volume-number">{{ Math.round(props.volume * 100) }}</div>
        <div class="player-ctrl-volume-progress">
            <div class="volume-progress-slider"  ref="volumeSlider">
                <div class="bui-bar-wrap">
                    <div class="bui-bar"  :style="{ height: `${props.volume * 100}%` }"></div>
                </div>
                <div class="bui-thumb">
                    <div class="bui-thumb-dot" :style="{ bottom: `calc(${props.volume * 100}% - 6px)` }"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const volumeSlider = ref<HTMLDivElement | null>(null);
const volumeBoxRef = ref<HTMLDivElement | null>(null);
const isDragging = ref(false);
const emit = defineEmits(['updateVolume']);
const props = defineProps ({
    volume: {
        type: Number,
        default: 0
    }
})
// 初始化拖动
const initDrag = () => {
    let offsetY, currPer;
    if (!volumeSlider.value) { return;}
    // 鼠标按下事件处理程序
    volumeSlider.value.addEventListener("mousedown", (e) => {
        if (!volumeSlider.value) return;
        isDragging.value = true;
        offsetY = volumeSlider.value.getBoundingClientRect().bottom - e.clientY; // 鼠标点击点相对进度条底部偏移量
        currPer = offsetY / volumeSlider.value.getBoundingClientRect().height; // 计算进度比例
        // 边界值判定
        currPer = Math.max(0, currPer);
        currPer = Math.min(1, currPer);
        // Math.round(currPer * 100);
        emit('updateVolume', currPer);
    });

    // 鼠标移动事件处理程序
    document.addEventListener("mousemove", (e) => {
        if (!isDragging.value) return;
        if (!volumeSlider.value) return;
        offsetY = volumeSlider.value.getBoundingClientRect().bottom - e.clientY; // 鼠标相对进度条底部偏移量
        currPer = offsetY / volumeSlider.value.getBoundingClientRect().height; // 计算进度比例
        // 边界值判定
        currPer = Math.max(0, currPer);
        currPer = Math.min(1, currPer);
        // Math.round(currPer * 100);
        emit('updateVolume', currPer);
    });


    // 鼠标释放事件处理程序
    document.addEventListener("mouseup", () => {
        isDragging.value = false;
    });

    // 移动端 释放事件处理程序
    document.addEventListener("touchend", () => {
        isDragging.value = false;
    });
};
const startListeningToWheel = () => {
  if (volumeBoxRef.value) {
    volumeBoxRef.value.addEventListener('wheel', handleVolumeChangeWithWheel, { passive: false });
  }
};

const stopListeningToWheel = () => {
  if (volumeBoxRef.value) {
    volumeBoxRef.value.removeEventListener('wheel', handleVolumeChangeWithWheel);
  }
};
const handleVolumeChangeWithWheel = (event: WheelEvent) => {
  // 滚轮事件处理
  if (event.deltaY < 0) {
    // 向上滚动，增加音量
    emit('updateVolume', Math.min(1, Math.max(0, props.volume + 0.01)));
  } else if (event.deltaY > 0) {
    // 向下滚动，减少音量
    emit('updateVolume', Math.min(1, Math.max(0, props.volume - 0.01)));
  }
};
onMounted(() =>{
    // 初始化音量条拖动
    initDrag();
});
onUnmounted(() => {
    // 移除事件监听
    volumeSlider.value?.removeEventListener("mousedown", () => {});
    document.removeEventListener("mousemove", () => {});
    document.removeEventListener("mouseup", () => {});
    document.removeEventListener("touchend", () => {});
    // 移除滚轮事件监听，防止内存泄漏
    if (volumeBoxRef.value) {
        volumeBoxRef.value.removeEventListener('wheel', handleVolumeChangeWithWheel);
    }
});
</script>
<style scoped lang="scss">
.player-ctrl-volume-box {
    height: 120px;
    width: 38px;
    background: hsla(0, 0%, 8%, .9);
    border-radius: 2px;
    .player-ctrl-volume-number {
        color: #FFFFFF;
        font-size: 13px;
        height: 32px;
        line-height: 28px;
        margin-bottom: 2px;
        text-align: center;
        width: 100%;
    }
    .player-ctrl-volume-progress {
        height: 70px;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        .volume-progress-slider {
            height: 100%;
            width: 2px;
            position: relative;
            .bui-bar-wrap {
                position: absolute;
                width: 100%;
                bottom: 0;
                height: 100%;
                background: #FFFFFF;
                border-radius: 2px;
                .bui-bar {
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    background: $theme-color;
                }
            }
            .bui-thumb {
                position: absolute;
                width: 100%;
                bottom: 0;
                height: 100%;
                cursor: pointer;
                .bui-thumb-dot {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: $theme-color;
                    border-radius: 50%;
                    left: -5px;
                    cursor: pointer;
                    //transform: translateX(-42%);
                }
            }
        }
    }
}
</style>