<template>
    <div class="material-video-card" ref="materialvideoCardContainer">
        <!-- 骨架屏 -->
        <el-skeleton class="material-video-card-loading" style="width: 100%; height: 100%;" :animated="true":loading="isImgDownLoad">
            <template #template>
            <el-skeleton-item variant="text" style="width: 100%; min-height:148px; height: auto; max-height: 170px; border-radius: 6px; display: block;"/>
            <div style="margin-top: 8px; height: auto; height: 68.8px;">
                <el-skeleton-item variant="text" style="width: 80%; height: 20px;" />
                <div style="display: flex;">
                    <el-skeleton-item variant="text" style="width: 30px; height: 30px; border-radius: 50%;" />
                    <el-skeleton-item variant="text" style="width: calc(98% - 38px); height: 18px; margin-top: 6px; margin-left: 8px;"/>
                </div>
            </div>
            </template>
            <template #default>
                <div class="material-video-card-main">
                    <a  href="" target="_blank" class="img">
                        <img src="https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/672w_373h_1c-web-home-common-cover.avif" alt="封面" ref="videoCardImg"/>
                        <div class="date" style="position: absolute; bottom: 8px; right: 10px; color: #ffffff; font-size: 13px; font-family: 'HarmonyOS_Sans_SC_Medium'; cursor: pointer;">
                            <span style="vertical-align: 3px;">4:45</span>
                        </div>
                    </a>
                    <div class="material-video-info">
                        <a  href="" target="_blank">
                            <span class="title">哈喽哈喽弹幕网站素材</span>
                        </a>
                        <a  href="" target="_blank" class="author">
                            <div class="author-avatar">
                                <img src="@/assets/img/defaultAvatar.svg" alt="视频素材提供者头像">
                            </div>
                            <div class="name">
                                <span>必剪</span>
                            </div>
                            <div class="usage">
                                <span>使用量&nbsp;<span>980</span></span>
                            </div>
                        </a>
                    </div>
                </div>
            </template>
        </el-skeleton>    
    </div>
</template>
<script setup lang="ts">
// const Imgurl = ref<String>("~/assets/img/test01.jpeg")
const imageUrl = 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/672w_373h_1c-web-home-common-cover.avif';
const isImgDownLoad = ref(true);
onMounted(() => {
    loadImage(imageUrl, () => {
        isImgDownLoad.value = false; // 所有图片加载成功后隐藏骨架屏
        }, (error) => {
        console.error('图片加载失败:', error.message);
        });
    
})

</script>
<style scoped lang="scss">
.material-video-card {
    width: 100%;
    height: 100%;
}
.material-video-card-loading {
    width: 100%;
    height: 100%;
    display: block;
}
.material-video-card-main {
    /* box-sizing: border-box; */
    width: 100%;
    height: auto;
    
}
.material-video-card-main .img {
    width: 100%;
    height: 100%;
    position: relative;
    text-decoration: none;
    display: block;
    /* border-radius: 8px; */
    /* background-color: rgba(0, 0, 0, .2); */
    aspect-ratio: 16/9;
}
.material-video-card-main .img img {
    width: 100%;
    height: 100%; 
    min-height:148px; 
    max-height: 170px;   
    border-radius: 6px;
    object-fit: cover;
    display: block;
    cursor: pointer;
    aspect-ratio: 16/9;
}
.material-video-card-main .material-video-info {
    margin-top: 8px;

    a{
        text-decoration: none;
    }
}
.material-video-card-main .material-video-info .title {
    height: 30px;
    color: #18191c;
    padding-right: 14px;
    font-size: 15px;
    line-height: 22px;
    /* overflow: hidden; */
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    cursor: pointer;
    
}
.material-video-card-main .material-video-info .author {
    position: relative;
    justify-content: center;
    font-size: 13px;
    display: block;
    text-decoration: none;
    color: $item-color;
    margin-top: 4px;
    height: 30px;
    cursor: pointer;   

}
.material-video-card-main .material-video-info .author .author-avatar {
    display: inline-block;
    /* vertical-align: -4px; */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 30px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
    }
}

.material-video-card-main .material-video-info .author .name {
    position: absolute;
    left: 38px;
    margin-left: 8px;
    line-height: 30px;
    display: inline-block;

    
}    
.material-video-card-main .material-video-info .author .usage {
    position: absolute;
    line-height: 30px;
    display: inline-block;
    right: 0;
}
</style>