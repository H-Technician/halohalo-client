<template>
  <div id="playerWrap" class="player-wrap">
    <!-- 播放器主体 -->
    <div class="player">
      <div class="player-primary-area">
        <!-- 视频播放区域 -->
        <div class="player-video-area" 
        id="video-area" 
        :class="isWebFullScreen ? 'web-full-screen player-video-area-web-full' : ''"
        ref="videoPlayerRef"
        @mouseleave="hideControls"
        :style="isShowCursor ? '' : 'cursor: none;'">
          <!-- 视频 -->
          <div class="player-video-perch" 
          @mousemove="showControls('video')"
          @click="clickPlayPause"
          @dblclick="dblclickFullscreen">
            <Teleport to="#player-mini-warp" :disabled="!isShowMinPlayer">
              <div class="player-video-wrap">
                <video ref="videoPlayer"
                @loadedmetadata="onLoadedMetadata"
                @timeupdate="onTimeUpdate"
                @ended="onVideoEnded"
                @waiting="onWaiting"
                @playing="onPlaying">
                </video>
              </div>
            </Teleport>
          </div>
          <div class="player-video-poster"></div>
          <VideoplayerPlayerDmWrap 
          :currentTime="currentProgress"
          :isplaying="isPlaying"
          :displayDanmu="displayDanmu"
          :isLoading="isLoading"/>
          <VideoplayerPlayerCmdDmWrap 
          :isUpload="true"
          :currentTime="currentProgress"/>
          <div class="player-state-wrap">
            <div class="player-state-wrap-play" 
            :style="isPlaying ? 'display: none;' : ''"
            ></div>
            <div class="bpx-player-state-buff-icon" :style="isLoading ? '' : 'display: none;'"></div>
            <div class="bpx-player-state-buff-text" :style="isLoading ? '' : 'display: none;'">
              正在缓冲
              {{ mbPerSec.toFixed(2) + 'Mb/s' }}
            </div>
          </div>
          <!-- 底部进度条 -->
          <VideoplayerPlayerBuffer 
          :bufferPer="progressPercentage"
          :style="controlsShowVisibility ? 'visibility: hidden;' : 'visibility: visible;'"
          />
          <!-- 底部控制栏 -->
          <VideoplayerPlayerControls 
          :style="controlsShowVisibility ? 'visibility: visible;' : 'visibility: hidden;'"
          :class="controlsVisibility ? 'show' : 'hide'"
          :fullscreen="isFullscreen" 
          :currentTime="currentProgress"
          :duration="videoDuration"
          :playing="isPlaying"
          :volume="volume"
          :inPictureInPicture="isInPictureInPicture"
          :buffer="buffer"
          :webFullScreen="isWebFullScreen"
          :displayDanmu="displayDanmu"
          @changDisplayDanmu="changDisplayDanmu"
          @toggleFullscreen="toggleFullscreen"
          @togglePlayPause="togglePlayPause"
          @changeCurrent="changeCurrent" 
          @mousemove="showControls('controls')"
          @updateVolume="updateVolume"
          @toggleMute="toggleMute"
          @togglePiP="togglePiP"
          @changeBackrate="changeBackrate"
          @toggleWebFullscreen="toggleWebFullscreen"
          />
          <!-- MINI播放器容器 -->
          <div class="player-mini-warp"
          id="player-mini-warp"
          :class="isShowMinPlayer ? 'show-min-player' : ''"
          :style="`right: ${minPlayerRight}px; bottom: ${minPlayerBottom}px;`"
          ref="minPlayerRef">
            <div class="player-mini-close" 
            @click="isShowMinPlayer = false">
              <IconsDialogClose class="player-mini-close-icon"/>
            </div>
            <!-- MINI播放器状态容器 -->
            <div class="player-mini-state">
              <div class="player-mini-state-play" 
              :style="isPlaying ? 'display: none;' : ''"
              @click="togglePlayPause"></div>
              <div class="player-mini-state-pause" 
              :style="isPlaying ? '' : 'display: none;'"
              @click="togglePlayPause"></div>
            </div>
            <!-- MINI播放器底部进度条 -->
            <div class="player-mini-progress">
              <VideoplayerPlayerBuffer 
              :bufferPer="progressPercentage"
              />
            </div>
          </div>
          <!-- 全屏音量显示 -->
          <div class="player-volume-hint" 
          :style="volumeHint ? 
          '' : 'display: none;'">
            <span class="player-volume-hint-icon">
              <IconsPlayVolume :style="volume === 0 ? 'display: none;' : ''"/>
              <IconsPlayMute :style="volume !== 0 ? 'display: none;' : ''"/>
            </span>
            <span class="player-volume-hint-text">
              {{ volume !== 0 ? (volume * 100).toFixed(0) + '%' : '静音' }}
            </span>
          </div>
        </div>
        <!-- 底部弹幕发送栏 -->
        <VideoplayerPlayerSendDmBar 
        :fullscreen="isFullscreen"
        :displayDanmu="displayDanmu"
        :isWebFullScreen="isWebFullScreen"
        @changDisplayDanmu="changDisplayDanmu"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Hls from 'hls.js';
