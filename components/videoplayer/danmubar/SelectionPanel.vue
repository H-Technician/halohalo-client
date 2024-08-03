<template>
    <div class="player-mode-selection-panel">
        <div class="player-mode-selection-row fontsize">
            <div class="row-title">字号</div>
            <div class="row-selection">
                <div class="hui-radio-wrap-button">
                    <div class="radio-button active">
                        <span>小</span>
                    </div>
                    <div class="radio-button">
                        <span>标准</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-mode-selection-row mode">
            <div class="row-title">模式</div>
            <div class="row-selection">
                <div class="player-block-filter-type player-block-typeScroll player-block-filter-type-active">
                    <span class="player-block-filter-image">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                            <path d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM11 9h6a1 1 0 0 1 0 2h-6a1 1 0 0 1 0-2zm-3 2H6V9h2v2zm4 4h-2v-2h2v2zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"></path>
                        </svg>
                    </span>
                    <span class="player-block-filter-label">滚动</span>
                </div>
                <div class="player-block-filter-type player-block-typeTop">
                    <span class="player-block-filter-image">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                            <path d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM9 9H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z"></path>
                        </svg>
                    </span>
                    <span class="player-block-filter-label">顶部</span>    
                </div>
                <div class="player-block-filter-type player-block-typeBottom">
                    <span class="player-block-filter-image">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
                            <path d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM9 21H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"></path>
                        </svg>
                    </span>
                    <span class="player-block-filter-label">底部</span>
                </div>
            </div>
        </div>
        <div class="player-mode-selection-row color">
            <div class="row-title">颜色</div>
            <div class="row-selection">
                <div class="color-input-warp">
                    <input type="text" :value="color"  @input="handleInput">
                    <div class="color-input-box" :style="{background: color}"></div>
                </div>
            </div>
            <ul class="color-picker-options">
                <li class="color-picker-option" 
                :style="{background: item}" 
                :class="color === item ? 'color-picker-option-active' : ''"
                v-for="(item, index) in colorList" 
                :key="index" 
                @click="color = item">
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
const color = ref('#FFFFFF'); // 默认颜色
// 预先定义颜色列表
const colorList =ref([
  '#FE0302',
  '#FF7204',
  '#FFAA02',
  '#FFD302',
  '#FFFF00',
  '#A0EE00',
  '#00CD00',
  '#019899',
  '#4266BE',
  '#89D5FF',
  '#CC0273',
  '#222222',
  '#9B9B9B',
  '#FFFFFF',
]);
// 输入事件处理函数 保证输入的是以“#”开始的合法的颜色值
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  if (!value.startsWith('#')) {
    // 更新值，但不触发 input 事件，避免无限循环
    color.value = `#${value}`;
  } else {
    // 否则，正常更新值
    color.value = value;
  }
};
</script>
<style scoped lang="scss">
.player-mode-selection-panel {
    background: hsla(0, 0%, 8%, .9);
    border-radius: 2px;
    width: 216px;
    border-radius: 2px;
    height: 276px;
    box-sizing: border-box;
    padding: 20px;
    .player-mode-selection-row {
        font-size: 12px;
        line-height: 22px;
        min-height: 22px;
        position: relative;
        width: 100%;
        margin-bottom: 8px;
        .row-title {
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            margin-bottom: 8px;
            color: #ffffff;
        }
        .row-selection {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .hui-radio-wrap-button {
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: space-between;
                .radio-button {
                    height: 20px;
                    width: 100%;
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
                    &:first-child {
                        margin-right: 10px;
                    }

                }
            }
            .player-block-filter-type {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: hsla(0, 0%, 100%, .8);
                fill: hsla(0, 0%, 100%, .8);
                height: 100%;
                margin: 0 28px 0 0;
                position: relative;
                -webkit-transition: all .2s ease-in-out;
                transition: all .2s ease-in-out;
                width: 26px;
                display: flex;
                flex-direction: column;
                justify-content: left;
                cursor: pointer;
                .player-block-filter-image {
                    -webkit-box-sizing: border-box;
                    width: 26px;
                    box-sizing: border-box;
                    //height: 32px;
                }
                .player-block-filter-label {
                    font-size: 12px;
                    text-align: center;
                }
                &:hover {
                    color: #ffffff;
                    fill: #ffffff;
                }

                &.player-block-filter-type-active {
                    fill: $theme-color;
                    color: $theme-color;
                }

            }
            .color-input-warp {
                display: flex;
                height: 22px;
                align-items: center;
                justify-content: space-between;
                .color-input-box {
                    width: 100px;
                    height: 22px;
                    border-radius: 4px;
                }
                input {
                    box-sizing: 4px;
                    box-sizing: border-box;
                    width: 100%;
                    height: 20px;
                    margin: 1px 6px 1px 0;
                    color: #ffffff;
                    font-family: "HarmonyOS_Sans_SC_Medium";
                    background-color: transparent;
                    border-radius: 4px;
                    border: 1px solid silver;
                    padding: 0 8px;
                    &:focus {
                        outline: none;
                        border-radius: 4px;
                        border: 1px solid silver;
                    }
                }
            }
        }
        .color-picker-options {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            margin-top: 10px;
            padding: 0;
            .color-picker-option {
                border: 1px solid rgba(0, 0, 0, .3);
                border-radius: 2px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                cursor: pointer;
                display: inline-block;
                height: 16px;
                margin-bottom: 6px;
                margin-right: 9px;
                width: 16px;
            }
            .color-picker-option-active {
                box-shadow: 0 0 1px 1px #fff;
                border: 1px solid #000;
            }
        }
    }
}
</style>