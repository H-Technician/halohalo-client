<template>
    <div class="player-ctrl-seting_warp">
        <div class="player-ctrl-seting-area">
            <div class="player-ctrl-seting-menu-left"  :style="isSettingMore ? 'display: none;' : ''">
                <div class="player-ctrl-seting-menu-left-item">
                    <span>镜像画面</span>
                    <el-switch class="switch" v-model="value" size="small"/>
                </div>
                <div class="player-ctrl-seting-menu-left-item">
                    <span>洗脑循环</span>
                    <el-switch class="switch" v-model="value" size="small"/>
                </div>
                <div class="player-ctrl-seting-menu-left-item">
                    <span>自动开播</span>
                    <el-switch class="switch" v-model="value" size="small"/>
                </div>
                <div class="player-ctrl-seting-menu-left-item" @click="settingMore">
                    <span>更多播放设置</span>
                    <el-icon><ElIconArrowRightBold /></el-icon>
                </div>
            </div>
            <div class="player-ctrl-seting-menu-right"
            :class="isSettingMore ? 'player-ctrl-seting-more-area' : ''">
                <div class="player-ctrl-seting-menu-right-area" :style="isSettingMore ? 'display: block;' : 'display: none;'">
                    <div class="player-ctrl-setting-handoff">
                        <div class="player-ctrl-setting-handoff-title">播放方式</div>
                        <div class="player-ctrl-setting-handoff-conent">
                            <div class="bui-radio-wrap-button">
                                <div class="radio-button active">
                                    <span>自动切集</span>
                                </div>
                                <div class="radio-button">
                                    <span>播完暂停</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="player-ctrl-setting-aspect">
                        <div class="player-ctrl-setting-aspect-title">视频比例</div>
                        <div class="player-ctrl-setting-aspect-conent">
                            <div class="bui-radio-wrap-button">
                                <div class="radio-button active">
                                    <span>自动</span>
                                </div>
                                <div class="radio-button">
                                    <span>4:3</span>
                                </div>
                                <div class="radio-button">
                                    <span>16:9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="player-ctrl-setting-codec">
                        <div class="player-ctrl-setting-codec-title">播放策略</div>
                        <div class="player-ctrl-setting-codec-conent">
                            <div class="bui-radio-wrap-button">
                                <div class="radio-button active">
                                    <span>默认</span>
                                </div>
                                <div class="radio-button">
                                    <span>AV1</span>
                                </div>
                                <div class="radio-button">
                                    <span>HEVC</span>
                                </div>
                                <div class="radio-button">
                                    <span>AVC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const value = ref(true);
const isSettingMore = ref(false);
const props = defineProps({
    isShowSettingMorePanel: {
        type: Boolean,
        default: false
    }
})
const settingMore = () => {
    console.log('more');
    isSettingMore.value = !isSettingMore.value;
}
watch(() => props.isShowSettingMorePanel, (newVal) => {
    if (!newVal) {
        isSettingMore.value = newVal;
    }
})
</script>
<style scoped lang="scss">
.player-ctrl-seting_warp {
    height: 148px;
    width: 130px;
    box-sizing: border-box;
    border-radius: 2px;
    .player-ctrl-seting-area {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        .player-ctrl-seting-menu-left {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 10px 0;
            box-sizing: border-box;
            position: relative;
            z-index: 1;
            .player-ctrl-seting-menu-left-item {
                height: 32px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ffffff;
                font-size: 12px;
                line-height: 32px;
                cursor: pointer;
                &:hover {
                    color: $theme-color;
                }

                .switch {
                    margin-left: 10px;
                    --el-switch-on-color: #00aeec;
                }

            }
            
        }
        .player-ctrl-seting-menu-right {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 148px;
            width: 130px;
            background: hsla(0, 0%, 8%, .9);
            border-radius: 2px;
            z-index: 0;
            overflow: hidden;
            .player-ctrl-seting-menu-right-area {
                position: absolute;
                top: 0;
                left: 0;
                width: 240px;
                height: 276px;
                padding: 20px;
                box-sizing: border-box;
                .player-ctrl-setting-handoff {
                    width: 100%;
                    color: #ffffff;
                    margin-bottom: 8px;
                    .player-ctrl-setting-handoff-title {
                        height: 16px;
                        line-height: 16px;
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                    .player-ctrl-setting-handoff-conent {
                        height: 20px;
                        width: 100%;
                        .bui-radio-wrap-button {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .radio-button {
                                height: 20px;
                                width: 90px;
                                border-radius: 2px;
                                line-height: 20px;
                                color: #ffffff;
                                display: flex;
                                justify-content: center;
                                cursor: pointer;
                                background: rgba(255, 255, 255, 0.1);
                                span {
                                    font-size: 12px;
                                }
                                &.active {
                                    background: $theme-color;
                                }

                            }
                        }
                    }


                }
                .player-ctrl-setting-aspect {
                    width: 100%;
                    color: #ffffff;
                    margin-bottom: 8px;
                    .player-ctrl-setting-aspect-title {
                        height: 16px;
                        line-height: 16px;
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                    .player-ctrl-setting-aspect-conent {
                        height: 20px;
                        width: 100%;
                        .bui-radio-wrap-button {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .radio-button {
                                height: 20px;
                                width: 60px;
                                border-radius: 2px;
                                line-height: 20px;
                                color: #ffffff;
                                display: flex;
                                justify-content: center;
                                cursor: pointer;
                                background: rgba(255, 255, 255, 0.1);
                                span {
                                    font-size: 12px;
                                }
                                &.active {
                                    background: $theme-color;
                                }

                            }
                        }
                    }


                }
                .player-ctrl-setting-codec {
                    width: 100%;
                    color: #ffffff;
                    margin-bottom: 8px;
                    .player-ctrl-setting-codec-title {
                        height: 16px;
                        line-height: 16px;
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                    .player-ctrl-setting-codec-conent {
                        height: 20px;
                        width: 100%;
                        .bui-radio-wrap-button {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .radio-button {
                                height: 20px;
                                width: 45px;
                                border-radius: 2px;
                                line-height: 20px;
                                color: #ffffff;
                                display: flex;
                                justify-content: center;
                                cursor: pointer;
                                background: rgba(255, 255, 255, 0.1);
                                span {
                                    font-size: 12px;
                                }
                                &.active {
                                    background: $theme-color;
                                }

                            }
                        }
                    }


                }

            }
        }
        .player-ctrl-seting-more-area {
            //animation: expandHeight .5s forwards, expandWidth .5s forwards;
            animation: expandWidth .5s forwards;
            height: 188px;
        } 
    }
  
}

// 宽度放大
@keyframes expandWidth {
  0% {
    width: 130px;
  }
  100% {
    width: 240px;
  }
}
</style>