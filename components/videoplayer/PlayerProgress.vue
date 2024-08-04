<template>
    <div class="player-progress-area">
        <div class="player-progress-wrap" 
        @mouseenter="handleMouseEnter" 
        @mouseleave="handleMouseLeave" 
        ref="progress" 
        @mousemove="onMouseMove">
            <div class="player-progress" :class="isActive ? 'state-active' : ''">
                <div class="player-progress-move-indicator" 
                :class="isActive ? 'is_active' : ''"
                :style="`left: calc(${distanceToLeft}px - 4px)`">
                    <div class="player-progress-move-indicator-down">
                        <el-icon size="10" color="#00aeec"><ElIconCaretBottom /></el-icon>
                    </div>
                    <div class="player-progress-move-indicator-up">
                        <el-icon size="10" color="#00aeec"><ElIconCaretTop /></el-icon>
                    </div>
                </div>
                <div class="player-progress-schedule-wrap">
                    <div class="player-progress-schedule">
                        <div class="player-progress-schedule-buffer player-progress-schedule-centent" :style="`transform: scaleX(${bufferPer});`"></div>
                        <div class="player-progress-schedule-current player-progress-schedule-centent" :style="`transform: scaleX(${currentPer});`"></div>
                    </div>
                    <div class="player-progress-schedule-dot" :style="`left: calc(${currentPerDot}% - 8px)`" v-show="isShowDot" :class="isActive ? 'show' : 'hide'">
                        <IconsPlayProgressDot class="icon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const progress = ref<HTMLDivElement | null>(null);
const isActive = ref(false);
const isDragging = ref(false);
const currentPer = ref(0.00001);
const bufferPer = ref(0.00001);
let inTimer: ReturnType<typeof setTimeout>; // 节流计时器
let outTimer: ReturnType<typeof setTimeout>;
const currentPerDot = ref(0);
const isShowDot = ref(false);
const distanceToLeft = ref(0);
const emit = defineEmits(['changeCurrent']);
const props = defineProps({
    // 缓存百分比 小数0~1
    bufferPer: {
        type: Number,
        default() {
            return 0.00001;
        }
    },
    // 当前进度百分比 小数0~1
    currentPer: {
        type: Number,
        default() {
            return 0.00001;
        }
    },
    // 外部控制进度条粗细
    activing: {
        type: Boolean,
        default() {
            return false;
        }
    }
})
// 悬浮时的效果
const handleMouseEnter = ()  =>{
    clearTimeout(outTimer);
    isActive.value = true;
    inTimer = setTimeout(() => {
        isShowDot.value = true;
    }, 200);
}
const handleMouseLeave = () => {
    clearTimeout(inTimer);    // 清除显示计时器防止快速经过时的闪烁
    if (!isDragging.value) {
        outTimer = setTimeout(() => {
            isActive.value = false;
        }, 50);   
        outTimer = setTimeout(() => {
            isShowDot.value = false;
        }, 200);             
    }            
}
// 鼠标移动指位置
const onMouseMove = (event: MouseEvent) => {
  if (progress.value) {
    const containerRect = progress.value.getBoundingClientRect();
    distanceToLeft.value = event.clientX - containerRect.left;
    // console.log(distanceToLeft.value);
  }
};
// 初始化拖动
const initDrag = () => {
    let offsetX, currPer;
    if (!progress.value) { return;}
    // 鼠标按下事件处理程序
    progress.value.addEventListener("mousedown", (e) => {
        if (!progress.value) return;
        isDragging.value = true;
        isActive.value = true;
        offsetX = e.clientX - progress.value.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
        currPer = offsetX / progress.value.getBoundingClientRect().width; // 计算进度比例
        currentPer.value = currPer;
        currentPerDot.value = currPer * 100;
        emit("changeCurrent", currPer);    // 更新
    });

    // 移动端 触碰事件处理程序
    progress.value.addEventListener("touchstart", (e) => {
        if (!progress.value) return;
        isDragging.value = true;
        isActive.value = true;
        offsetX = e.touches[0].clientX - progress.value.getBoundingClientRect().left;
        currPer = offsetX / progress.value.getBoundingClientRect().width; // 计算进度比例
        currentPer.value = currPer;
        currentPerDot.value = currPer * 100;
        emit("changeCurrent", currPer);    // 更新
    });

    // 鼠标移动事件处理程序
    document.addEventListener("mousemove", (e) => {
        if (!isDragging.value) return;
        if (!progress.value) return;
        offsetX = e.clientX - progress.value.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
        currPer = offsetX / progress.value.getBoundingClientRect().width; // 计算进度比例
        // 边界值判定
        currPer = Math.max(0.00001, currPer);
        currPer = Math.min(0.99999, currPer);
        currentPer.value = currPer;
        currentPerDot.value = currPer * 100;
        emit("changeCurrent", currPer);    // 更新
    });

    // 移动端 移动事件处理程序
    document.addEventListener("touchmove", (e) => {
        if (!isDragging.value) return;
        if (!progress.value) return;
        e.preventDefault();
        offsetX = e.touches[0].clientX - progress.value.getBoundingClientRect().left;
        currPer = offsetX / progress.value.getBoundingClientRect().width; // 计算进度比例
        // 边界值判定
        currPer = Math.max(0.00001, currPer);
        currPer = Math.min(0.99999, currPer);
        currentPerDot.value = currPer * 100;
        currentPer.value = currPer;
        emit("changeCurrent", currPer);    // 更新
    }, { passive: false });

    // 鼠标释放事件处理程序
    document.addEventListener("mouseup", () => {
        isDragging.value = false;
    });

    // 移动端 释放事件处理程序
    document.addEventListener("touchend", () => {
        isDragging.value = false;
        isActive.value = false;
    });
};
// 监听 activing 的变化
watch(() => props.activing, (newValue) => {
    clearTimeout(outTimer); // 清除计时器
    isDragging.value = newValue;
    isActive.value = newValue;
});

