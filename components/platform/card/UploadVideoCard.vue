<template>
    <div class="card-content">
        <div class="card-content-warp">
            <div class="card-content-header">
                <span>{{ title }}</span>
            </div>
            <div class="card-content-body">
                <div class="card-content-body-left">
                    <div class="video-box">
                        <PlatformCardPlayer :url="url" 
                        @videocurRentTime="changCurRentTime"
                        @videoDuration="changVideoDuration"
                        :currentTimes="timeLineCurrentTime" />
                    </div>
                    <div class="timeline">
                        <div class="timeline-header">
                            <div class="timeline-header-box">
                                <div class="timeline-header-box-slider">
                                    <el-icon style="margin-left: 6px;" class="icon" size="20" @click="reduce"><ElIconZoomOut /></el-icon>
                                    <el-slider style="margin-left: 16px;" v-model="timeline" size="small" :max="3" :min="1"/>
                                    <el-icon style="margin-left: 16px;" class="icon" size="20" @click="add"><ElIconZoomIn /></el-icon>
                                </div>
                            </div>
                        </div>
                        <div class="timeline-body">
                            <div class="timeline-body-warp">
                                <div class="timeline-body-left">
                                    <div class="timeline-item-wrap">
                                        <div class="timeline-item-img">
                                            <img src="@/assets/img/platform/interaction.png" alt="互动引导">
                                        </div>
                                        <div class="timeline-item-img">
                                            <img src="@/assets/img/platform/association.png" alt="互动引导">
                                        </div>
                                        <div class="timeline-item-img">
                                            <img src="@/assets/img/platform/danmu.png" alt="互动引导">
                                        </div>
                                    </div>
                                </div>
                                <div class="timeline-body-right">
                                    <div class="timeline-body-slider">
                                        <div class="timeline-body-slider-lines" 
                                        ref="timelineSliderRef" 
                                        @mousedown="handleMouseDown"
                                        @mouseup="handleMouseUp">
                                            <div class="timeline-slider-line">
                                                <div class="timeline-slider" v-for="(index) in totalIntervalTimes" :key="index" :style="`width: ${timelineWidth}px;`">
                                                    <div class="dot-time">{{ formatTime((index + 1) * intervalTime) }}</div>
                                                </div>
                                                <div class="timeline-slider" :style="`width: ${timelineWidth}px;`"></div>
                                            </div>
                                        </div>
                                        <div class="slider-dot" 
                                        :style="{ left: sliderPosition + '%' }" 
                                        @mousedown.prevent="startDrag($event)" 
                                        @touchstart="startDrag($event, 'touch')"
                                        >
                                            <IconsPlayTimeLineDot class="dot"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content-body-right">
                    <div class="card-content-body-right-warp">
                        <div class="editor-right-tab">
                            <div class="editor-right-tab-item is_active">
                                <div class="editor-icon">
                                    <img src="@/assets/img/platform/interaction.png" alt="互动引导">
                                </div>
                                <span>互动引导</span>
                            </div>
                            <div class="editor-right-tab-item">
                                <div class="editor-icon">
                                    <img src="@/assets/img/platform/association.png" alt="互动引导">
                                </div>
                                <span>关联视频</span>
                            </div>
                            <div class="editor-right-tab-item">
                                <div class="editor-icon">
                                    <img src="@/assets/img/platform/danmu.png" alt="互动引导">
                                </div>
                                <span>投票弹幕</span>
                            </div>
                        </div>
                        <div class="editor-right-add">
                            <el-icon><ElIconPlus /></el-icon>添加互动引导
                        </div>
                        <div class="editor-right-list-item">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { calculateTimelineIntervals } from '@/utils/calculateTime';
