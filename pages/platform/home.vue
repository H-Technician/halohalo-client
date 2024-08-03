<template>
    <div class="platform-body">
        <div class="platform-body-content">
            <div class="platform-body-content-carousel">
                <div class="platform-carousel">
                    <PlatformCarousel />
                </div>
                <div class="platform-notice-box">
                    <div class="notice_title">
                        <div class="notice_title_text">
                            <span>热门活动</span>
                            <div class="notice_title_more">
                                <span>更多</span>
                                <el-icon style="vertical-align: -2px;"><ElIconArrowRightBold /></el-icon>
                            </div>
                        </div>
                    </div>
                    <div class="notice_body">
                        <ul>
                            <li>
                                <a href="" class="item-left">
                                    <div class="point-circle"></div>
                                    <p>王者战报集结令</p>
                                    <img src="@/assets/img/platform/hot.png" alt="热门" srcset="">
                                </a>
                                <span class="item-right">
                                    1154.5万人参与
                                </span>
                            </li>
                            <li>
                                <a href="" class="item-left">
                                    <div class="point-circle"></div>
                                    <p>王者战报集结令</p>
                                    <img src="@/assets/img/platform/hot.png" alt="热门" srcset="">
                                </a>
                                <span class="item-right">
                                    1154.5万人参与
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="notice_banner">
                        <div class="img-wrap">
                            <img src="@/assets/img/platform/8352.png" alt="notice_banner" srcset="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="data-card" :style="isVideoCardActive ? 'height: 286px;' : 'height: 320px;'">
                <div class="data-wrp">
                    <div class="tab_header">
                        <div class="left-block">
                            <div class="navs">
                                <div class="navs-item" :class="isVideoCardActive ? 'active' : ''" @click="switchDataCard('video')">
                                    视频数据
                                </div>
                                <div class="navs-item" :class="isVideoCardActive ? '' : 'active'" @click="switchDataCard('text')">
                                    专栏数据
                                </div>
                            </div>
                        </div>
                        <div class="right-block">
                            <div class="link">
                                <span>每日中午12点更新昨日数据</span>
                                <el-icon style="vertical-align: -2px;"><ElIconArrowRightBold /></el-icon>
                            </div>
                        </div>
                    </div> 
                    <div class="data-body">
                        <div class="data-video-card " v-if="isVideoCardActive">
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformFengSi class="icon"/>
                                        <span>净增粉丝</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformBoFang class="icon"/>
                                        <span>播放量</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformPingLun class="icon"/>
                                        <span>评论</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformDanMu class="icon"/>
                                        <span>弹幕</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformDianZan class="icon"/>
                                        <span>点赞</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformFenXiang class="icon"/>
                                        <span>分享</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformShouCang class="icon"/>
                                        <span>收藏</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-card ">
                                <div class="video-data-deatil">
                                    <div class="video-data-card-top">
                                        <IconsPlatformTouBi class="icon"/>
                                        <span>投币</span>
                                        <el-icon style="margin: 5px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="video-data-card-bottom">
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="data-text-card " v-else>
                            <div class="text-card">
                                <div class="text-data-deatil">
                                    <div class="text-data-name">
                                        <span>粉丝数</span>
                                        <el-icon style="margin: 6px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="text-data-content">
                                        <span>12</span>
                                    </div>
                                    <div class="text-data-diff-wrp">
                                        <span>昨日</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-card">
                                <div class="text-data-deatil">
                                    <div class="text-data-name">
                                        <span>浏览量</span>
                                        <el-icon style="margin: 6px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="text-data-content">
                                        <span>12</span>
                                    </div>
                                    <div class="text-data-diff-wrp">
                                        <span>昨日</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-card">
                                <div class="text-data-deatil">
                                    <div class="text-data-name">
                                        <span>评论数</span>
                                        <el-icon style="margin: 6px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="text-data-content">
                                        <span>12</span>
                                    </div>
                                    <div class="text-data-diff-wrp">
                                        <span>昨日</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-card">
                                <div class="text-data-deatil">
                                    <div class="text-data-name">
                                        <span>收藏数</span>
                                        <el-icon style="margin: 6px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="text-data-content">
                                        <span>12</span>
                                    </div>
                                    <div class="text-data-diff-wrp">
                                        <span>昨日</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-card">
                                <div class="text-data-deatil">
                                    <div class="text-data-name">
                                        <span>点赞数</span>
                                        <el-icon style="margin: 6px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="text-data-content">
                                        <span>12</span>
                                    </div>
                                    <div class="text-data-diff-wrp">
                                        <span>昨日</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-card">
                                <div class="text-data-deatil">
                                    <div class="text-data-name">
                                        <span>分享数</span>
                                        <el-icon style="margin: 6px 0;" size="10"><ElIconArrowRightBold /></el-icon>
                                    </div>
                                    <div class="text-data-content">
                                        <span>12</span>
                                    </div>
                                    <div class="text-data-diff-wrp">
                                        <span>昨日</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="material-wrp">
                <div class="material-tabs_header">
                    <div class="material-tabs-left">
                        <span>创作素材</span>
                    </div>
                    <div class="material-tabs-right">
                        <div class="up-btn">
                            <span>素材投稿</span>
                        </div>
                        <div class="link">
                            <span>更多</span>
                            <el-icon style="vertical-align: -2px;"><ElIconArrowRightBold /></el-icon>
                        </div>
                    </div>
                </div>
                <div class="material-tabs">
                    <ul>
                        <li @click="switchMaterialCard('video')" :class="ismaterialCardActive === 'video' ? 'is_active' : ''">
                            视频素材99+
                        </li>
                        <li @click="switchMaterialCard('decals')" :class="ismaterialCardActive === 'decals' ? 'is_active' : ''">
                            贴纸素材9999+
                        </li>
                    </ul>
                </div>
                <div class="material-wrp-content">
                    <div class="material-wrp-video" v-if="ismaterialCardActive === 'video'">
                        <div class="material-wrp-video-card" v-for="(item, index) in 4">
                            <PlatformMaterialVideoItem />
                        </div>
                    </div>
                    <div class="material-wrp-decals"  v-if="ismaterialCardActive === 'decals'">
                        <div class="material-wrp-decals-card" v-for="(item, index) in 12">
                            <PlatformMaterialDecalsItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const isVideoCardActive = ref(true);
