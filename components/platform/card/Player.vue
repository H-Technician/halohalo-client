<template>
    <div class="player-video-area"
    @mouseleave="hideControls"
    ref="videoPlayerRef"
    >
        <div class="player-video-wrap" 
        @mousemove="showControls('video')"
        @dblclick="toggleFullscreen"
        
        :style="isShowCursor ? '' : 'cursor: none;'"
        >
            <video ref="videoplayer" 
            :src="props.url"  
            @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate"
            @ended="onVideoEnded"
            ></video>
        </div>
        <div class="video-controls" 
        :style="{ visibility: controlsShowVisibility ? 'hidden' : 'visible' }"
        :class="controlsVisibility ? 'hide' : 'show'"
        @mousemove="showControls('controls')"
        >
            <div class="video-controls-wrap">
                <div class="video-controls-top">
                    <div class="video-controls-progress">
                        <!-- 视频进度条 -->
                        <VideoplayerPlayerProgress 
                        :currentPer="progressPercentage" 
                        @changeCurrent="changeCurrent"/>
                    </div>
                </div>
                <div class="video-controls-bottom">
                    <div class="video-controls-left">
                        <!-- 播放暂停按钮 -->
                        <div class="video-controls-play-icon" @click="togglePlayPause">
                            <IconsPlay class="icon" v-if="!isPlaying"/>
                            <IconsPlaySuspend class="icon" v-else/>
                        </div>
                        <!-- 当前播放时间 -->
                        <div class="video-controls-play-time">
                            <div class="vide0-play-time">
                                <span>{{ formattedCurrentTime }}</span>
                                <span> / </span>
                                <span>{{ formattedTotalTime }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="video-controls-right">
                        <div class="video-controls-setting">
                            <span>倍速</span>
                        </div>
                        <div class="video-controls-volume-icon" @click="toggleVolume">
                            <IconsPlayVolume class="icon" v-if="!isMute"/>
                            <IconsPlayMute class="icon" v-else/>
                        </div>
                        <div class="video-controls-fullscreen-icon" @click="toggleFullscreen">
                            <IconsPlayFullScreen class="icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <VideoplayerPlayerBuffer :bufferPer="progressPercentage" :class="controlsShowVisibility ? '' : 'is_hide'" />    
    </div>
</template>
<script setup lang="ts">
const videoplayer = ref<HTMLVideoElement | null>(null);
const videoPlayerRef = ref<HTMLDivElement | null>(null);
const videoDuration = ref<number>(0);
const currentProgress = ref<number>(0);
const isPlaying = ref<boolean>(false);
const progressPercentage = ref<number>(0);
const formattedCurrentTime = ref('00:00');
const formattedTotalTime = ref('00:00');
let inTimer: ReturnType<typeof setTimeout>; // 节流计时器
const controlsVisibility = ref(false);
const controlsShowVisibility = ref(false);
const isMute = ref(false);
const isShowCursor = ref(true);
const isFullscreen = ref(false);
const props = defineProps({
    url: {
        type: String,
        default: ''
    },
    currentTimes: {
        type: Number,
        default: 0
    }
});
const emit = defineEmits(['videoDuration', 'videocurRentTime']); // 获取视频时长回调事件, 获取视频播放暂停回调事件
// 获取视频时长
const onLoadedMetadata = () => {
    if (!videoplayer.value) return;
        videoDuration.value = videoplayer.value.duration;
    if (videoDuration.value !== 0) {
        formattedTotalTime.value = formatTime(videoDuration.value);
        emit('videoDuration', videoDuration.value);
    }
};
// 播放暂停
const togglePlayPause = () => {
    if (!videoplayer.value) return;
    if (isPlaying.value) {
        videoplayer.value.pause();
    } else {
        videoplayer.value.play();
    }
    isPlaying.value = !isPlaying.value;
};
// 获取当前播放时间
const onTimeUpdate = () => {
    if (!videoplayer.value) return;
    currentProgress.value = videoplayer.value.currentTime;
    progressPercentage.value = (currentProgress.value / videoplayer.value.duration);
    formattedCurrentTime.value = formatTime(currentProgress.value);
    emit('videocurRentTime', currentProgress.value);
};
// 格式化时间
const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const secondsFormatted = date.getUTCSeconds().toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secondsFormatted}`;
    } else {
        return `${minutes}:${secondsFormatted}`;
    }
};
const changeCurrent = (currPer: number) => {
    if (!videoplayer.value) return;
    videoplayer.value.currentTime = currPer * videoDuration.value;
    emit('videocurRentTime', currPer * videoDuration.value);
};
const showControls = (position: string) => {
    clearTimeout(inTimer);
    if (position === 'video') {
        isShowCursor.value = true;
        controlsVisibility.value = false;
        controlsShowVisibility.value = false;
        inTimer = setTimeout(() => {
            controlsVisibility.value = true;
            inTimer = setTimeout(() => {
                controlsShowVisibility.value = true;
                isShowCursor.value = false;
            }, 200);
        }, 2000); // 控制栏显示2秒后自动隐藏
    } else if (position === 'controls') {
        controlsVisibility.value = false;
        isShowCursor.value = true;
    }
};
const onVideoEnded = () => {
    if (!videoplayer.value) return;
    // 在这里执行你的逻辑，例如重置播放状态
    isPlaying.value = false;
    videoplayer.value.currentTime = 0;
};
const hideControls = () =>{
    inTimer = setTimeout(() => {
        controlsVisibility.value = true;
        inTimer = setTimeout(() => {
            controlsShowVisibility.value = true;
            isShowCursor.value = true;
        }, 200);
    }, 1000)
};
const toggleVolume = () => {
    if (!videoplayer.value) return;
    if (isMute.value) {
        videoplayer.value.volume = 1;
    } else {
        videoplayer.value.volume = 0;
    }
    isMute.value = !isMute.value;
};
// 切换全屏状态
const toggleFullscreen = () => {
    if (!videoPlayerRef.value) return;
    if (!videoplayer.value) return;
    if (!isFullscreen.value) {
        enterFullscreen(videoPlayerRef.value);
    } else {
        exitFullscreen();
    }
};
const handleKeyDown = (event: KeyboardEvent) => {
    if (!videoplayer.value) return;
    event.preventDefault();
    switch (event.key) {
        case ' ':
        togglePlayPause();
        break;
        case 'ArrowRight':
        videoplayer.value.currentTime += 5; // 快进5秒
        break;
        case 'ArrowLeft':
        videoplayer.value.currentTime -= 5; // 后退5秒
        break;
        default:
        break;
    }
};
// 进入全屏
const enterFullscreen = (element: HTMLDivElement) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { /* Firefox */
        (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { /* IE/Edge */
        (element as any).msRequestFullscreen();
    }
    isFullscreen.value = true;
};

// 退出全屏
const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { /* Firefox */
        (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { /* Chrome, Safari and Opera */
        (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { /* IE/Edge */
        (document as any).msExitFullscreen();
    }
    isFullscreen.value = false;
};
// 监听全屏状态变化
const handleFullscreenChange = () => {
    isFullscreen.value = document.fullscreenElement !== null;
    if (document.fullscreenElement) {
        showControls('video');
    }
};

watch(() => props.currentTimes, (newValue) => {
    if (!videoplayer.value) return;
    videoplayer.value.currentTime = newValue;
});
onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
});
onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.removeEventListener('keydown', handleKeyDown);
});
</script>
<style lang="scss" scoped>
.player-video-area {
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
    background-color: #000000;
    .player-video-wrap {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        z-index: 0;
        display: block;
        video {
            content-visibility: visible;
            display: block;
            height: 100%;
            margin: auto;
            width: 100%;
        }
    }
    .video-controls {
        display: block;
        position: absolute;
        height: 60px;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 30;
        background: linear-gradient(to bottom, rgba(0, 0, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
        .video-controls-wrap {
            width: 100%;
            height: 100%;
            .video-controls-top {
                width: 100%;
                height: 20px;
                .video-controls-progress {
                    box-sizing: border-box;
                    padding: 0 10px;
                    width: 100%;
                    height: 100%;
                }
            }
            .video-controls-bottom {
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .video-controls-left {
                    padding-left: 20px;
                    display: flex;
                    .video-controls-play-icon {
                        width: 24px;
                        height: 24px;
                        cursor: pointer;
                        fill: #ffffff;
                        .icon {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .video-controls-play-time {
                        width: auto;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        margin-left: 10px;
                        .vide0-play-time {
                            line-height: 24px;
                            color: #ffffff;
                            font-size: 12px;
                            font-family: 'HarmonyOS_Sans_SC_Medium';
                        }
                    }
                } 

                .video-controls-right {
                    padding-right: 20px;
                    display: flex;
                    .video-controls-setting {
                        width: auto;
                        height: 24px;
                        display: flex;
                        cursor: pointer;
                        color: #ffffff;
                        align-items: center;
                        margin-right: 20px;
                        span {
                            line-height: 24px;
                            font-size: 14px;
                            font-family: 'HarmonyOS_Sans_SC_Medium';
                        }
                    }
                    .video-controls-volume-icon {
                        width: 24px;
                        height: 24px;
                        cursor: pointer;
                        fill: #ffffff;
                        margin-right: 20px;
                        .icon {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .video-controls-fullscreen-icon {
                        width: 24px;
                        height: 24px;
                        cursor: pointer;
                        fill: #ffffff;
                        .icon {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    
                }
            }

        }
    }
    .show {
        animation: fadeIn 0.2s ease-in-out;
    }
    .hide {
        animation: fadeOut 0.2s ease-in-out;
    }
    .is_hide {
        display: none;
    }
}

video::-webkit-media-controls {
    display: none !important;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>