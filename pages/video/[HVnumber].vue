<template>
    <NuxtLayout name="publiclayout">
        <div class="video-container">
            <div class="left-container" :style="`width: 868px;`">
                <!-- 标题 -->
                <div class="video-info-container">
                    <h1 title="test" class="video-title">测试视频</h1>
                    <div class="video-info-detail">
                        <div class="video-info-detail-list">
                            <a href="" target="_blank" class="honor item honor-rank" v-if="true">
                                <IconsVideoPaiHang class="icon-paihang"/>
                                <span class="honor-text">全站排行榜最高第1名</span>
                                <el-icon><ElIconArrowRightBold /></el-icon>
                            </a>
                            <!-- 播放量 -->
                            <span class="view item">
                                <IconsVideoBoFang class="icon-bofang"/>
                                &nbsp;12万&nbsp;
                            </span>
                            <!-- 弹幕 -->
                            <span class="danmu item">
                                <IconsVideoDanMu class="icon-danmu"/>
                                &nbsp;124&nbsp;
                            </span>
                            <!-- 上传日期 -->
                            <span class="date item">
                                2024-05-01 12:12
                            </span>
                            <span class="zuozhesm item" v-if="false">
                                <IconsVideoZuoZheSm class="icon-zuozhesm"/>
                                作者声明:你们有什么看法吗？
                            </span>
                            <span class="copyright item" v-if="true">
                                <IconsVideoJinZhi class="icon-jinzhi"/>
                                未经作者授权，禁止转载
                            </span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.video-container {
    width: auto;
    padding: 64px 10px 0px;
    max-width: 2540px;
    min-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    box-sizing: content-box;
    position: relative;
}

.video-container .left-container {
    position: sticky;
    height: fit-content;
}

.video-container .left-container .video-info-container {
    height: 104px;
    box-sizing: border-box;
    padding-top: 22px;
}

.video-container .left-container .video-info-container .video-title {
    font-size: 20px;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    color: #000000;
    line-height: 28px;
    margin-top: 0;
    margin-bottom: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.video-container .left-container .video-info-container .video-info-detail {
    font-size: 13px;
    color: #000000;
    display: flex;
    align-items: center;
    height: 24px;
    line-height: 18px;
    position: relative;
    overflow: hidden;
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list {
    display: flex;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .item {
    flex-shrink: 0;
    margin-right: 12px;
    overflow: hidden;
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .item:last-child {
    margin-right: 0;
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .honor {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    height: 24px;
    border-radius: 2px;
    padding: 0px 6px;
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .honor-rank {
    text-decoration: none;
    color: $upload-background;
    fill: $upload-background;
    background-color: rgba(255, 102, 153, 0.1);
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .honor .icon-paihang {
    font-size: 14px;
    width: 14px;
    height: 14px;
    margin: 0 5px 0 3px;
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .view,
.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .danmu,
.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .date,
.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .zuozhesm,
.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .copyright {
    display: inline-flex;
    align-items: center;
    color: #9499a0;
}

.video-container .left-container .video-info-container .video-info-detail .video-info-detail-list .copyright .icon-jinzhi {
    fill: #fd676f;
    color: #fd676f;
}



</style>