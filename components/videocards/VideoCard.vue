<template>
    <div class="video-card_warp" ref="videoCardContainer">
        <!-- 骨架屏 -->
         <div class="video-card-loading_warp" :style="isImgDownLoad ? '' : 'display: none'">
            <div class="video-card-skeleton-cover"></div>
            <div class="video-card-skeleton-info">
                <div class="video-card-skeleton-item top"></div>
                <div class="video-card-skeleton-item bottom"></div>
                <div class="video-card-skeleton-item user"></div>
            </div>
         </div>
         <!-- 视频卡片主体 -->
        <div class="video-card_link">
            <NuxtLink to="/test1" target="_blank" class="video-card-box" 
            @mouseover="handleMouseOver" 
            @mouseout="handleMouseOut">
                <div class="video-cover_warp">
                    <img :src="imageUrl" alt="封面" ref="videoCardImg"/>
                </div>
                <div class="v-inline-player" :style="isPlayer ? '' : 'display: none;'" :class="isPlayer ? 'v-show' : 'v-hide'">
                    <div class="player-video-wrap">
                        <video ref="videoPlayer"
                        loop muted
                        @loadedmetadata="onLoadedMetadata"
                        @timeupdate="onTimeUpdate">
                        </video>
                        </div>
                    </div>
                <div class="video-card-mask">
                    <div class="video-card_stats" :style="isPlayer ? 'display: none;' : ''">
                        <div class="play-danmu_warp">
                            <div class="play-number">
                                <IconsVideocardBoFangliang class="icon"/>
                                <span>4.2万</span>
                            </div>
                            <div class="danmu-number">
                                <IconsVideocardDanMuliang  class="icon"/>
                                <span>800</span> 
                            </div>  
                        </div>
                        <div class="video-duration_warp">
                            <span>4:12</span>
                        </div>
                    </div>
                    <div class="video-card_progress" :style="isPlayer ? '' : 'display: none;'">
                        <div class="video-progress">
                            <span>{{ formattedCurrentTime }}</span>
                            <span>/</span>
                            <span>{{ formattedTotalTime }}</span>
                        </div>
                    </div>
                </div>
                <div class="video-card-watch-later_wrap" :style="isPlayer ? '' : 'display: none;'" :class="isPlayer ? 'v-show' : 'v-hide'">
                    <div class="video-card-watch-later" @click="handleWatchLater">
                        <IconsVideocardSeeLater  class="watch-later-icon"/>
                        <span>添加至稍后再看</span>
                    </div>
                </div>
            </NuxtLink>
            <!-- 视频卡片底部信息 -->
            <div class="video-info_warp">
                <NuxtLink to="/test1" target="_blank">
                    <span class="video-title">这是一个测试视频，欢迎走进哈喽哈喽弹幕网站</span>
                </NuxtLink>
                <NuxtLink to="" target="_blank" class="author_warp">
                    <div class="video-author-icon" v-if="true">
                        <IconsVideocardUp />
                    </div>
                    <div class="video-author-icon-text" v-else>已关注</div>
                    <div class="user-date_warp">
                        <span class="user">admin</span>
                        <span> · </span>
                        <span>4-26</span>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"> 