// 监听 currentPer 的变化
watch(() => props.currentPer, (newValue) => {
    clearTimeout(outTimer); // 清除计时器
    currentPer.value = newValue;
    currentPerDot.value = newValue * 100;
});
// 监听 bufferPer 的变化
watch(() => props.bufferPer, (newValue) => {
    bufferPer.value = newValue;
});
onMounted(() =>{
    // 初始化拖动
    initDrag();
})
onUnmounted(() => {
    // 移除事件监听
    progress.value?.removeEventListener("mousedown", initDrag);
    progress.value?.removeEventListener("touchstart", initDrag);
    document.removeEventListener("mousemove", () => {});
    document.removeEventListener("touchmove", () => {});
    document.removeEventListener("mouseup", () => {});
    document.removeEventListener("touchend", () => {})
})
</script>

<style scoped lang="scss">
.player-progress-area {
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    box-sizing: border-box;

    .player-progress-wrap {
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 16px;
        padding-top: 2px;

        .player-progress {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: 2px;
            position: relative;
            width: 100%;

            .player-progress-schedule-wrap {
                position: absolute;
                height: 100%;
                width: 100%;

                .player-progress-schedule-dot {
                    position: absolute;
                    bottom: -7.5px;
                    width: 20px;
                    height: 20px;

                    .icon {
                        width: 100%;
                        height: 100%;
                    }
                }
                .show {
                    animation: dot-in 0.6s ease-out forwards;
                    transform-origin: center;
                }
                .hide {
                    animation: dot-out 0.6s ease-out forwards;
                    transform-origin: center;
                }

                .player-progress-schedule {
                    background-color: hsla(0,0%,100%,.2);
                    bottom: 0;
                    left: 0;
                    overflow: hidden;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    right: 0;
                    top: 0;
                    border-radius: 4px;

                    .player-progress-schedule-buffer {
                        background-color: hsla(0,0%,100%,.3);
                    }

                    .player-progress-schedule-current {
                        background-color: $theme-color;
                    }

                    .player-progress-schedule-centent {
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        right: 0;
                        top: 0;
                        -webkit-transform: scaleX(0);
                        transform: scaleX(0);
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        border-radius: 4px;
                    }

                }
            }
            .player-progress-move-indicator {
                position: absolute;
                bottom: -1px;
                left: 40%;
                width: 10px;
                height: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                color: $theme-color;
                display: none;
                .player-progress-move-indicator-down {
                    width: 10px;
                    height: 10px;
                }
                .player-progress-move-indicator-up {
                    width: 10px;
                    height: 10px;
                }
            }

            .is_active {
                display: block;
            }
            &:hover {
                height: 4px;
                transition: height .2s ease-in-out;
            }
        }

        .state-active {
            height: 4px;
            transition: height .2s ease-in-out;
        }
    }
}
/* 淡入动画 */
@keyframes dot-in {
    0% {
        transform: scale(0, 0); /* 初始状态缩放为0 */
        opacity: 0; /* 初始状态透明 */
    }
    100% {
        transform: scale(1, 1); /* 缩放至原始尺寸 */
        opacity: 1; /* 最终状态不透明 */
    }
}
/* 淡出动画 */
@keyframes dot-out {
    0% {
        transform: scale(1, 1); /* 缩放至原始尺寸 */
        transform: translateY(1px);
        opacity: 1; /* 初始状态不透明 */   
    }
    100% {
        transform: scale(0, 0); /* 初始状态缩放为0 */
        opacity: 0; /* 最终状态透明 */
    }
}
</style>