const ismaterialCardActive = ref<string>('video');
//切换视频和专栏卡片
const switchDataCard = (cardType: string) => {
    switch (cardType) {
        case 'video':
            isVideoCardActive.value = true;
            break;
        case 'text':
            isVideoCardActive.value = false;
            break;
    }
}
//切换素材卡片
const switchMaterialCard = (cardType: string) => {
    ismaterialCardActive.value = cardType;
}
</script>
<style scoped lang="scss">
    .platform-body {
        width: 100%;
        height: 100%;
        .platform-body-content {
            width: 100%;
            height: 100%;
            .platform-body-content-carousel {
                display: flex;
                height: 228px;
                .platform-carousel {
                    background-color: #ffffff;
                    width: 644px;
                    height: 228px;
                }
                .platform-notice-box {
                    position: relative;
                    margin-left: 15px;
                    background-color: #ffffff;
                    width: 100%;
                    min-width: 228px;
                    padding: 16px 24px;
                    .notice_title {
                        position: relative;
                        .notice_title_text {
                            display: flex;
                            .notice_title_more {
                                position: absolute;
                                right: 2px;
                                font-size: 13px;
                                color: $item-color;
                                cursor: pointer;
                            }
                        }
                    }
                    .notice_body {
                        margin-top: 20px;
                        width: 100%;
                        ul {
                            margin: 0;
                            padding: 0;
                            li {
                                list-style: none;
                                height:30px;
                                display: flex;
                                position: relative;
                                cursor: pointer;
                                .item-left {
                                    display: flex;
                                    text-decoration: none;
                                    color: #000000;
                                    height: 30px;
                                    .point-circle {
                                        margin: 12px 8px;
                                        height: 6px;
                                        width: 6px;
                                        line-height: 30px;
                                        background: #e7e7e7;
                                        border-radius: 3px;
                                        display: block;
                                    }
                                    p {
                                        line-height: 30px;
                                        margin: 0;
                                        display: block;
                                    }

                                    img {
                                        height: 16px;
                                        margin: 7px;
                                    }

                                }
                                .item-right {
                                    position: absolute;
                                    right: 10px;
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                    .notice_banner {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 100%;
                        height: 90px;
                        margin-top: 20px;
                        .img-wrap {
                            width: 100%;
                            height: 100%;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .data-card {
                margin: 16px 0 0;
                padding: 24px;
                background-color: #ffffff;
                box-sizing: border-box;
                .data-wrp {
                    height: 100%;
                    width: 100%;
                    .tab_header {
                        position: relative;
                        display: flex;
                        height: 20px;
                        width: 100%;
                        // background-color: aqua;
                        .left-block {
                            .navs {
                                display: flex;
                                .navs-item {
                                    display: block;
                                    cursor: pointer;
                                }
                                :nth-child(1) {
                                    margin-right: 35px;
                                }
                                .active {
                                    color: $theme-color;
                                }
                            }
                        }
                        .right-block {
                            position: absolute;
                            right: 0;
                            .link {
                                font-size: 12px;
                                line-height: 20px;
                                cursor: pointer;
                            }
                        }
                        
                    }
                    .data-body {
                        margin-top: 24px;
                        .data-video-card {
                            display: grid;
                            width: 100%;
                            height: 100%;
                            grid-template-columns: repeat(4, 1fr);
                            grid-template-rows: repeat(2, 1fr);
                            gap: 20px;
                            .video-card {
                                .video-data-deatil {
                                    padding: 16px 16px 20px;
                                    background-color: #f5fcfe;
                                    border-radius: 16px;
                                    cursor: pointer;
                                    .video-data-card-top {
                                        display: flex;
                                        height: 20px;
                                        line-height: 20px;
                                        .icon {
                                            width: 20px;
                                            height: 20px;
                                        }
                                        span {
                                            margin-left: 6px;
                                        }

                                    }
                                    .video-data-card-bottom {
                                        margin-top: 8px;
                                        span {
                                            font-size: 18px;
                                            font-weight: 600;
                                            color: $theme-color;
                                        }
                                    }
                                }
                            }
                            
                        }
                        .data-text-card {
                            display: grid;
                            width: 100%;
                            height: 100%;
                            grid-template-columns: repeat(3, 1fr);
                            grid-template-rows: repeat(2, 1fr);
                            gap: 20px;
                            .text-card {
                                .text-data-deatil {
                                    padding: 16px 16px 20px;
                                    background-color: #f5fcfe;
                                    border-radius: 16px;
                                    cursor: pointer;
                                    .text-data-name {
                                        font-size: 12px;
                                        .icon {
                                            width: 10px;
                                            height: 10px;
                                        }
                                    }
                                    .text-data-content {
                                        span {
                                            font-size: 18px;
                                            font-weight: 600;
                                            color: $theme-color;
                                        }

                                    }
                                    .text-data-diff-wrp {
                                        :nth-child(1) {
                                            font-size: 12px;
                                        }
                                        :nth-child(2) {
                                            font-size: 12px;
                                            font-weight: 600;
                                            color: $theme-color;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .material-wrp {
                margin: 16px 0 0;
                padding: 24px;
                background-color: #ffffff;
                box-sizing: border-box;
                height: auto;

                .material-tabs_header {
                    display: flex;
                    position: relative;                    ;
                    .material-tabs-left {
                        height: 30px;
                        span {
                            height: 30px;
                            line-height: 30px;
                        }
                    }
                    .material-tabs-right {
                        height: 30px;
                        position: absolute;
                        display: flex;
                        right: 0;
                        .up-btn {
                            line-height: 30px;
                            width: 80px;
                            height: 30px;
                            border-radius: 15px;
                            border: 1px solid $theme-color;
                            margin-right: 20px;
                            cursor: pointer;
                            span {
                                display: flex;
                                justify-content: center;
                                font-size: 14px;
                            }
                        }
                        .link {
                            font-size: 14px;
                            line-height: 30px;
                            cursor: pointer;
                        }
                    }
                }
                .material-tabs {
                    margin-top: 16px;
                    border-bottom: 1px solid $item-color-hover;
                    ul {
                        list-style: none;
                        display: flex;
                        padding: 0;
                        margin: 0;
                        height: 30px;
                        li {
                            display: block;
                            cursor: pointer;
                        }
                        :nth-child(1) {
                                margin-right: 35px;
                        }
                        .is_active {
                            color: $theme-color;
                            border-bottom: 3px solid $theme-color;
                        }
                    }
                }
                .material-wrp-content {
                    height: auto;
                    margin-top: 20px;
                    .material-wrp-video {
                        height: 100%;
                        width: 100%;
                        display: grid;
                        width: 100%;
                        height: 100%;
                        grid-template-columns: repeat(4, 1fr);
                        grid-template-rows: repeat(1, 1fr);
                        gap: 20px;
                    }
                    .material-wrp-decals {
                        height: 100%;
                        width: 100%;
                        display: grid;
                        width: 100%;
                        height: 100%;
                        grid-template-columns: repeat(6, 1fr);
                        grid-template-rows: repeat(2, 1fr);
                        gap: 20px;
                    }
                }
            }
        }
    }
</style>