import Hls from 'hls.js';
import { formatTime } from '@/utils/formatTime';
// https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/672w_373h_1c-web-home-common-cover.avif
const imageUrl = 'https://static.v.hblog.top/images/cover/199d1b8b1d5cb6cbc431c342a374ba16/199d1b8b1d5cb6cbc431c342a374ba16@16x9.webp';
const vieoUrl = 'https://static.v.hblog.top/test/test.m3u8'
const isImgDownLoad = ref(true);
const hls = ref<Hls | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);
let inTimer: ReturnType<typeof setTimeout>; // 节流计时器
const videoDuration = ref(0);
const formattedCurrentTime = ref('00:00');
const formattedTotalTime = ref('00:00');
const isPlayer = ref(false);
const isLoadedVideo = ref(false);
// 鼠标移入
const handleMouseOver = () => {
    // console.log('鼠标移入');
    if (isLoadedVideo.value) {
        clearTimeout(inTimer);
        inTimer = setTimeout(() => {
            isPlayer.value = true;
            videoPlayer.value?.play();
        }, 1000);
    }
    
}
// 鼠标移出
const handleMouseOut = () => {
    // console.log('鼠标移出');
    clearTimeout(inTimer);
    inTimer = setTimeout(() => {
        isPlayer.value = false;
        videoPlayer.value?.pause();
    }, 200);
}
// 准备视频HLS实例
const initPlayer = () => {
    if (!videoPlayer.value) return;
    if (Hls.isSupported()) {
        hls.value = new Hls();
        hls.value.loadSource(vieoUrl);
        hls.value.attachMedia(videoPlayer.value);
        hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
            isLoadedVideo.value = true; // 视频加载完成
        });
    }
}
// 获取当前播放时间
const onTimeUpdate = () => {
    if (!videoPlayer.value) return;
    formattedCurrentTime.value = formatTime(videoPlayer.value.currentTime)
};
// 获取视频时长
const onLoadedMetadata = () => {
    if (!videoPlayer.value) return; 
        videoDuration.value = videoPlayer.value.duration;
        formattedTotalTime.value = formatTime(videoDuration.value);
};

// 稍后观看
const handleWatchLater = (event: Event) => {
    event.preventDefault();
    console.log('稍后观看');
}
onMounted(async () => {
    await loadImage(imageUrl, () => {
        isImgDownLoad.value = false; // 所有图片加载成功后隐藏骨架屏
        initPlayer();
        // console.log('所有图片加载完成');
    }, (error) => {
        console.error('图片加载失败:', error.message);
    });
    
});
onUnmounted(() => {
    // 销毁hls实例
    if (hls.value) {
        hls.value.destroy();
    }
});

