<template>
    <div class="setting_box">
        <div class="setting-content_body">
            <div class="setting">
                <div class="setting-title">
                    <span>创作设置</span>
                </div>
                <div class="watermark-setting"  :class="watermarkSetting === '编辑' ? 'clearfix' : 'edit'">
                    <div class="watermark-setting-title">
                        <div class="watermark-setting-left">
                            <span>原创视频添加水印设置</span>
                        </div>
                        <div class="watermark-setting-right">
                            <span @click="edit">{{ watermarkSetting }}</span>
                        </div>
                    </div>
                    <div class="watermark-setting-content" :style="watermarkSetting === '编辑' ? 'display:none' : ''">
                        <div class="watermark-setting-wrap">
                            <div class="watermark-switcher">
                                <span>原创视频稿件添加水印</span>
                                <el-switch 
                                class="switcher-switch"
                                v-model="value"
                                />
                                <p>原创视频稿件添加水印 对开启后新上传的视频有效</p>
                            </div>
                            <div class="watermark-choose">
                                <p class="watermark-tip-location">选择水印位置</p>
                                <p class="tooltip">好的位置可以帮助水印在盗播时不被遮挡，为自己正名</p>
                                <div class="watermark-position-wrp">
                                    <div class="mark" v-show="isMark"></div>
                                    <div class="location-top-left location" v-show="isMark">
                                        <div class="icon-selected">
                                            <el-icon color="#ffffff" size="14" ><ElIconSelect /></el-icon>
                                        </div>
                                    </div>
                                    <div class="location-top-right location" v-show="isMark">
                                        <div class="icon-selected">
                                            <el-icon color="#ffffff" size="14" ><ElIconSelect /></el-icon>
                                        </div>
                                    </div>
                                    <div class="location-bottom-left location" v-show="isMark">
                                        <div class="icon-selected">
                                            <el-icon color="#ffffff" size="14" ><ElIconSelect /></el-icon>
                                        </div>
                                    </div>
                                    <div class="location-bottom-right location" v-show="isMark">
                                        <div class="icon-selected">
                                            <el-icon color="#ffffff" size="14" ><ElIconSelect /></el-icon>
                                        </div>
                                    </div>
                                </div>
                                <img src="@/assets/img/platform/watermark-progress.e9be6db3.png" alt="" srcset="">
                                <div class="btn-wrp">
                                    <button class="choose" @click="chooseLocation">选择位置</button>
                                    <button class="cancell" @click="cancellLocation" v-show="isMark">取消</button>
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
const watermarkSetting = ref<string>('编辑');
const isMark = ref(false);
const edit = () => {
    if (watermarkSetting.value === '编辑') {
        watermarkSetting.value = '收起';
    } else {
        watermarkSetting.value = '编辑';
    }
};
const chooseLocation = () => {
    isMark.value = true;
};
const cancellLocation = () => {
    isMark.value = false;
};
const value = ref(true);
</script>
<style lang="scss" scoped>
.setting_box {
    padding: 16px 40px;
    background-color: #ffffff;

    .setting-content_body {
        padding: 0 0 100px;

        .setting {
            .setting-title {
                span {
                    font-size: 18px;
                    color: #222222;
                }
            }
            .watermark-setting {
                box-sizing: border-box;
                width: 860px;
                margin-top: 24px;
                border: #d9d9d9 1px solid;
                padding: 19px;
                overflow: hidden;

                .watermark-setting-title {
                    display: flex;
                    justify-content: space-between;
                    .watermark-setting-left {
                        font-size: 14px;
                        color: #222222;
                    }
                    .watermark-setting-right {
                        font-size: 14px;
                        color: $theme-color;
                        cursor: pointer;
                    }
                }
                .watermark-setting-content {
                    margin-top: 20px 0 0;

                    .watermark-setting-wrap {
                        .watermark-switcher {
                            height: 48px;
                            width: 480px;
                            span {
                                line-height: 24px;
                            }
                            .switcher-switch {
                                margin-left: 10px;
                                --el-switch-on-color: #00aeec;
                            }

                            p {
                                margin: 0;
                                padding: 0;
                                font-size: 14px;
                                color: #757575;
                            }
                        }

                        .watermark-choose {
                            margin: 16px 0 0;
                            padding: 16px 0 0;
                            .watermark-tip-location {
                                margin: 0;
                                padding: 0;
                                font-size: 14px;
                            }
                            .tooltip {
                                margin: 5px 0 0;
                                padding: 5px 0 18px;
                                font-size: 14px;
                                color: #757575;  
                            }
                            .watermark-position-wrp {
                                position: relative;
                                width: 820px;
                                height: 520px;
                                background: url(@/assets/img/platform/watermark-img.9cd7f031.png) no-repeat;
                                overflow: hidden;

                                .location {
                                    position: absolute;
                                    width: 300px;
                                    height: 48px;
                                    border: 1px dashed #fff;
                                    border-radius: 4px;
                                    z-index: 2;
                                    cursor: pointer;
                                    background: url(@/assets/img/platform/watermark-img.9cd7f031.png) no-repeat;

                                    .icon-selected {
                                        position: absolute;
                                        right: -8px;
                                        top: -8px;
                                        display: flex;
                                        height: 16px;
                                        width: 16px;
                                        border-radius: 50%;
                                        background-color: $theme-color;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                }

                                .location-top-left {
                                    top: 11px;
                                    left: 20px;
                                    background-position: -21px -12px;
                                }

                                .location-top-right {
                                    top: 11px;
                                    right: 20px;
                                    background-position: -499px -12px;
                                }

                                .location-bottom-left {
                                    bottom: 11px;
                                    left: 20px;
                                    background-position: -21px -462px;
                                }

                                .location-bottom-right {
                                    bottom: 11px;
                                    right: 20px;
                                    background-position: -499px -462px;
                                }

                                .mark {
                                    position: absolute;
                                    content: '';
                                    top: 0;
                                    right: 0;
                                    bottom: 0;
                                    left: 0;
                                    z-index: 1;
                                    background: rgba(0, 0, 0, 0.4);
                                }
                            }

                            img{
                                width: 820px;
                                display: block;
                            }
                            .btn-wrp {
                                display: flex;
                                margin: 16px 0 0;
                                padding: 30px 0 0;
                                justify-content: center;

                                .choose {
                                    border-radius: 6px;
                                    border: none;
                                    height: 28px;
                                    width: 68px;
                                    background-color: $theme-color;
                                    line-height: normal;
                                    color: #ffffff;
                                    cursor: pointer;
                                    margin-left: 6px;
                                    margin-right: 6px;

                                    &:hover {
                                        background-color: $theme-color-hover;
                                    }
                                }

                                .cancell {
                                    border-radius: 6px;
                                    border: #757575 1px solid;
                                    height: 28px;
                                    width: 68px;
                                    background-color: #ffffff;
                                    line-height: normal;
                                    color: #000000;
                                    cursor: pointer;
                                    margin-left: 6px;
                                    margin-right: 6px;
                                }
                            }
                        }
                    }
                }
            }

            .clearfix {
                height: 60px;
            }
            .edit {
                height: auto;
            }
        }
    }
}
</style>