const videoPlayerRef = ref<HTMLDivElement | null>(null); // 播放器容器
const videoPlayer = ref<HTMLVideoElement | null>(null); // 视频
const minPlayerRef = ref<HTMLDivElement | null>(null); // 小播放器容器
const videoUrl = '' // 替换为你的视频URLhttps://static.v.hblog.top/test.video.mp4https://static.v.hblog.top/good.mp4
const isFullscreen = ref(false); // 全屏状态
const progressPercentage = ref(0); // 进度条百分比
const videoDuration = ref<number>(0); // 视频时长
const currentProgress = ref<number>(0); // 当前播放时间
const isPlaying = ref(false); // 播放状态
const controlsVisibility = ref(true); // 控制条是否显示
const controlsShowVisibility = ref(false); // 控制条显示隐藏
let inCtrlTimer: ReturnType<typeof setTimeout>; // 节流计时器
let inCtrlShowTimer: ReturnType<typeof setTimeout>; // 控制条显示隐藏节流计时器
let clickTimer: ReturnType<typeof setTimeout>; // 点击节流计时器
let volumeHintTimer: ReturnType<typeof setTimeout>; // 音量提示节流计时器
const isShowCursor = ref(true); // 鼠标是否显示
const isLoading = ref(true); // 加载状态
const volume = ref(0.25); // 初始音量
const isInPictureInPicture = ref(false); // 是否处于画中画模式
const hls = ref<Hls | null>(null); // hls实例
const buffer = ref(0); // 缓冲
const isShowMinPlayer = ref(false); // 是否显示小播放器
const observer = ref<IntersectionObserver | null>(null); // 监听是否在视窗内
const minPlayerRight = ref(100); // 小播放器距离右
const minPlayerBottom = ref(100); // 小播放器距离下
const isWebFullScreen = ref(false); // 是否处于网页全屏
const volumeHint = ref(false); // 音量提示
const displayDanmu = ref(true); // 弹幕开关
const originalVolume = ref(0); // 在静音模式下，记录当前音量
const emit = defineEmits(['changWebFullScreen']);
// props
const props = defineProps({
  // 视频地址
    videoUrl: {
        type: String,
        default: ''
    },
    // 是否启用HLS
    useHls: {
        type: Boolean,
        default: false
    },
});
// 点击视频播放器区域播放暂停事件
const clickPlayPause = () => {
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    togglePlayPause();
    // console.log('触发点击事件');
  }, 400);
};
// 双击视频播放器区域全屏或退出全屏事件
const dblclickFullscreen = () => {
  clearTimeout(clickTimer);
  toggleFullscreen();
  // console.log('触发双击事件');
};
// 切换播放状态
const togglePlayPause = () => {
    if (videoPlayer.value) {
        if (videoPlayer.value.paused) {
            videoPlayer.value.play();
            isPlaying.value = true;
            if (isLoading.value) {
              isLoading.value = false;
            }
        } else {
            videoPlayer.value.pause();
            isPlaying.value = false;
        }
    }
    showControls('video');
}; 
// 获取视频时长
const onLoadedMetadata = () => {
    if (!videoPlayer.value) return;
    if (videoPlayer.value.duration !== 0) {
        //emit('videoDuration', videoDuration.value);
        videoDuration.value = videoPlayer.value.duration;
    }
};
// 获取当前播放时间
const onTimeUpdate = () => {
    if (!videoPlayer.value) return;
    currentProgress.value = videoPlayer.value.currentTime;
    progressPercentage.value = (currentProgress.value / videoDuration.value);
    //emit('videocurRentTime', currentProgress.value);
};
// 播放结束
const onVideoEnded = () => {
    if (!videoPlayer.value) return;
    // 在这里执行你的逻辑，例如重置播放状态
    isPlaying.value = false;
    videoPlayer.value.currentTime = 0;
};
// 静音/解除静音
const toggleMute = (isMuted: boolean, originalVolume: number) => {
    if (!videoPlayer.value) return;
    if (isMuted) {
        volume.value = originalVolume;
        videoPlayer.value.muted = true;
    } else {
        volume.value = originalVolume;
        videoPlayer.value.muted = false;
    }
};
// 进入画中画
const togglePiP = async () => {
    if (!videoPlayer.value) return;
    if (videoPlayer.value && document.pictureInPictureEnabled) {
      if (isInPictureInPicture.value) {
        isInPictureInPicture.value = false;
        await document.exitPictureInPicture();
      } else {
        isInPictureInPicture.value = true;
        await videoPlayer.value.requestPictureInPicture();
      }
    }
}
// 切换全屏状态
const toggleFullscreen = () => {
    if (!videoPlayerRef.value) return;
    if (!isFullscreen.value) {
        enterFullscreen(videoPlayerRef.value);
    } else {
        exitFullscreen();
    }
};
// 改变当前播放进度
const changeCurrent = (currPer: number) => {
    if (!videoPlayer.value) return;
    videoPlayer.value.currentTime = currPer * videoDuration.value;
};
// 更新声音
const updateVolume = (updateVolume: number) => {
    if (!videoPlayer.value) return;
    // 限制音量范围0-1
    updateVolume = Math.max(0, updateVolume);
    updateVolume = Math.min(1, updateVolume);
    volume.value = updateVolume;
    videoPlayer.value.volume = updateVolume;
};
// 切换播放速度
const changeBackrate = (backrate: number) => {
    if (!videoPlayer.value) return;
    videoPlayer.value.playbackRate = backrate;
};
// 进入/退出网页样式全屏
const toggleWebFullscreen = () => {
    if (!isWebFullScreen.value) {
        isWebFullScreen.value = true;
        emit('changWebFullScreen', isWebFullScreen.value);
        document.body.style.overflow = 'hidden';
    } else {
        isWebFullScreen.value = false;
        emit('changWebFullScreen', isWebFullScreen.value);
        document.body.style.overflow = '';
    }
};
// 显示控制条
const showControls = (position: string) => {
    clearTimeout(inCtrlTimer);
    clearTimeout(inCtrlShowTimer);
    if (position === 'video') {
        controlsVisibility.value = true;
        controlsShowVisibility.value = true;
        isShowCursor.value = true;
        inCtrlTimer = setTimeout(() => {
            controlsVisibility.value = false;
            inCtrlShowTimer = setTimeout(() => {
                controlsShowVisibility.value = false;
                isShowCursor.value = false;
            }, 150);
        }, 3000); // 控制栏显示2秒后自动隐藏
    } else if (position === 'controls') {
        controlsVisibility.value = true;
        controlsShowVisibility.value = true;
        isShowCursor.value = true;
    }
};
// 隐藏控制条
const hideControls = () =>{
    clearTimeout(inCtrlTimer);
    clearTimeout(inCtrlShowTimer);
    controlsVisibility.value = false;
    inCtrlTimer = setTimeout(() => {
        controlsShowVisibility.value = false;
        isShowCursor.value = true;
    }, 150);
};
// 视频播放等待
const onWaiting = () => {
    if (buffer.value <= currentProgress.value) {
      isLoading.value = true;
    }
};
// 视频播放开始
const onPlaying = () => {
  if (isLoading.value) {
    isLoading.value = false;
  }
};
//  拖拽小播放器窗口
//  鼠标按下时
const fnDown = (e: MouseEvent) => {
  if (!minPlayerRef.value) return;
  const disX = e.clientX
  const disY = e.clientY
  const elementRect = minPlayerRef.value.getBoundingClientRect();
  const startX = window.innerWidth - elementRect.right; // 元素到窗口右边的距离
  const startY = window.innerHeight - elementRect.bottom;
  //鼠标移动时
  document.onmousemove = (e: MouseEvent) => {
    const x = e.clientX - disX
    const y = e.clientY - disY
    if (!minPlayerRef.value) return;
    minPlayerRight.value = startX - x;
    minPlayerBottom.value = startY - y;
  }
    //鼠标抬起 清除移动和鼠标抬起事件
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
  
};
// 打开/关闭弹幕
const changDisplayDanmu = (showDanmu: boolean) => {
    displayDanmu.value = showDanmu;
    // console.log(showDanmu);
};
// 退出全屏
const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // 兼容Firefox浏览器
        (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // 兼容Chrome, Safari 和 Opera 浏览器
        (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // 兼容IE/Edge 浏览器
        (document as any).msExitFullscreen();
    }
    isFullscreen.value = false;
};
// 进入全屏
const enterFullscreen = (element: HTMLDivElement) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { // 兼容Firefox浏览器
        (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) { // 兼容Chrome, Safari 和 Opera 浏览器
        (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { // 兼容IE/Edge 浏览器
        (element as any).msRequestFullscreen();
    }
    isFullscreen.value = true;
};
// 监听全屏状态变化
const handleFullscreenChange = () => {
    isFullscreen.value = document.fullscreenElement !== null;
    if (isWebFullScreen.value) {
      isWebFullScreen.value = false;
      emit('changWebFullScreen', false);
      document.body.style.overflow = '';
    }
    showControls('video');
};
// 监听画中画状态改变
const handlePiPChange = () => {
  isInPictureInPicture.value = document.pictureInPictureElement !== null;
};
// 监听键盘事件
const handleKeyboard = (event: KeyboardEvent) => {
  // 检查当前焦点元素
  const activeElement = document.activeElement as HTMLElement;
  const isInputField = ['INPUT', 'TEXTAREA'].includes(activeElement.tagName);

  if (isInputField) return;

  switch (event.key) {
    case ' ': // 空格键 播放
      event.preventDefault();
      togglePlayPause();
      break;
    case 'f': // F键 全屏
      toggleFullscreen();
      break;
    case 'd': // D键 弹幕
      displayDanmu.value = !displayDanmu.value;
      break;
    case 'm': // M键 静音
      if (volume.value !== 0){
        originalVolume.value = volume.value;
        toggleMute(true, 0);
      } else {
        toggleMute(false, originalVolume.value);
      }
      break;
    case 'ArrowRight': // →键 快进5秒
      event.preventDefault();
      videoPlayer.value!.currentTime += 5;
      break;
    case 'ArrowLeft': // ←键 回退5秒
      event.preventDefault();
      videoPlayer.value!.currentTime -= 5;
      break;
    case 'ArrowUp': // ↑键 音量+10
      event.preventDefault();
      updateVolume(volume.value + 0.1);
      break;
    case 'ArrowDown': // ↓键 音量-10
      event.preventDefault();
      updateVolume(volume.value - 0.1);
      break;
    default:
      break;
  }
};
const handleVolumeChangeWithWheel = (event: WheelEvent) => {
  if (isFullscreen.value || isWebFullScreen.value) {
    clearTimeout(volumeHintTimer);
    volumeHint.value = true;
    volumeHintTimer = setTimeout(() => {
      volumeHint.value = false;
    }, 3000);
  }
  // 滚轮事件处理
  if (event.deltaY < 0) {
    // 向上滚动，增加音量
    updateVolume(volume.value + 0.05);
  } else if (event.deltaY > 0) {
    // 向下滚动，减少音量
    updateVolume(volume.value - 0.05);
  }
};
// 监听视频缓url地址
watch(() => props.videoUrl, (newValue) => {
  if (props.useHls) {
    // 清理hls实例
    if (hls.value) {
      hls.value.off(Hls.Events.BUFFER_APPENDED, function () {});
      hls.value.destroy();
    }
    initHls(newValue);
  } else {
    videoPlayer.value!.src = newValue;
  }
});
// 监听全屏状态变化 监听滚轮从而音量
watch(() => isWebFullScreen.value || isFullscreen.value, (newValue) => {
  if (newValue) { 
    // 开始监听整个页面的滚轮事件
    document.addEventListener('wheel', handleVolumeChangeWithWheel, { passive: false });
  } else {
    // 停止监听整个页面的滚轮事件
    document.removeEventListener('wheel', handleVolumeChangeWithWheel);
  }
});
// HLS.js 配置
const hlsConfig = {
  maxBufferLength: 20,
  backBufferLength: 5,
  liveSyncDurationCount: 1,
  liveMaxLatencyDurationCount: 2,
  maxBufferSize: 20000000,
};
// 初始化HLS实例
const initHls = (m3u8Url: string) => {
  if (Hls.isSupported()) {
    if (videoPlayer.value) {
      hls.value = new Hls(hlsConfig);
      hls.value.loadSource(m3u8Url);
      hls.value.attachMedia(videoPlayer.value);
      hls.value.on(Hls.Events.MANIFEST_PARSED, function () {
        if (!videoPlayer.value) return;
        videoPlayer.value.muted = true;
        videoPlayer.value.play()
          .then(() => {
            // 成功播放后取消静音
            if (!videoPlayer.value) return;
            videoPlayer.value.muted = false;
            isPlaying.value = true;
            showControls('video');
          })
          .catch((error) => {
            // 捕获错误并处理
            console.error('Error starting playback:', error);
            if (error.name === 'NotAllowedError' || error.name === 'DOMException') {
              console.error('Playback was interrupted. Please try again after user interaction.');
            }
          });
        //videoPlayer.value.muted = false;
        // isPlaying.value = true;
        showControls('video');
        if (!hls.value) return;
        // 监听错误事件
        hls.value.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('fatal media error encountered, try to recover');
                if (!hls.value) return;
                hls.value.recoverMediaError();
                break;
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error('fatal network error encountered', data);
                break;
              default:
                // cannot recover
                if (!hls.value) return;
                hls.value.destroy();
                break;
            }
          }
        });
        // 监听缓冲区更新事件
        hls.value.on(Hls.Events.BUFFER_APPENDED, function () {
          if (!videoPlayer.value) return;
          const buffered = videoPlayer.value.buffered;
          // console.log(buffered.end(0));
          buffer.value = buffered.end(0);
        });
        // 监听视频播放时卡顿缓冲事件
        hls.value.on(Hls.Events.FRAG_LOADED, function (event, data) {
          // console.log(data);
          const totalBytes = data.frag.stats.loaded;
          const loadingDuration = data.frag.stats.loading.end - data.frag.stats.loading.start;
          //const mbps = calculateMbps(totalBytes, loadingDuration);
          mbPerSec.value = calculateMBps(totalBytes, loadingDuration);
          // //console.log(`Buffer speed: ${mbps.toFixed(2)} Mbps or ${mbPerSec.toFixed(2)} MB/s`);
        });
      })
    }
  }
};
const mbPerSec = ref(0);
const calculateMbps = (bytes: number, time: number): number => {
  return (bytes * 8) / time / 1000 / 1000;
};

