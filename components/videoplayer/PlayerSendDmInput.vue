<template>
    <div class="player-controls-danmu-wrap">
        <div class="player-controls-danmu-left" 
        :style="props.position === 'sendBar' ? 
        'fill: #757575;' : 'fill: #ffffff;'">
            <Tooltip :overlayStyle="{ marginBottom: props.isFullscreen ? '30px' : '16px' }">
                <template #tooltip>{{ showDanmu ? '关闭弹幕(d)' : '开启弹幕(d)' }}</template>
                <div class="player-controls-danmu-switch"
                :class="props.position === 'sendBar' ? 'player-controls-danmu-icon-hover' : ''"
                :style="props.position === 'sendBar' ? 'height: 26px; width: 26px;' : 'hheight: 28px; width: 28px;'">
                    <input type="checkbox" class="bui-danmaku-switch-input" 
                    v-model="showDanmu">
                    <span class="player-danmaku-switch-on" 
                    :style="showDanmu ? '' : 'display: none;'">
                        <IconsPlayDanmakuSwitchOn class="icon"/>
                    </span>
                    <span class="player-danmaku-switch-off"
                    :style="showDanmu ? 'display: none;' : ''">
                        <IconsPlayDanmakuSwitchOff class="icon"/>
                    </span>
                </div>
            </Tooltip>
            <VideoplayerPanel 
            @isShowPanel="isShowPanel"
            :panelStyle="props.position === 'sendBar' ? 
            'padding-bottom: 24px;' : 
            'padding-bottom: 40px;'" 
            v-if="showDanmu">
                <template #reference>
                    <div class="player-controls-danmu-setting"
                    :class="props.position === 'sendBar' ? 'player-controls-danmu-icon-hover' : ''" 
                    :style="props.position === 'sendBar' ? 'height: 26px; width: 26px;' : 'hheight: 28px; width: 28px;'">
                        <span class="player-danmaku-setting">
                            <IconsPlayDanmakuSetting class="icon"/>
                        </span>
                    </div>
                </template>
                <template #content>
                    <VideoplayerDanmubarDanMuSetting v-if="isShowSettingPanel" />
                </template>
            </VideoplayerPanel>
            <div class="player-controls-danmu-setting" 
            :class="showDanmu ? '' : 'disabled'"
            :style="props.position === 'sendBar' ? 'height: 26px; width: 26px;' : 'hheight: 28px; width: 28px;'"
            v-else>
                <span class="player-danmaku-setting">
                    <IconsPlayDanmakuSetting class="icon"/>
                </span>
            </div>
        </div>
        <div class="player-controls-danmu-right" 
        :class="props.position === 'sendBar' ? '' : 'player-controls-danmu-right-fullscreen'">
            <div class="player-controls-danmu-input-warp">
                <div class="player-controls-danmu-input-box" 
                :style="props.position === 'sendBar' ? 
                'fill: #757575; color: #757575;' : 
                'fill: #ffffff; color: #ffffff; height: 34px;'">
                    <VideoplayerPanel
                    :panelStyle="props.position === 'sendBar' ? 
                    'padding-bottom: 24px;' : 
                    'padding-bottom: 40px;'"
                     v-if="showDanmu">
                    <template #reference>
                        <div class="player-controls-danmu-input-setting">
                            <IconsPlayDanmakuTextSetting class="icon"/>
                        </div>
                    </template>
                    <template #content>
                        <VideoplayerDanmubarSelectionPanel />
                    </template>
                    </VideoplayerPanel>
                    <div class="player-controls-danmu-input">
                        <input type="text" 
                        class="player-controls-danmu-input-text" 
                        placeholder="发个友善的弹幕见证当下"
                        :class="props.position === 'sendBar' ? 
                        'player-controls-danmu' : ''"
                        :style="props.position === 'sendBar' ? 
                        'color: #757575' : 
                        'color: #ffffff'"
                        v-if="showDanmu"></input>
                        <div class="player-controls-danmu-disabled-text" v-else>
                            已关闭弹幕
                        </div>
                    </div>
                    <div class="player-controls-danmu-send-btn"
                    :class="showDanmu ? '' : 'disabled'">
                        <span>发送</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const showDanmu = ref(true);
