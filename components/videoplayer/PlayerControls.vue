<template>
    <div class="player-controls">
        <div class="player-controls-wrap">
            <div class="player-controls-top">
                <div class="player-controls-progress">
                    <!-- 视频进度条 -->
                    <VideoplayerPlayerProgress 
                    :currentPer="progressPercentage"
                    :bufferPer="progressBufferPer"
                    @changeCurrent="handleChangeCurrent" />
                </div>
            </div>
            <div class="player-controls-bottom">
                <div class="player-controls-left">
                    <!-- 上一个 -->
                    <div class="player-controls-icon">
                        <IconsPlayNextPrev class="icon prev-icon"/>
                    </div>
                    <!-- 播放暂停按钮 -->
                    <div class="player-controls-play-icon" @click="togglePlayPause">
                        <IconsPlay class="icon" :style="isPlaying ? 'display: none;' : ''" />
                        <IconsPlaySuspend class="icon" :style="isPlaying ? '' : 'display: none;'" />
                    </div>
                    <!-- 下一个 -->
                    <div class="player-controls-icon">
                        <IconsPlayNextPrev class="icon"/>
                    </div>
                    <!-- 当前播放时间 -->
                    <div class="player-controls-play-time">
                        <div class="player-play-time">
                            <span>{{ formattedCurrentTime }}</span>
                            <span> / </span>
                            <span>{{ formattedTotalTime }}</span>
                        </div>
                    </div>
                </div>
                <div class="player-controls-center">
                    <!-- 发送弹幕输入框 -->
                    <VideoplayerPlayerSendDmInput 
                    position="controls" 
                    :isFullscreen="isFullscreen" 
                    :isWebFullScreen="props.webFullScreen"
                    :displayDanmu="props.displayDanmu"
                    @changDisplayDanmu="changDisplayDanmu" />
                </div>
                <div class="player-controls-right">
                    <!-- 清晰度切换 -->
                     <VideoplayerPanel :panelStyle="isFullscreen ? 'padding-bottom: 40px;' : 'padding-bottom: 30px;'">
                        <template #reference>
                            <div class="player-controls-item controls-text">
                                <span>1080p 高清</span>
                            </div>
                        </template>
                        <template #content>
                            <VideoplayerCtrlmenuQuality />
                        </template>
                     </VideoplayerPanel>
                    <!-- 选集 -->
                    <div class="player-controls-item controls-text" :style="isFullscreen ? '' : 'display: none;'">
                        <span>选集</span>
                    </div>
                    <!-- 倍速 -->
                    <VideoplayerPanel :panelStyle="isFullscreen ? 'padding-bottom: 40px;' : 'padding-bottom: 30px;'">
                        <template #reference>
                            <div class="player-controls-item controls-text">
                                <span>倍速</span>
                            </div>
                        </template>
                        <template #content>
                            <VideoplayerCtrlmenuBackrate @selectedBackrate="handleSelectedBackrate"/>
                        </template>
                    </VideoplayerPanel>
                    <!-- 音量 -->
                    <VideoplayerPanel :panelStyle="isFullscreen ? 'padding-bottom: 40px;' : 'padding-bottom: 30px;'">
                        <template #reference>
                            <div class="player-controls-item controls-icon" @click="toggleMute">
                                <IconsPlayVolume class="icon" :style="props.volume === 0 ? 'display: none;' : ''"/>
                                <IconsPlayMute class="icon" :style="props.volume === 0 ? '' : 'display: none;'"/>
                            </div>
                        </template>
                        <template #content>
                            <VideoplayerCtrlmenuVolume :volume="props.volume" @updateVolume="updateVolume"/>
                        </template>
                    </VideoplayerPanel>
                    <!-- 设置 -->
                     <VideoplayerPanel :panelStyle="isFullscreen ? 'padding-bottom: 40px;' : 'padding-bottom: 30px;'"
                     @isShowPanel="handleIsShowSettingMorePanel">
                        <template #reference>
                            <div class="player-controls-item controls-icon">
                                <IconsPlaySetting class="icon"/>
                            </div>
                        </template>
                        <template #content>
                            <VideoplayerCtrlmenuSetting 
                            :isShowSettingMorePanel="hideSettingMorePanel"/>
                        </template>
                    </VideoplayerPanel>
                    <!-- 画中画 -->
                    <Tooltip :overlayStyle="{ marginBottom: isFullscreen || props.webFullScreen ? 36 + 'px' : 22 + 'px' }">
                        <template #tooltip>{{ isPip ? '退出画中画' : '开启画中画'}}</template>
                        <div class="player-controls-item controls-icon" @click="togglePiP">
                            <IconsPlayCommon class="icon"/>
                        </div>
                    </Tooltip>
                    <!-- 网页全屏 -->
                    <Tooltip :overlayStyle="{ marginBottom: props.webFullScreen ? 36 + 'px' : 22 + 'px' }" :style="isFullscreen ? 'display: none;' : ''">
                        <template #tooltip>{{ props.webFullScreen ? '退出网页全屏' : '网页全屏'}}</template>
                        <div class="player-controls-item controls-icon" @click="toggleWebFullscreen">
                            <IconsPlayWebScreen class="icon"/>
                        </div>
                    </Tooltip>
                    <!-- 全屏 -->
                    <Tooltip :overlayStyle="{ marginBottom: isFullscreen || props.webFullScreen ? 36 + 'px' : 22 + 'px' }">
                        <template #tooltip>{{ isFullscreen ? '退出全屏(f)' : '进入全屏(f)'}}</template>
                        <div class="player-controls-item controls-icon" @click="toggleFullscreen">
                            <IconsPlayFullScreen class="icon"/>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { formatTime } from '@/utils/formatTime';