const calculateMBps = (bytes: number, time: number): number => {
  return bytes / time / 1024 / 1024;
};
// 监听元素是否进入可视区域
if (process.client) {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 元素进入可视区域
          isShowMinPlayer.value = false;
        } else {
          // 元素离开可视区域
          if (!isInPictureInPicture.value) {
            isShowMinPlayer.value = true;
            if (!minPlayerRef.value) return;
            minPlayerRef.value.onmousedown = fnDown
          }
        }
      });
    }, { threshold: 0.5 });
}
onMounted(() => {
    if (!videoPlayer.value) return;
    videoPlayer.value.volume = volume.value;
    if (props.useHls) {
      initHls(props.videoUrl);
    } else {
      videoPlayer.value.src = props.videoUrl;
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('enterpictureinpicture', handlePiPChange);
    document.addEventListener('leavepictureinpicture', handlePiPChange);
    document.addEventListener('keydown', handleKeyboard);
    // 监听播放事件
    videoPlayer.value.addEventListener('play', () => {
      isPlaying.value = true;
    });

    // 监听暂停事件
    videoPlayer.value.addEventListener('pause', () => {
      isPlaying.value = false;
    });
    if (videoPlayerRef.value && observer.value) {
      observer.value.observe(videoPlayerRef.value);
    }
});
onUnmounted(() => {
  // 移除事件监听
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.removeEventListener('enterpictureinpicture', handlePiPChange);
    document.removeEventListener('leavepictureinpicture', handlePiPChange);
    document.removeEventListener('keydown', handleKeyboard);
    document.removeEventListener('wheel', handleVolumeChangeWithWheel);
    videoPlayer.value?.removeEventListener('play', () => {});
    videoPlayer.value?.removeEventListener('pause', () => {});

    if (hls.value) {
      hls.value.off(Hls.Events.BUFFER_APPENDED, function () {});
      hls.value.destroy();
    }
});
</script>
<style scoped lang="scss">
.player-wrap {
  position: relative;
  width: 100%;
  height: 100%;

  .player {
    position: relative;
    height: 100%;
    width: 100%;

    .player-primary-area {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      height: 100%;
      width: 100%;

      .player-video-area {
        -webkit-box-flex: 1;
        background-color: #000;
        -ms-flex: 1;
        flex: 1;
        overflow: hidden;
        position: relative;
        height: 100%;
        width: 100%;

        .player-video-perch {
          -webkit-box-flex: 0;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex: none;
          flex: none;
          height: 100%;
          justify-content: center;
          position: absolute;
          width: 100%;
          z-index: 0;

          .player-video-wrap {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            display: block;
            height: 100%;
            width: 100%;

            video {
              content-visibility: visible;
              display: block;
              height: 100%;
              margin: auto;
              width: 100%;
            }
          }
        }
        .player-video-poster {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          bottom: 0;
          pointer-events: none;
        }
        .show {
            animation: fadeIn 0.2s ease-in-out;
        }
        .hide {
            animation: fadeOut 0.2s ease-in-out;
        }

        .player-state-wrap {
          display: flex;
          position: absolute;
          z-index: 78;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          flex-direction: column;
          justify-content: center;
          .player-state-wrap-play {
            display: block;
            position: absolute;
            bottom: 68px;
            cursor: pointer;
            pointer-events: none;
            position: absolute;
            right: 34px;
            background: url(@/assets/img/player/state.svg);
            height: 64px;
            width: 64px;
          }
          .bpx-player-state-buff-icon {
            display: block;
            width: 32px;
            height: 32px;
            background-size: 100% 100%;
            background-position: 50%;
            background-repeat: no-repeat;
            background-image: url(@/assets/img/platform/cover_loading.webp);
            margin: 0 auto;

          }
          .bpx-player-state-buff-text {
            padding-top: 10px;
            display: block;
            font-size: 16px;
            color: #ffffff;
            //height: 18px;
            line-height: 18px;
            margin: 0 auto;
          }
          
        }
        .player-mini-warp {
          //bottom: 100px;
          cursor: move;
          position: fixed;
          //right: 100px;
          width: 320px;
          height: 180px;
          background-color: #000;
          z-index: 200;
          border-radius: 6px;
          display: none;
          overflow: hidden;
          .player-mini-close {
            fill: #ffffff;
            height: 20px;
            right: 8px;
            top: 8px;
            width: 20px;
            cursor: pointer;
            visibility: hidden;
            position: absolute;
            .player-mini-close-icon {
              width: 100%;
              height: 100%;
            }
          }
          .player-mini-state {
            height: 100px;
            left: 50%;
            margin: -50px 0 0 -50px;
            position: absolute;
            top: 50%;
            width: 100px;
            visibility: hidden;
            .player-mini-state-play {
              background: url(@/assets/img/player/play.svg);
              background-position: 50%;
              background-repeat: no-repeat;
              background-size: 80px 80px;
              bottom: 0;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              cursor: pointer;
            }
            .player-mini-state-pause {
              background: url(@/assets/img/player/pause.svg);
              background-position: 50%;
              background-repeat: no-repeat;
              background-size: 80px 80px;
              bottom: 0;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              cursor: pointer;
            }
          }
          .player-mini-progress {
            position: absolute;
            height: 2px;
            width: 100%;
            left: 0;
            bottom: 0;
          }
          &:hover {
            .player-mini-state, .player-mini-close {
              visibility: visible;
            }
          }
          // 用于小屏播放器 
          // dom传送后的css样式
          .player-video-wrap {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            display: block;
            height: 100%;
            width: 100%;

            video {
              content-visibility: visible;
              display: block;
              height: 100%;
              margin: auto;
              width: 100%;
            }
          }
        }
        .show-min-player {
          display: block;
        }
        .player-volume-hint {
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          background: hsla(0, 0%, 100%, .8);
          border-radius: 4px;
          color: #000;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          font-size: 20px;
          height: 32px;
          left: 50%;
          min-width: 84px;
          padding: 8px;
          position: absolute;
          top: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          z-index: 77;
          pointer-events: none;
          //opacity: 0;
          .player-volume-hint-icon {
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
            height: 34px;
            width: 34px;

          }
          .player-volume-hint-text {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            line-height: 34px;
            padding: 0 2px;
            text-align: center;
          }
        }

      }

      .player-video-area * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .web-full-screen {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 99999;
      }
    }
  }
}
// 全屏后的样式
// 使用scss定义一个混合来处理全屏样式
@mixin fullscreen-style() {
    .player-video-area:fullscreen {
      // 全屏模式下的样式
      @content;
    }
  
    // 兼容不同浏览器的前缀
    .player-video-area:-webkit-full-screen {
      @content;
    }
  
    .player-video-area:-moz-full-screen {
      @content;
    }
  
    .player-video-area:-ms-fullscreen {
      @content;
    }
    // 网页全屏样式
    .player-video-area-web-full {
      @content;
    }
}

@include fullscreen-style() {
    .player-state-wrap {
        .player-state-wrap-play {
            bottom: 100px !important;
        }
    }
    :deep(.player-controls) {
        height: 90px !important;
        .player-controls-bottom {
            height: 70px;
            .player-controls-left {
                .player-controls-icon {
                    width: 60px;
                    height: 24px;
                }
            .player-controls-play-time {
                height: 26px;
                .player-play-time {
                    line-height: 26px;
                    font-size: 14px;
                }
            }
            .player-controls-play-icon {
                width: 26px;
                height: 26px;
            }
            } 
            .player-controls-center {
                display: block;
            }
            .player-controls-right {
                padding-right: 22px;
                .player-controls-item {
                    height: 28px;
                    span {
                        line-height: 24px;
                        font-size: 16px;
                    }
                }
                .controls-text {
                    width: auto;
                    margin-right: 12px;
                    margin-left: 12px;
                }
                .controls-icon {
                    width: 50px;
                }
            }
        }
    }
    :deep(.player-cmd-dm-wrap) {
      @media (min-width: 1366.9px) {
        .hl-editor {
          height: 45px;
          .hl-guide-three {
            height: 45px;
            width: 177.5px;
            span {
              box-sizing: border-box;
              width: 56.25px;
              height: 45px;
              .hl-icon {
                width: 100%;
                height: 100%;
              }
            }
          }
          .hl-guide-follow {
            width: 82.5px;
            height: 30px;
          }
        }
        .hl-link {
          height: 62.5px;
          .hl-link-left {
            width: 290px;
            height: 62.5px;
            .hl-link-icon {
              width: 112.5px;
              height: 62.5px;
            }
            .hl-link-msg {
              width: 177.5px;
            }
          }
          .hl-link-line {
            width: 1.25px;
            height: 45px;
          }
          .hl-link-right {
            width: 56.25px;
            height: 62.5px;
            .hl-link-watchlater {
              .hl-link-watchlater-icon {
                  width: 25px;
                  height: 25px;
              }
            }
          }
        }
        .hl-vote {
          .hl-vote-question {
            width: 196.25px;
            height: 17.5px;
            line-height: 17.5px;
            font-size: 13px;
          }
          .hl-vote-an {
            width: 196.25px;
            height: 32.5px;
            .hl-vote-an-bg {
                .hl-vote-an-bg-buffer {
                    width: 32.5px;
                }
            }
            .hl-vote-an-text {
                height: 32.5px;
                line-height: 32.5px;
                font-size: 13px;
                .hl-vote-an-text-index {
                    width: 13.5px;
                }
                .hl-vote-an-text-doc {
                    width: 120px;
                }
            }
          }
        }
      }
    }
    .player-volume-hint-show {
      opacity: 1;
    }
}

// 淡入动画
@keyframes fadeIn {
  from {
    opacity: 0;
    //transform: translateY(10px);
  }
  to {
    opacity: 1;
    //transform: translateY(0);
  }
}
// 淡出动画
@keyframes fadeOut {
  from {
    opacity: 1;
    //transform: translateY(0);
  }
  to {
    opacity: 0;
    //transform: translateY(10px);
  }
}
</style>