const timelineSliderRef = ref<HTMLDivElement | null>(null);// 时间线元素
const sliderPosition = ref(0); // 初始位置，可以根据需要调整
const url = ref();
const title = ref('');
const scrollX = ref(0);
const videoDuration = ref(0);
const intervalTime = ref(0);
const totalIntervalTimes = ref(0);
const timelineWidth = ref(60);
const videoCurrentTime = ref(0);
const timeLineCurrentTime = ref(0);
const isUserInteracting = ref(false);
let startX = 0;
let initialSliderX = 0;
const timeline = ref(1);
const props = defineProps({
    file: {
        type: File,
        default: ''
    }
});
// 缩小视频时间轴
const reduce = () => {
    if (timeline.value <= 1) return;
    timeline.value -= 1;
}
// 放大视频时间轴
const add = () => {
    if (timeline.value >= 3) return;
    timeline.value += 1;
}
const startDrag = (e: MouseEvent | TouchEvent, eventType?: string) => {
    startX = eventType === 'touch' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    initialSliderX = sliderPosition.value;
    window.addEventListener('mousemove', dragging);
    window.addEventListener('mouseup', stopDrag);
}
const dragging = (e: MouseEvent | TouchEvent, eventType?: string) =>{
    if (!timelineSliderRef.value) return;
    const sliderRect = timelineSliderRef.value.getBoundingClientRect();
    const newX = eventType === 'touch' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    
    const newPosition = Math.max(0, Math.min(100, 
        ((newX - startX + initialSliderX /100 * sliderRect.width) / sliderRect.width) * 100
    ));  
    //console.log(newPosition)
    if (newPosition > sliderPosition.value) {
        timeLineCurrentTime.value = timeLineCurrentTime.value + timelineSliderRef.value.clientWidth / timelineWidth.value * intervalTime.value * Math.trunc(newPosition - sliderPosition.value) / 100;
        //console.log(timeLineCurrentTime.value);
    } else if (newPosition < sliderPosition.value) {
        timeLineCurrentTime.value = timeLineCurrentTime.value - timelineSliderRef.value.clientWidth / timelineWidth.value * intervalTime.value * (sliderPosition.value - newPosition) / 100;
    }
    //console.log(timeLineCurrentTime.value) 
    sliderPosition.value = newPosition;
    isUserInteracting.value = true;

}

