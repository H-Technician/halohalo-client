<template>
    <div class="material-decals-card">
        <!-- 骨架屏 -->
        <el-skeleton class="material-video-card-loading" style="width: 100%; height: 100%;" :animated="true":loading="isImgDownLoad">
            <template #template>
            <el-skeleton-item variant="text" style="width: 100%; min-height:148px; height: auto; max-height: 170px; border-radius: 6px; display: block;"/>
            <div style="margin-top: 8px; height: auto; height: 40px; display: flex;">
                <el-skeleton-item variant="text" style="width: 30px; height: 30px; border-radius: 50%;" />
                <el-skeleton-item variant="text" style="width: calc(98% - 38px); height: 18px; margin-top: 6px; margin-left: 8px;"/>
            </div>
            </template>
            <template #default>
                <div class="material-decals-card-main">
                    <a href="" target="_blank" class="img" @mousemove="isMousemove = true" @mouseleave="isMousemove = false">
                        <img src="https://haliyunoss.oss-cn-chengdu.aliyuncs.com/material/bb31.gif" alt="贴纸封面"/>
                        <div class="img-mask" :style="isMousemove ? '' : 'display: none'">
                            <span style="position: absolute; bottom: 8px; left: 8px; color: #ffffff;">可爱的风应援打call</span>
                        </div>
                    </a>
                    <div class="material-decals-info">
                        <div class="author">
                            <div class="author-avatar">
                                <img src="@/assets/img/defaultAvatar.svg" alt="视频素材提供者头像">
                            </div>
                            <div class="name">
                                <span>必剪</span>
                            </div>
                            <div class="usage">
                                <span>使用量&nbsp;<span>980</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </el-skeleton>    
    </div>
</template>
<script setup lang="ts">
const isMousemove = ref(false)
// const Imgurl = ref<String>("~/assets/img/test01.jpeg")
const imageUrl = 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/material/bb31.gif';
const isImgDownLoad = ref(true);
onMounted(() => {
    loadImage(imageUrl, () => {
        isImgDownLoad.value = false; // 所有图片加载成功后隐藏骨架屏
        console.log('所有图片加载完成');
        }, (error) => {
        console.error('图片加载失败:', error.message);
        });
    
})

</script>
<style scoped lang="scss">
.material-decals-card {
    width: 100%;
    height: 100%;
}
.material-decals-card-loading {
    width: 100%;
    height: 100%;
    display: block;
}
.material-decals-card-main {
    width: 100%;
    height: auto;
    
}
.material-decals-card-main .img {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    text-decoration: none;
    display: block;
}

.material-decals-card-main .img img {
    position: absolute;
    width: 100%;
    height: 100%; 
    top: 0;
    left: 0;
    min-height:100px; 
    max-height: 170px;   
    border-radius: 10px;
    object-fit: cover;
    display: block;
    cursor: pointer;
    background-color: #f4f4f4;
}
.material-decals-card-main .img .img-mask{
    position: absolute;
    width: 100%;
    height: 100%; 
    top: 0;
    left: 0;
    min-height:100px; 
    max-height: 170px;   
    border-radius: 10px;
    cursor: pointer;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
}

.material-decals-card-main .material-decals-info {
    margin-top: 8px;
}

.material-decals-card-main .material-decals-info .author {
    position: relative;
    justify-content: center;
    font-size: 13px;
    color: $item-color;
    margin-top: 4px;
    height: 30px;
    cursor: pointer;   

}
.material-decals-card-main .material-decals-info .author .author-avatar {
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

.material-decals-card-main .material-decals-info .author .name {
    position: absolute;
    left: 38px;
    margin-left: 8px;
    line-height: 30px;
    display: inline-block;

    
}    
.material-decals-card-main .material-decals-info .author .usage {
    position: absolute;
    line-height: 30px;
    display: inline-block;
    right: 0;
}
</style>