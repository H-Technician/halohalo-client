<template>
    <div class="cover-select-content-upload-warp">
        <div class="cover-select-content-upload-left">
            <div class="cover-cropper-left-upload-text">
                <span>拖拽选框裁剪</span>
                <div class="refresh-text"
                @mouseenter="mouseRefresh = true"
                @mouseleave="mouseRefresh = false"
                >
                    <el-icon size="18"
                    :style="[{transform:mouseRefresh ? 'rotate(90deg)' : ''}]" 
                    style="transition:transform 0.2s linear;">
                        <ElIconRefresh />
                    </el-icon>
                    <span>重换封面</span>
                </div>
            </div>
            <!-- 图片裁剪 -->
            <div class="cover-cropper-left-upload-img">
                <PictureCropper
                    :boxStyle="{
                    width: '530px',
                    height: '298px',
                    backgroundColor: '#ffffff',
                    margin: 'auto',
                    }"
                    :img="coverUrl"
                    :zoomOnTouch = false
                    :options="{
                    viewMode: 1,
                    dragMode: 'move',
                    aspectRatio: 4 / 3,
                    background: false,
                    zoomable: false,
                    center: false,
                    guides: false,
                    modal: false,
                    preview: '.cover-cropper-right-upload-img-preview',
                    }"
                    :presetMode="{
                    mode: 'fixedSize',
                    width:340,
                    height: 298,
                    }"
                />
            </div>
            <canvas ref="canvasElement" style="display: none"></canvas>
            <div class="cover-cropper-left-upload-tips">
                <span class="tip">
                    *封面小tips：请尽量将封面关键信息放置在蓝色方框区域内,并保证尽量不要太靠边 
                </span>
            </div>
        </div>
        <div class="cover-select-content-right-upload">
            <div class="cover-cropper-right-upload-text">
                <span>点击预览封面</span>
            </div>
            <div class="cover-cropper-right-upload-preview-item">
                <span>4:3封面</span>
                <div class="cover-cropper-right-upload-img-preview-wrap cover-cropper-right-upload-img-preview-wrap-4x3">
                    <div class="cover-cropper-right-upload-img-preview"></div>
                </div>
            </div>
            <div class="cover-cropper-right-upload-preview-item">
                <span>16:9封面</span>
                <div class="cover-cropper-right-upload-img-preview-wrap cover-cropper-right-upload-img-preview-wrap-16x9">
                    <div class="cover-cropper-right-upload-img-preview"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import PictureCropper, { cropper } from 'vue-picture-cropper'
const mouseRefresh = ref(false); // 鼠标是否移动到
//const coverUrl = ref('data:image/webp;base64,UklGRkQDAABXRUJQVlA4WAoAAAAgAAAAUwEA/gAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggVgEAAJAYAJ0BKlQB/wA+bTaZSaQjIqEgKACADYlpbuFvIP492IAxfkAT2Ae+2TkPfbJyHv0Do4bm2mG14uTk6TpLIfDFdobc2vNJwB78X3gKtK1atBbA25teLk5D359nD45N4ub9hLWQ+RmO4au0q0bmZQlLhq7SoFku14995mj6cpcm8XJwvkRBu09tWhu44JtP6hkRfp7ZOF8f6D32rKerIe9QMohERdysMeJHBvsF2lQMlf1QREQyIorJu6Q3/rC+lLpaXTBHxzg3y8WsiAAA/v5YI//+CC9bfxT1pf+vqfmNOFRWNvnHBDIhhmCD9EFuqN3lW68tJiBnWFzuSGUxdGa+3yXaHuRVUFd+xAKhHzsdphoEehVqAgBhinaoXYGXGjm5o20uV52TFqwXECUgy2kmeDECiOvp0n8MKN+/R5U4hPmxhKIB5XBW0BJbLQDVmAYaw0iAAA==');
const coverUrl = ref('https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/672w_373h_1c-web-home-common-cover.avif');
const props = defineProps({
    // 视频文件对象
    videoFile: {
      type: File,
    },
})

onUnmounted(() => {
  if (props.videoFile) {
    URL.revokeObjectURL(URL.createObjectURL(props.videoFile)); // 释放内存 销毁URL
  }
});
watchEffect(() => {
    if (props.videoFile) {
        coverUrl.value = URL.createObjectURL(props.videoFile);
    }
});
onMounted( async() => {
    if (props.videoFile) {
        coverUrl.value = URL.createObjectURL(props.videoFile);
    }
});
</script>
<style lang="scss" scoped>
.cover-select-content-upload-warp {
    display: flex;
    justify-content: space-between;
    margin: 24px 0 0;
    width: 736px;
    height: 366px;
    .cover-select-content-upload-left {
        width: 530px;
        height: 366px;

        .cover-cropper-left-upload-text {
            font-size: 14px;
            margin: 0 0 17px;
            height: 20px;
            display: flex;
            .refresh-text {
                line-height: 20px;
                height: 20px;
                margin-left: 20px;
                display: flex;
                align-items: center;
                cursor: pointer;
                color: $theme-color;
                span {
                    margin-left: 6px;
                    font-size: 12px;
                }
            }
        }

        .cover-cropper-left-upload-img {
            height: 298px;
            position: relative;
            width: 530px;

            img {
                width: 100%;
            }                     
            
        }

        .cover-cropper-left-upload-tips {
            display: flex;
            align-items: center;
            margin-top: 15px;
            justify-content: space-between;

            span {
                font-size: 12px;
            }
            .tip {
                color: #bbb;
            }
        }
    }

    .cover-select-content-right-upload {
        width: 166px;
        height: 100%;
        .cover-cropper-right-upload-text {
            font-size: 14px;
            margin: 0 0 17px;
        }
        .cover-cropper-right-upload-preview-item {
            box-sizing: border-box;
            width: 166px;
            margin: 18px 0 0;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 6px;
            cursor: pointer;
            span {
                display: flex;
                font-size: 12px;
                margin: 0 0 9px;
            }
            .cover-cropper-right-upload-img-preview-wrap {
                width: 146px;
                overflow: hidden;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                .cover-cropper-right-upload-img-preview {
                    width: 100%;
                    height: 109.5px;
                    overflow: hidden;
                }

            }
            .cover-cropper-right-upload-img-preview-wrap-4x3 {
                height: 109.5px;
            }

            .cover-cropper-right-upload-img-preview-wrap-16x9 {
                height: 82.1px;
            }

            &:hover {
                background-color: #e5f5fb;
            }
        }
    }
}
</style>