const isShowSettingPanel = ref(false);
const props = defineProps({
    position: {
        type: String,
        default: 'sendBar' // 表示弹幕发送输入框的放置位置，sendBar, controls
    },
    isFullscreen: {
        type: Boolean,
        default: false
    }

});
const isShowPanel = (value: boolean) => {
    isShowSettingPanel.value = value;
}
</script>
<style lang="scss" scoped>
.player-controls-danmu-wrap {
    display: flex;
    height: 100%;
    flex: 1;
    margin: 0 0 0 20px;
    .player-controls-danmu-left {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .player-controls-danmu-switch {
            display: block;
            margin-right: 12px;
            position: relative;
            height: 100%;
            .bui-danmaku-switch-input {
                position: absolute;
                z-index: 1;
                margin: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;
                
            }
            input[type="checkbox"] {
                -webkit-appearance: none; /* 移除默认样式 */
                appearance: none;
            }
            .player-danmaku-switch-on {
                display: block;
                width: 100%;
                height: 100%;
                .icon {
                    width: 100%;
                    height: 100%;
                }
            }
            .player-danmaku-switch-off {
                display: block;
                width: 100%;
                height: 100%;
                .icon {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .player-controls-danmu-setting {
            display: block;
            cursor: pointer;
            .player-danmaku-setting {
                display: block;
                width: 100%;
                height: 100%;
                .icon {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .disabled {
            pointer-events: none; /* 禁止鼠标事件 */
            opacity: 0.6;        /* 减淡颜色，表明禁用状态 */
            user-select: none;
        }

        .player-controls-danmu-icon-hover {
            &:hover {
                fill: $theme-color;
            }

        }

    }
    .player-controls-danmu-right {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 20px;
        flex: 1;
        .player-controls-danmu-input-warp {
            max-width: 540px;
            min-width: 150px;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            .player-controls-danmu-input-box {
                height: 32px;
                box-sizing: border-box;
                border-radius: 8px;
                background: rgba(225, 225, 225, 0.4);
                display: flex;
                justify-content: space-between;
                flex: 1;
                align-items: center;

                .player-controls-danmu-input-setting {
                    width: 32px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 4px;
                    cursor: pointer;
                    .icon {
                        width: 22px;
                        height: 22px;
                        &:hover {
                            fill: $theme-color;
                        }
                    }
                }
                .player-controls-danmu-input {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .player-controls-danmu-input-text {
                        height: 20px;
                        border: none;
                        outline: none;
                        margin: 0;
                        padding-left: 4px;
                        font-size: 12px;
                        font-family: "HarmonyOS_Sans_SC_Medium";
                        background-color: transparent;
                        max-width: 450px;
                        min-width: 100px;
                        flex: 1;
                        &::placeholder {
                            color: #ffffff;
                        }
                        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                            color: #ffffff;
                        }
                        &::-ms-input-placeholder { /* Microsoft Edge */
                            color: #ffffff;
                        }
                    }
                    .player-controls-danmu {
                        &::placeholder {
                            color: #757575;
                        }
                        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                            color: #757575;
                        }
                        &::-ms-input-placeholder { /* Microsoft Edge */
                            color: #757575;
                        }
                    }
                    .player-controls-danmu-disabled-text {
                        height: 20px;
                        outline: none;
                        margin: 0;
                        padding-left: 10px;
                        font-size: 12px;
                        background-color: transparent;
                        flex: 1;
                        display: flex;
                        align-items: center;
                    }
                    
                }
                .player-controls-danmu-send-btn {
                    width: 60px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #ffffff;
                    font-size: 14px;
                    background: $theme-color;
                    border-radius: 0 8px 8px 0;
                    cursor: pointer;
                }
                .disabled {
                    //pointer-events: none; /* 禁止鼠标事件 */
                    opacity: 0.6;        /* 减淡颜色，表明禁用状态 */
                    user-select: none;
                    color: #999;
                    background: #e7e7e7;
                    cursor: not-allowed;
                }
            }

        }
    }
    .player-controls-danmu-disabled {
        pointer-events: none; /* 禁止鼠标事件 */
        opacity: 0.6;        /* 减淡颜色，表明禁用状态 */
        user-select: none;   /* 禁止文本选择 */
    }
}
@media (max-width: 900px) {
  .player-controls-danmu-wrap .player-controls-danmu-right-fullscreen  {
        display: none;
    }
}
</style>