</script>
<style scoped lang="scss">
.video-card_warp {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
}
.video-card-loading_warp {
    width: 100%;
    height: auto;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: #ffffff;

    .video-card-skeleton-cover {
        position: relative;
        width: auto; 
        // min-height:148px; 
        height: 0; 
        // max-height: 170px; 
        border-radius: 6px; 
        display: block;
        padding-top: 56.25%; /* 16:9 = 9 / 16 * 100% = 56.25% */
        overflow: hidden;
        background: linear-gradient(
            100deg, 
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 60%
        ) #f0f2f5;
        background-size: 200% 100%;
        background-position-x: 120%;
        animation: loading 1.4s ease-in-out infinite;
    }
    .video-card-skeleton-cover::before {
        content: "";
        display: block;
    }

    .video-card-skeleton-cover > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        object-fit: cover; /* 内容会被缩放或裁剪以填充整个容器 */
    }
    .video-card-skeleton-info {
        padding-top: 8px; 
        height: 76px;
        box-sizing: border-box;
        .video-card-skeleton-item {
            box-sizing: border-box;
            margin-top: 4px;
            margin-bottom: 4px;
            border-radius: 4px;
            background: linear-gradient(
            80deg, 
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 60%
            ) #f0f2f5;
            background-size: 200% 100%;
            background-position-x: 100%;
            animation: loading 1.4s ease-in-out infinite;

        }
        .top {
            width: 98%;
            height: 18px;
        }
        .bottom {
            width: 60%;
            height: 18px;
        }
        .user {
            width: 50%; 
            height: 16px; 
            margin-top: 2px;
        }
    }

}
.video-card_link {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    .video-card-box {
        width: 100%;
        height: auto;
        position: relative;
        overflow: hidden;
        display: block;
        text-decoration: none;
        background: #f1f2f3;
        border-radius: 6px;
        .video-cover_warp {
            position: relative;
            width: 100%; /* 或者指定一个具体的宽度 */
            height: 0; /* 高度设为0，通过padding-top来控制比例 */
            padding-top: 56.25%; /* 16:9比例，9 / 16 * 100% = 56.25% */
            overflow: hidden;
        }

        .v-inline-player {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 1;
            transition: all .5s linear .5s;
            .player-video-wrap {
                width: 100%;
                height: 100%;
                video {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .v-show {
                animation: fadeIn .5s ease-in-out; 
        }
        .v-hide {
                animation: fadeOut .5s ease-in-out; 
        }

        .video-card-mask {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            .video-card_stats {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 24%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 100%);
                opacity: 1;
                transition: all .5s linear .5s;
                .play-danmu_warp {
                    padding-left: 10px; 
                    color: #ffffff; 
                    font-size: 13px; 
                    align-items: center;
                    display: flex;
                    height: 16px;
                    cursor: pointer;
                    padding: 0 10px;
                    .play-number {
                        display: flex;
                        align-items: center;
                        margin-right: 16px;
                        .icon {
                            width: 18px;
                            height: 18px;
                        }
                        span {
                            margin-left: 2px;
                        }

                    }
                    .danmu-number {
                        display: flex;
                        align-items: center;
                        .icon {
                            width: 18px;
                            height: 18px;
                        }
                        span {
                            margin-left: 2px;
                        }
                    }
                }
                .video-duration_warp {
                    padding-left: 10px; 
                    color: #ffffff; 
                    font-size: 13px; 
                    align-items: center;
                    display: flex;
                    height: 16px;
                    cursor: pointer;
                    padding: 0 10px;

                }
            }
            .video-card_progress {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 24%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                opacity: 1;
                transition: all .5s linear .5s;
                .video-progress {
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    span {
                        color: #ffffff; 
                        font-size: 13px; 
                    }
                }
                
            }
        }

        .video-card-watch-later_wrap {
            position: absolute;
            height: 28px;
            display: flex;
            top: 8px;
            right: 8px;
            fill: #ffffff;
            color: #ffffff;
            font-size: 14px;
            .video-card-watch-later {
                height: 28px;
                display: flex;
                align-items: center;
                padding: 0 3px;
                cursor: pointer;
                background-color: rgba(33, 33, 33, .8);
                border-radius: 6px;
                position: relative; /* 添加相对定位 */
                overflow: hidden; /* 隐藏超出部分 */
                width: 22px;
                transition: width 1s ease; /* 添加宽度过渡效果 */
                .watch-later-icon {
                    position: absolute;
                    left: 3px;
                    width: 22px;
                    height: 22px;
                }
                span {
                    display: inline-block; /* 修改为inline-block以便于定位 */
                    margin-left: 2px;
                    margin-right: 2px;
                    white-space: nowrap; /* 防止文字换行 */
                    transition: transform 1s ease; /* 添加文字位置过渡效果 */
                    transform: translateX(100%); /* 初始时文字位于容器之外 */
                }

                &:hover {
                    width: 128px;
                    span {
                        transform: translateX(24%); /* 鼠标悬停时文字滑入 */
                    }
                }
            }

        }

        .video-cover_warp::before {
            content: "";
            display: block;
        }

        .video-cover_warp > img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            min-height:148px; 
            max-height: 170px;
            object-fit: cover; /* 内容会被缩放或裁剪以填充整个容器 */
            cursor: pointer;
        }
    }
    .video-info_warp {
        box-sizing: border-box;
        height: 76px;
        padding-top: 8px;
        a {
            text-decoration: none;
        }
        .video-title {
            height: 44px;
            color: #18191c;
            padding-right: 14px;
            font-size: 15px;
            line-height: 22px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-weight: 500;
            cursor: pointer;
            &:hover {
                color: $theme-color;
            }
            
        }
        .author_warp {
            align-items: center;
            justify-content: left;
            font-size: 13px;
            color: $item-color;
            fill: $item-color;
            margin-top: 4px;
            cursor: pointer;
            text-decoration: none;
            display: flex;   
            .video-author-icon {
                display: inline-block;
                width: 17px;
                height: 17px;
            }
            .video-author-icon-text {
                flex-shrink: 0;
                display: inline-block;
                color: #ff7f24;
                background-color: #fff0e3;
                border-radius: 4px;
                margin-right: 4px;
                font-size: 12px;
                line-height: 17px;
                height: 17px;
                padding: 0 4px;
                cursor: default;
            }
            .user-date_warp {
                margin-left: 2px;
                display: inline-block;
                vertical-align: 4px;         
            }   
            &:hover {
                color: $theme-color;
                fill: $theme-color;
            } 

        }
    }
}
// 骨架屏动画
@keyframes loading {
    to{
        background-position-x: -20%;
    }
}
// 淡入透明度动画
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
// 淡出透明度动画
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>