const formattedCurrentTime = ref('00:00'); // 当前播放时间
const formattedTotalTime = ref('00:00'); // 总时长
const currentProgress = ref<number>(0); // 当前播放进度
const progressPercentage = ref<number>(0); // 进度条百分比
const isFullscreen = ref(false); // 是否全屏
const isPlaying = ref(false); // 播放状态
const originalVolume = ref(0); // 在静音模式下，记录当前音量
const isPip = ref(false); // 是否处于画中画模式
const progressBufferPer = ref(0.00001); // 缓冲进度
const hideSettingMorePanel = ref(false); // 关闭示弹幕设置面板
const emit = defineEmits([
    'toggleFullscreen', 
    'togglePlayPause', 
    'changeCurrent', 
    'updateVolume', 
    'toggleMute', 
    'togglePiP',
    'changeBackrate',
    'toggleWebFullscreen',
    'changDisplayDanmu'
]);
const props = defineProps({
    // 是否全屏
    fullscreen: {
        type: Boolean,
        default: false
    },
    webFullScreen: {
        type: Boolean,
        default: false
    },
    // 播放进度时间
    currentTime: {
        type: Number,
        default: 0
    },
    // 视频时长
    duration: {
        type: Number,
        default: 0
    },
    // 播放状态
    playing: {
        type: Boolean,
        default: false
    },
    // 音量
    volume: {
        type: Number,
        default: 0
    },
    // 是否处于画中画模式
    inPictureInPicture: {
        type: Boolean,
        default: false
    },
    // 缓存
    buffer: {
        type: Number,
        default: 0.00001
    },
    // 弹幕开启和关闭
    displayDanmu: {
        type: Boolean,
        default: true
    }

});
// 播放暂停
const togglePlayPause = () => {
    emit('togglePlayPause');
};
// 静音/恢复
const toggleMute = () => {
    if (props.volume !== 0) {
        originalVolume.value = props.volume;
        emit('toggleMute', true, 0);
    } else {
        emit('toggleMute', false, originalVolume.value);
    }
};
// 切换全屏状态
const toggleFullscreen = () => {
    emit('toggleFullscreen');
};
// 切换网页全屏状态
const toggleWebFullscreen = () => {
    emit('toggleWebFullscreen');
};
// 画中画
const togglePiP = () => {
    emit('togglePiP');
};
// 改变当前播放进度
const handleChangeCurrent = (currPer: Number) => {
    emit('changeCurrent', currPer);
};
const updateVolume = (volume: number) => {
    emit('updateVolume', volume);
};
// 改变播放速度 
const handleSelectedBackrate = (backrate: number) => {
    emit('changeBackrate', backrate);
};
// 关闭设置面板
const handleIsShowSettingMorePanel = (isShow: boolean) => {
        hideSettingMorePanel.value = isShow;
};
// 打开关闭弹幕
const changDisplayDanmu = (val: boolean) => {
    if (props.fullscreen || props.webFullScreen) {
        emit('changDisplayDanmu', val);
    }
};
// 监听全屏状态
watch(() => props.fullscreen, (newValue) => {
    isFullscreen.value = newValue;
});
// 监听播放进度
watch(() => props.currentTime, (newValue) => {
    formattedCurrentTime.value = formatTime(newValue);
    currentProgress.value = newValue;
    progressPercentage.value = newValue / props.duration;
});
// 监听视频时长
watch(() => props.duration, (newValue) => {
    if (newValue) {
        formattedTotalTime.value = formatTime(newValue);
    }
});
// 监听播放状态
watch(() => props.playing, (newValue) => {
    if (newValue) {
        isPlaying.value = true;
    } else {
        isPlaying.value = false;
    }
});
// 监听画中画状态
watch(() => props.inPictureInPicture, (newValue) => {
    isPip.value = newValue;
});
// 监听视频缓冲
watch(() => props.buffer, (newValue) => {
    progressBufferPer.value = newValue / props.duration;
});
onMounted(() => {
    // 初始化时间
    if (props.duration) {
        formattedTotalTime.value = formatTime(props.duration);
    }
    formattedCurrentTime.value = formatTime(props.currentTime);
    formattedTotalTime.value = formatTime(props.duration);
    progressBufferPer.value = props.buffer / props.duration;
});
</script>
<style scoped lang="scss">
.player-controls {
    display: block;
    position: absolute;
    height: 70px;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 80;
    background: linear-gradient(to bottom, rgba(0, 0, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    .player-controls-wrap {
        width: 100%;
        height: 100%;
        .player-controls-top {
            width: 100%;
            height: 20px;
            .player-controls-progress {
                box-sizing: border-box;
                padding: 0 10px;
                width: 100%;
                height: 100%;
            }
        }
        .player-controls-bottom {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .player-controls-left {
                padding-left: 20px;
                display: flex;
                align-items: center;
                flex: 0 0 auto;
                height: 22px;
                .player-controls-play-icon {
                    width: 22px;
                    height: 22px;
                    cursor: pointer;
                    fill: #ffffff;
                    .icon {
                        width: 100%;
                        height: 100%;
                    }
                }

                .player-controls-icon {
                    width: 40px;
                    height: 22px;
                    cursor: pointer;
                    fill: #ffffff;
                    .icon {
                        width: 100%;
                        height: 100%;
                    }

                    .prev-icon {
                        transform: rotate(180deg);
                    }
                }
                
                .player-controls-play-time {
                    width: auto;
                    height: 22px;
                    display: flex;
                    align-items: center;
                    margin-left: 10px;
                    .player-play-time {
                        line-height: 24px;
                        color: #ffffff;
                        font-size: 13px;
                    }
                }
                
            }
            .player-controls-center {
                height: 100%;
                display: flex;
                align-items: center;
                max-width: 540px;
                flex: 1; /* 这将允许中心元素伸缩 */
                display: none;
            }

            .player-controls-right {
                padding-right: 20px;
                display: flex;
                align-items: center;
                flex: 0 0 auto;

                .player-controls-item {
                    height: 22px;
                    cursor: pointer;
                    fill: #ffffff;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .icon {
                        width: 100%;
                        height: 100%;
                    }
                    span {
                        line-height: 24px;
                        font-size: 14px;
                    }
                }
                .controls-text {
                    width: auto;
                    margin-right: 10px;
                    margin-left: 10px;
                }
                .controls-icon {
                    width: 40px;
                }
                
            }
        }

    }
}
</style>