const stopDrag = async() => {
    window.removeEventListener('mousemove', dragging);
    window.removeEventListener('mouseup', stopDrag);
    isUserInteracting.value = false;
}
const handleScroll = (event: Event) => {
    if (!timelineSliderRef.value) return;
    if (event.target instanceof HTMLElement) {
        scrollX.value = event.target.scrollLeft;
        if (isUserInteracting.value) {
            timeLineCurrentTime.value = scrollX.value / timelineWidth.value * intervalTime.value;
            //console.log(timeLineCurrentTime.value)
        }
    }
};
const handleMouseDown = () =>{
      // 鼠标按钮被按下
      isUserInteracting.value = true;
      //console.log(isUserInteracting.value)
};
const handleMouseUp = () =>{
      // 鼠标按钮被释放
      isUserInteracting.value = false;
};
const changCurRentTime = (currentTime: number) => {
    if (!timelineSliderRef.value) return;
    if (!isUserInteracting.value) {
            timelineSliderRef.value.scrollLeft = currentTime / videoDuration.value * timelineWidth.value * totalIntervalTimes.value;
    }
    videoCurrentTime.value = currentTime;
}
const changVideoDuration = (duration: number) => {
    videoDuration.value = duration;
    const { interval, totalIntervals } = calculateTimelineIntervals(duration);
    intervalTime.value = interval;
    totalIntervalTimes.value = totalIntervals;
    // console.log(interval)
}
watch(() => timeline.value, (newValue) => {
    switch (newValue) {
        case 3:
        timelineWidth.value = 100;
        break;
        case 2:
        timelineWidth.value = 80;
        break;
        case 1:
        timelineWidth.value = 60;
        break;
    }
});
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
};
// 辅助函数，用于在数字前添加零
const padZero = (num: number) =>{
    return num.toString().padStart(2, '0');
};
onMounted(() => {
    url.value = URL.createObjectURL(props.file);
    title.value = props.file.name;
    if (!timelineSliderRef.value) return;
    // console.log(timelineSliderRef.value.clientWidth)
    timelineSliderRef.value.addEventListener('scroll', handleScroll, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener('mousemove', dragging); // 移除事件监听
  window.removeEventListener('mouseup', stopDrag); // 移除事件监听
  URL.revokeObjectURL(url.value);
  if (!timelineSliderRef.value) return;
  timelineSliderRef.value.removeEventListener('scroll', handleScroll);
});
</script>
<style lang="scss" scoped>
.card-content {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 0 32px 24px;
    .card-content-warp {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .card-content-header {
            width: 100%;
            height: 36px;
            span {
                line-height: 36px;
            }
        }
        .card-content-body {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            .card-content-body-left {
                width: 660px;
                .video-box {
                    width: 660px;
                    height: calc(660px * 9/16);
                }
                .timeline {
                    width: 100%;
                    height: 200px;
                    box-sizing: border-box;
                    box-shadow: 0 0 0 1px #a2a2a2;
                    background: #fafafa;
                    .timeline-header {
                        height: 44px;
                        width: 100%;
                        box-shadow: 0 0 0 1px #a2a2a2;

                        .timeline-header-box {
                            height: 100%;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            padding-left: 40px;
                            color: #757575;
                            box-sizing: border-box;
                            .timeline-header-box-slider {
                                height: 100%;
                                width: 140px;
                                display: flex;
                                align-items: center;
                                
                                :deep(.el-slider__button) {
                                    border: none;
                                    height: 10px;
                                    width: 10px;
                                    background-color: $theme-color;
                                    cursor: pointer;
                                }

                                :deep(.el-slider__bar) {
                                    background-color: $theme-color;
                                }

                                :deep(.el-slider__button-wrapper) {
                                    cursor: pointer;
                                }

                                .icon {
                                    cursor: pointer;
                                }

                            }
                        }
                    }
                    .timeline-body {
                        width: 100%;
                        height: 156px;
                        box-sizing: border-box;
                        .timeline-body-warp {
                            height: 100%;
                            width: 100%;
                            display: flex;
                            .timeline-body-left {
                                box-sizing: border-box;
                                height: 100%;
                                width: 40px;
                                border-right: 1px solid #a2a2a2;

                                .timeline-item-wrap {
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    
                                    .timeline-item-img {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        width: 20px;
                                        height: 20px;
                                        margin: 10px 0;
                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                }
                            }

                            .timeline-body-right {
                                height: 100%;
                                width:100%;
                                .timeline-body-slider {
                                    position: relative;
                                    height: 100%;
                                    width: 100%;
                                    box-sizing: border-box;
                                    .timeline-body-slider-lines {
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 100%;
                                        height: 100%;
                                        overflow-x: scroll;
                                        overflow-y: hidden;
                                        box-sizing: border-box;
                                        .timeline-slider-line {
                                            height: 100%;
                                            width: auto;
                                            white-space: nowrap; /* 防止换行 */
                                            // overflow-x: auto; /* 水平滚动条 */
                                            //display: flex;
                                            //background: #61666d;
                                            .timeline-slider {
                                                display: inline-block;
                                                position: relative;
                                                height: 12px;
                                                width: 60px;
                                                margin: 0;
                                                box-sizing: border-box; 
                                                border-right: 2px solid #a2a2a2;

                                                .dot-time {
                                                    position: absolute;
                                                    bottom: -16px;
                                                    right: -28px;
                                                    font-size: 10px;
                                                    color: #a2a2a2;
                                                }
                                            }

                                        }
                                    }
                                    .slider-dot {
                                        position: absolute;
                                        top: 9px;
                                        height: 147px;
                                        width: 2px;
                                        border-left: 2px solid $theme-color;
                                        cursor: pointer;

                                        .dot {
                                            position: absolute;
                                            top: -9px;
                                            left: -7px;
                                            height: 10px;
                                            width: 13px;
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }

            .card-content-body-right {
                width: 100%;
                border: 3px solid #f1f1f1;
                border-radius: 4px;
                margin-left: 10px;
                background: #fafafa;
                .card-content-body-right-warp {
                    .editor-right-tab {
                        display: flex;
                        .editor-right-tab-item {
                            box-sizing: border-box;
                            border-radius: 8px;
                            background: #fff;
                            box-shadow: 0 0 0 1px #f1f1f1;
                            color: #757575;
                            margin: 8px 12px;
                            padding: 0 2px;
                            height: 76px;
                            width: 76px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            cursor: pointer;

                            .editor-icon {
                                width: 100%;
                                height: 50px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img {
                                    width: 34px;
                                    height: 34px;
                                }
                            }
                            span {
                                font-size: 13px;
                            }
                        }

                        .is_active {
                            border: 2px solid $theme-color;
                        }
                    }

                    .editor-right-add {
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        background: #fff;
                        border: 1px solid silver;
                        border-radius: 3px;
                        color: #61666d;
                        cursor: pointer;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        font-size: 15px;
                        height: 50px;
                        justify-content: center;
                        margin: 10px 10px;
                        text-align: center;
                    }

                    .editor-right-list-item {
                        width: 100%;
                        height: auto;
                        // background-color: aquamarine;
                    }
                }
            }
        }
    }
}
*::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
}
</style>