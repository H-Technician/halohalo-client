<template>
    <div class="player-dm-setting-wrap">
        <div class="player-dm-setting-left">
            <div class="player-dm-setting-left-block">
                <div class="player-dm-setting-left-block-title">按类型屏蔽</div>
                <div class="player-dm-setting-left-block-conent">
                    <div class="player-block-filter-type 
                    player-block-typeScroll"
                    :class="isSelectedScroll ? 
                    'player-block-filter-type-selected' :
                     ''"
                    @click="clickDisableScroll">
                        <span class="player-block-filter-image">
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedScroll ? 'display: none;' : ''" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM11 9h6a1 1 0 0 1 0 2h-6a1 1 0 0 1 0-2zm-3 2H6V9h2v2zm4 4h-2v-2h2v2zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedScroll ? '' : 'display: none;'" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M23 15c1.487 0 2.866.464 4 1.255V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h11.674A7 7 0 0 1 23 15zM11 9h6a1 1 0 0 1 0 2h-6a1 1 0 0 1 0-2zm-3 2H6V9h2v2zm4 4h-2v-2h2v2zm2-1a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1z"></path>
                                <path d="M26.536 18.464a5 5 0 0 0-7.071 0 5 5 0 0 0 0 7.071 5 5 0 1 0 7.071-7.071zm-5.657 5.657a3 3 0 0 1-.586-3.415l4.001 4.001a3 3 0 0 1-3.415-.586zm4.829-.827-4.001-4.001a3.002 3.002 0 0 1 4.001 4.001z"></path>
                            </svg>
                        </span>
                        <span class="player-block-filter-label">滚动</span>
                    </div>
                    <div class="player-block-filter-type 
                    player-block-typeTop"
                    :class="isSelectedTop ? 
                    'player-block-filter-type-selected' :
                     ''"
                    @click="clickDisableTop">
                        <span class="player-block-filter-image">
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedTop ? 'display: none;' : ''"style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM9 9H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedTop ? '' : 'display: none;'" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M23 15c1.487 0 2.866.464 4 1.255V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h11.674A7 7 0 0 1 23 15zm-4-8h2v2h-2V7zM9 9H7V7h2v2zm4 0h-2V7h2v2zm2-2h2v2h-2V7z"></path>
                                <path d="M26.536 18.464a5 5 0 0 0-7.071 0 5 5 0 0 0 0 7.071 5 5 0 1 0 7.071-7.071zm-5.657 5.657a3 3 0 0 1-.586-3.415l4.001 4.001a3 3 0 0 1-3.415-.586zm4.829-.827-4.001-4.001a3.002 3.002 0 0 1 4.001 4.001z"></path>
                            </svg>
                        </span>
                        <span class="player-block-filter-label">顶部</span>    
                    </div>
                    <div class="player-block-filter-type 
                    player-block-typeBottom"
                    :class="isSelectedBottom ? 
                    'player-block-filter-type-selected' :
                     ''"
                    @click="clickDisableBottom">
                        <span class="player-block-filter-image">
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedBottom ? 'display: none;' : ''" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM9 21H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedBottom ? '' : 'display: none;'" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M23 15c1.487 0 2.866.464 4 1.255V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h11.674A7 7 0 0 1 23 15zM9 21H7v-2h2v2zm4 0h-2v-2h2v2z"></path>
                                <path d="M26.536 18.464a5 5 0 0 0-7.071 0 5 5 0 0 0 0 7.071 5 5 0 1 0 7.071-7.071zm-5.657 5.657a3 3 0 0 1-.586-3.415l4.001 4.001a3 3 0 0 1-3.415-.586zm4.829-.827-4.001-4.001a3.002 3.002 0 0 1 4.001 4.001z"></path>
                            </svg>
                        </span>
                        <span class="player-block-filter-label">底部</span>
                    </div>
                    <div class="player-block-filter-type 
                    player-block-typeColor"
                    :class="isSelectedColor ? 
                    'player-block-filter-type-selected' :
                     ''"
                    @click="clickDisableColor">
                        <span class="player-block-filter-image">
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedColor ? 'display: none;' : ''" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M17.365 11.118c0-.612-.535-1.147-1.147-1.147s-1.147.535-1.147 1.147c0 .611.535 1.147 1.147 1.147s1.147-.536 1.147-1.147zM12.93 9.665c-.764 0-1.376.611-1.376 1.3 0 .689.612 1.301 1.376 1.301s1.376-.612 1.376-1.301-.612-1.3-1.376-1.3zM9.794 11.883c-.764 0-1.376.612-1.376 1.3 0 .689.612 1.3 1.376 1.3s1.376-.611 1.376-1.3c.001-.688-.611-1.3-1.376-1.3zM10.023 15.171c-.612 0-1.147.536-1.147 1.148 0 .611.535 1.146 1.147 1.146s1.147-.535 1.147-1.146c.001-.612-.535-1.148-1.147-1.148zM17.823 12.953c-.611 0-1.147.535-1.147 1.147s.536 1.147 1.147 1.147c.612 0 1.148-.535 1.148-1.147s-.536-1.147-1.148-1.147z"></path>
                                <path d="M23.177 3H4.824C2.683 3 1 4.833 1 7.167v13.665C1 23.167 2.683 25 4.824 25h18.353C25.318 25 27 23.167 27 20.833V7.167C27 4.833 25.318 3 23.177 3zm-3.442 13.624c-1.987.612-4.129-.154-5.046.764-.918.918 1.529 1.606 0 2.219-1.988.84-7.341-.535-8.182-4.053-.841-3.441 2.905-6.5 5.888-7.035 2.906-.535 6.041.841 8.181 2.982 2.065 2.141.765 4.74-.841 5.123z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" :style="isSelectedColor ? '' : 'display: none;'" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                                <path d="M17.823 15.247c.612 0 1.148-.535 1.148-1.147s-.536-1.147-1.148-1.147c-.611 0-1.147.535-1.147 1.147s.536 1.147 1.147 1.147zM17.365 11.118c0-.612-.535-1.147-1.147-1.147s-1.147.535-1.147 1.147c0 .611.535 1.147 1.147 1.147s1.147-.536 1.147-1.147z"></path>
                                <path d="M18.235 16.872c-1.483.086-2.859-.172-3.546.516-.918.918 1.529 1.606 0 2.219-1.988.84-7.341-.535-8.182-4.053-.841-3.441 2.905-6.5 5.888-7.035 2.906-.535 6.041.841 8.181 2.982 1.208 1.253 1.265 2.663.782 3.694A6.938 6.938 0 0 1 23 15c1.487 0 2.866.464 4 1.255V7.167C27 4.833 25.318 3 23.177 3H4.824C2.683 3 1 4.833 1 7.167v13.665C1 23.167 2.683 25 4.824 25h11.85A6.97 6.97 0 0 1 16 22c0-2.025.86-3.85 2.235-5.128z"></path>
                                <path d="M8.876 16.319c0 .611.535 1.146 1.147 1.146s1.147-.535 1.147-1.146c0-.612-.535-1.148-1.147-1.148s-1.147.536-1.147 1.148zM9.794 11.883c-.764 0-1.376.612-1.376 1.3 0 .689.612 1.3 1.376 1.3s1.376-.611 1.376-1.3c.001-.688-.611-1.3-1.376-1.3zM11.553 10.965c0 .689.612 1.301 1.376 1.301s1.376-.612 1.376-1.301-.612-1.3-1.376-1.3-1.376.611-1.376 1.3zM26.536 18.464a5 5 0 0 0-7.071 0 5 5 0 0 0 0 7.071 5 5 0 1 0 7.071-7.071zm-5.657 5.657a3 3 0 0 1-.586-3.415l4.001 4.001a3 3 0 0 1-3.415-.586zm4.829-.827-4.001-4.001a3.002 3.002 0 0 1 4.001 4.001z"></path>
                            </svg>
                        </span>
                        <span class="player-block-filter-label">彩色</span>
                    </div>
                </div>
            </div>
            <div class="player-dm-setting-left-radio">
                <div class="player-dm-setting-radio-item">
                    <input type="checkbox">
                    <span>弹幕随屏幕缩放</span>
                </div>
            </div>
            <div class="player-dm-setting-left-opacity">
                <div class="player-dm-setting-left-opacity-title">
                    不透明度
                </div>
                <div class="player-dm-setting-left-opacity-content">
                    <div class="progress-wrap ">
                        <Slider 
                        :value="opacity" 
                        :opacity="0.3" 
                        @change="sliderOpacityChange" />
                    </div>
                    <div class="progress-val">{{ opacity +'%' }}</div>
                </div>
            </div>
            <div class="player-dm-setting-left-area">
                <div class="player-dm-setting-left-area-title">
                    显示区域
                </div>
                <div class="player-dm-setting-left-area-content">
                    <div class="progress-wrap ">
                        <Slider 
                        :value="area" 
                        :opacity="0.3" 
                        :step="25" 
                        :marks="areaMarks" 
                        @change="sliderAreaChange" />
                    </div>
                    <div class="progress-val">{{ areaMark }}</div>
                </div>
            </div>
            <div class="player-dm-setting-left-fontsize">
                <div class="player-dm-setting-left-fontsize-title">
                    弹幕字号
                </div>
                <div class="player-dm-setting-left-fontsize-content">
                    <div class="progress-wrap ">
                        <Slider 
                        :value="fontsize" 
                        :opacity="0.3" 
                        @change="sliderFontsizeChange" />
                        <div></div>
                    </div>
                    <div class="progress-val">{{ fontsize +'%' }}</div>
                </div>
            </div>
            <div class="player-dm-setting-left-speedplus">
                <div class="player-dm-setting-left-speedplus-title">
                    弹幕速度
                </div>
                <div class="player-dm-setting-left-speedplus-content">
                    <div class="progress-wrap ">
                        <Slider 
                        :value="speed" 
                        :opacity="0.3" 
                        :step="25" 
                        :marks="speedMarks" 
                        @change="sliderSpeedChange" />
                    </div>
                    <div class="progress-val">{{ speedMark }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const opacity = ref<number>(80); // 不透明度
const area = ref<number>(25); // 显示区域
const areaMark = ref<string>('半屏'); // 显示区域
const areaMarks = ref<string[]>(['1/4', '半屏', '3/4', '不重叠', '不限']); // 显示区域
const speedMarks = ref<string[]>(['极慢', '', '适中', '', '极快']); // 速度
const speedMark = ref<string>('适中'); // 显示区域
const fontsize = ref<number>(100); // 字号
const speed = ref<number>(50); // 速度
const isSelectedScroll = ref<boolean>(false); // 是否选中禁用滚动弹幕
const isSelectedTop = ref<boolean>(false); // 是否选中禁用置顶弹幕
const isSelectedBottom = ref<boolean>(false);
const isSelectedColor = ref<boolean>(false); // 是否选中禁用彩色弹幕
// 透明度
const sliderOpacityChange = (val: number) => {
    opacity.value = val;
}
// 字体大小
const sliderFontsizeChange = (val: number) => {
    fontsize.value = val;
}
// 显示区域
const sliderAreaChange = (val: number) => {
    area.value = val;
    switch (val) {
        case 0:
            areaMark.value = areaMarks.value[0];
            break;
        case 25:
            areaMark.value = areaMarks.value[1];
            break;
        case 50:
            areaMark.value = areaMarks.value[2];
            break;
        case 75:
            areaMark.value = areaMarks.value[3];
            break;
        case 100:
            areaMark.value = areaMarks.value[4];
            break;
    }
};
const sliderSpeedChange = (val: number) => {
    switch (val) {
        case 0:
            speedMark.value = speedMarks.value[0];
            break;
        case 25:
            speedMark.value = '较慢';
            break;
        case 50:
            speedMark.value = speedMarks.value[2];
            break;
        case 75:
            speedMark.value = '较快';
            break;
        case 100:
            speedMark.value = speedMarks.value[4];
            break;
    }
};
// 点击禁用滚动弹幕事件 
const clickDisableScroll = () => {
    isSelectedScroll.value = !isSelectedScroll.value;
};
// 点击禁用置顶弹幕事件
const clickDisableTop = () => {
    isSelectedTop.value = !isSelectedTop.value;
};
// 点击禁用底部弹幕事件
const clickDisableBottom = () => {
    isSelectedBottom.value = !isSelectedBottom.value;
};
// 点击禁用彩色弹幕事件
const clickDisableColor = () => {
    isSelectedColor.value = !isSelectedColor.value;
};
</script>
<style scoped lang="scss">
.player-dm-setting-wrap {
    height: 300px;
    width: 320px;
    background: hsla(0, 0%, 8%, .9);
    border-radius: 2px;
    .player-dm-setting-left {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 100%;
        padding: 12px 20px;
        width: 100%;
        .player-dm-setting-left-block {
            width: 100%;
            .player-dm-setting-left-block-title {
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                margin-bottom: 8px;
                color: #ffffff;
            }
            .player-dm-setting-left-block-conent {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .player-block-filter-type {
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    color: hsla(0, 0%, 100%, .8);
                    fill: hsla(0, 0%, 100%, .8);
                    height: 100%;
                    margin: 0 22px 16px 0;
                    position: relative;
                    -webkit-transition: all .2s ease-in-out;
                    transition: all .2s ease-in-out;
                    width: 28px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    cursor: pointer;
                    .player-block-filter-image {
                        -webkit-box-sizing: border-box;
                        width: 28px;
                        box-sizing: border-box;
                    }
                    .player-block-filter-label {
                        font-size: 12px;
                        text-align: center;
                    }
                    &:hover {
                        color: #ffffff;
                        fill: #ffffff;
                    }

                    &.player-block-filter-type-selected {
                        fill: $theme-color;
                        color: $theme-color;
                    }

                }
                
            }
        }
        .player-dm-setting-left-radio {
            width: 100%;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .player-dm-setting-radio-item {
                display: flex;
                align-items: center;
                input {
                    cursor: pointer;
                    height: 14px;
                    width: 14px;
                    border-radius: 2px;
                    border: 2px solid $theme-color;
                }
                span {
                    margin-left: 8px;
                    font-size: 12px;
                    color: #ffffff;
                }

            }
        }
        .player-dm-setting-left-opacity {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            margin-bottom: 6px;
            .player-dm-setting-left-opacity-title {
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #ffffff;
                width: 80px;
            }
            .player-dm-setting-left-opacity-content {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .progress-wrap {
                    width: 170px;
                    height: 100%;
                }
                .progress-val {
                    font-size: 12px;
                    color: #ffffff;
                    width: 36px;
                    text-align: center;
                }

            }
        }
        .player-dm-setting-left-area {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            margin-bottom: 6px;
            .player-dm-setting-left-area-title {
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #ffffff;
                width: 80px;
            }
            .player-dm-setting-left-area-content {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .progress-wrap {
                    width: 170px;
                    height: 100%;
                }
                .progress-val {
                    font-size: 12px;
                    color: #ffffff;
                    width: 36px;
                    text-align: center;
                }

            }
        }
        .player-dm-setting-left-fontsize {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            margin-bottom: 6px;
            .player-dm-setting-left-fontsize-title {
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #ffffff;
                width: 80px;
            }
            .player-dm-setting-left-fontsize-content {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .progress-wrap {
                    width: 170px;
                    height: 100%;
                }
                .progress-val {
                    font-size: 12px;
                    color: #ffffff;
                    width: 36px;
                    text-align: center;
                }

            }
        }
        .player-dm-setting-left-speedplus {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            .player-dm-setting-left-speedplus-title {
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #ffffff;
                width: 80px;
            }
            .player-dm-setting-left-speedplus-content {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .progress-wrap {
                    width: 170px;
                    height: 100%;
                }
                .progress-val {
                    font-size: 12px;
                    color: #ffffff;
                    width: 36px;
                    text-align: center;
                }

            }
        }
    }
    
}
input[type="checkbox"] {
    -webkit-appearance: none; /* 移除默认样式 */
    appearance: none;
    position: relative;
}
input[type="checkbox"]:checked {
    background-color: $theme-color;
}
input[type="checkbox"]:checked::after {
    position: absolute;
    content: "";
    display: flex;
    top: 1px;
    left: 1px;
    width: 10px;
    height: 10px;
    align-items: center;
    background-image: url(@/assets/img/selected.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

}
</style>