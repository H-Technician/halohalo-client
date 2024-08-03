<template>
    <div class="cropper-comp">
        <!-- 导航栏 -->
        <div class="cropper-tabs">
            <ul>
                <li v-for="item in tabList" @click="activeUploadTab(item.name)" :class="isActiveUploadTab === item.name ? 'is_active' : ''">
                    {{ item.name  }}
                </li>
                <li v-if="false">修改封面</li>
            </ul>
        </div>
        <div class="cropper-content">
            <div class="cover-select-content-pick" v-show="isSelectCover">
                <div class="cover-select-content-warp">
                    <div class="cover-select-content-left">
                        <div class="cover-cropper-left-text">
                            <span>拖拽选框裁剪</span>
                            <div class="refresh-text" 
                            @mouseenter="mouseRefresh = true"
                            @mouseleave="mouseRefresh = false"
                            @click="selectCover"
                            v-if=" isActiveUploadTab === '上传封面'">
                                <el-icon size="18"
                                :style="[{transform:mouseRefresh ? 'rotate(90deg)' : ''}]" 
                                style="transition:transform 0.2s linear;">
                                    <ElIconRefresh />
                                </el-icon>
                                <span>重换封面</span>
                            </div>
                        </div>
                        <!-- 图片裁剪 -->
                        <div class="cover-cropper-left-img">
                            <VuePictureCropper
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
                                movable: false,
                                preview: '.cover-cropper-right-img-preview',
                                }"
                                :presetMode="{
                                mode: 'fixedSize',
                                height: 298,
                                }"
                            />
                        </div>
                        <video muted crossorigin="anonymous" ref="uploadVideoElement" style="display: none"></video>
                        <canvas ref="canvasElement" style="display: none"></canvas>
                        <div class="cover-cropper-left-tips">
                            <span class="tip">
                                *封面小tips：请尽量将封面关键信息放置在蓝色方框区域内,并保证尽量不要太靠边 
                            </span>
                        </div>
                    </div>
                    <div class="cover-select-content-right">
                        <div class="cover-cropper-right-text">
                            <span>点击预览封面</span>
                        </div>
                        <div class="cover-cropper-right-preview-item">
                            <span>4:3封面</span>
                            <div class="cover-cropper-right-img-preview-wrap cover-cropper-right-img-preview-wrap-4x3">
                                <div class="cover-cropper-right-img-preview"></div>
                            </div>
                        </div>
                        <div class="cover-cropper-right-preview-item">
                            <span>16:9封面</span>
                            <div class="cover-cropper-right-img-preview-wrap cover-cropper-right-img-preview-wrap-16x9">
                                <div class="cover-cropper-right-img-preview"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cover-select-content-pick-bar" v-if="showPickBar">
                    <div class="cover-slider">
                        <div class="cover-slider-list">
                            <div class="cover-slider-image" v-for="(item, index) in coverUrls">
                                <img :src="item" alt="封面"/>
                            </div>
                        </div>
                        <div class="slider-container" ref="sliderContainerRef">
                            <div class="slider-dot" :style="{ left: sliderPosition + '%' }" @mousedown.prevent="startDrag($event)" @touchstart="startDrag($event, 'touch')">
                                <div class="slider-dot-hover"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cover-select-footer-pick" v-if="!isLoading">
                    <div class="cover-select-footer-pick-btn">
                        <div class="button" @click="complete">
                            <span>完成</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cropper-loading" v-if="isLoading">
                <div class="loading-bg"></div>
            </div>
            <div class="cover-select-content-upload-wrap" v-show="!isSelectCover">
                <div class="cover-select-content-upload-box"
                @dragover.prevent
                @dragenter.prevent
                @dragleave.prevent
                @drop.prevent
                @drop="handleDrop"
                @click="selectCover">
                    <img src="@/assets/img/upload_cloud.png" alt="上传图片">
                    <div class="upload-text-main">拖拽图片到此或点击上传</div>
                    <div class="upload-text-sub">建议上传4:3比例高清图片，尺寸≥1200*900</div>
                    <input
                        type="file"
                        ref="coverInput"
                        @change="handleCoverChange"
                        style="display: none;"
                    >
                </div>
                <div class="cover-select-footer-upload-btn">
                    <div class="button" @click="selectCover">
                        <span>上传图片</span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { uploadCoverApi } from '@/api/upload';
import type { UploadCover } from '@/types/upload';
import { imgBlob } from '@/utils/imgBlob';
import { calculateBlobMD5 } from '@/utils/md5'
import { isCoverFile } from '@/utils/imgType';
const isActiveUploadTab = ref('截取封面');
const isSelectCover = ref(true); // 默认显示截取封面
const isLoading = ref(true);
const sliderPosition = ref(0); // 初始位置，可以根据需要调整
const uploadVideoElement = ref<HTMLVideoElement | null>(null);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const sliderContainerRef = ref<HTMLDivElement | null>(null);
const coverUrls = ref<string[]>([]); // 定义一个数组来保存封面图片URL
const coverUrl = ref(); // 封面预览
const coverInput =ref<HTMLInputElement | null>(null); // 封面上传input
const videoCropperCover = ref(''); // 用于储存视频截取的封面
const uploadCropperCover = ref(''); // 用于储存上传的封面
const showPickBar = ref(false); // 是否显示滑动条
let startX = 0;
let initialSliderX = 0;
const mouseRefresh = ref(false); // 鼠标是否移动到
const emit = defineEmits(['CropperCover']); // 裁剪封面完成回调
let coverUploadUrl: UploadCover = {
    coverUrl4x3: '',
    coverpath4x3: '',
    coverUrl16x9: '',
    coverpath16x9: '',
};
const props = defineProps({
    // 视频文件对象
    videoFile: {
      type: File,
    },
})
const activeUploadTab = (tabName: string) => {
    if (isActiveUploadTab.value !== tabName) {
        isActiveUploadTab.value = tabName;
        if (tabName === '截取封面') {
            if (uploadCropperCover.value) {
                coverUrl.value = videoCropperCover.value;
            }
            if (!isLoading.value) {
                showPickBar.value = true;
            } else {
                showPickBar.value = false;
            }
            isSelectCover.value = true;
        } else {
            if (uploadCropperCover.value) {
                coverUrl.value = uploadCropperCover.value;
                showPickBar.value = false;
                isSelectCover.value = true;
            } else {
                isSelectCover.value = false;
            }
        }
    }
};
const tabList = ref([
    {
        name: '截取封面'
    },
    {
        name: '上传封面'
    }
]);

// 拖拽封面文件
const handleDrop = async (event: DragEvent) =>{
    event.preventDefault();
    if (!event.dataTransfer || !event.dataTransfer.files.length) return; // 添加类型断言
    const file = event.dataTransfer.files[0];
    if (!isCoverFile(file)) {
        ElMessage('请上传图片文件');
        clearFileInput();
        return;
    }
    if (file.size > 1024 * 1024 * 10) {
        ElMessage('图片大小不能超过10MB');
        clearFileInput();
        return;
    }
    uploadCropperCover.value = await createFileBase64(file); // 获取图片URL
    isSelectCover.value = true;
    showPickBar.value = false;
    coverUrl.value = uploadCropperCover.value;
};
// 选择图片
const selectCover = () => {
    if (coverInput.value) {
        coverInput.value.click();
    }
};
// 输入图片文件获取
const handleCoverChange = async (event: Event) => {
    if (!event.target) return; // 添加类型断言
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    if (!isCoverFile(file)) {
        ElMessage('请上传图片文件');
        clearFileInput();
        return;
    }
    if (file.size > 1024 * 1024 * 10) {
        ElMessage('图片大小不能超过10MB');
        clearFileInput();
        return;
    }
    uploadCropperCover.value = await createFileBase64(file); // 获取图片URL
    isSelectCover.value = true;
    showPickBar.value = false;
    coverUrl.value = uploadCropperCover.value;
};
// 清除文件输入的值
const clearFileInput = () => {
  if (coverInput.value) {
    coverInput.value.value = ''; // 清除文件输入框的值
  }
};
// 完成截取封面
const complete = async() => {
    const opt = {
        imageSmoothingQuality: 'high',
    };
    const dataURL = cropper?.getDataURL(opt);
    if (!dataURL) return;
    const coverUrl16x9 = await cropImage16x9(dataURL);
    const cover4x3blob = await imgBlob(dataURL); // 将图片转成Blob
    const cover16x9blob = await imgBlob(coverUrl16x9); // 将图片转成Blob
    const identifier = await calculateBlobMD5(cover4x3blob); // 计算Blob的MD5
    const formData = new FormData();
    formData.append('identifier', identifier); // 封面文件唯一标识符（MD5）
    formData.append('coverFileName', identifier + ".webp"); // 当前分片索引
    formData.append('file4x3', cover4x3blob); //4x3封面
    formData.append('file16x9', cover16x9blob);  // 16x9封面
    const response = await uploadCoverApi(formData);
    if (response.code === 200) {
        const data = response.data as UploadCover;
        coverUploadUrl.coverpath4x3 = data.coverpath4x3;
        coverUploadUrl.coverpath16x9 = data.coverpath16x9;
        coverUploadUrl.coverUrl4x3 = data.coverUrl4x3;
        coverUploadUrl.coverUrl16x9 = data.coverUrl16x9;
        emit("CropperCover", coverUploadUrl.coverpath4x3, coverUploadUrl.coverpath16x9, dataURL, false);
    } else {
        console.error('封面上传出错');
    }
};
// 裁切16:9封面
const cropImage16x9 = async (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // 创建Image对象
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            if (!uploadVideoElement.value || !canvasElement.value) {
                reject(new Error('无法获取到canvas元素或input元素'));
                return;
            }
            // 从4:3图片裁剪16:9，宽度等于4:3的宽度
            const cropAspectRatio16x9 = 16 / 9;
            const targetWidth16x9 = image.naturalWidth; // 16:9的宽度等于4:3的宽度
            const targetHeight16x9 = targetWidth16x9 / cropAspectRatio16x9; // 计算16:9的高度
            const offsetY16x9 = (image.naturalHeight - targetHeight16x9) / 2; // 计算裁剪起始Y坐标，确保高度取自中间
            canvasElement.value.height = targetHeight16x9;
            canvasElement.value.width = targetWidth16x9;
            const context = canvasElement.value.getContext('2d');
            if (!context) {
                reject(new Error('无法获取到canvas上下文'));
                return;
            }
            context.drawImage(image, 0, offsetY16x9, targetWidth16x9, targetHeight16x9, 0, 0, targetWidth16x9, targetHeight16x9);
            const imgDataUrl16x9 = canvasElement.value.toDataURL('image/webp');
            resolve(imgDataUrl16x9);
        };
        image.onerror = (error) => {
            reject(error);
        };
    });
};

// 初始化封面，并截取视频中的几张图片
const initCover = async (url: string, totalFramesToCapture: number) => {
    if (!uploadVideoElement.value || !canvasElement.value) return;

    uploadVideoElement.value.src = url;
    uploadVideoElement.value.onloadedmetadata = async () => {
    if (!uploadVideoElement.value || !canvasElement.value) return;
        const videoDuration = uploadVideoElement.value.duration; // 视频总时长
        if (isNaN(videoDuration)) {
          return; // 获取时长失败
        }
        // 去掉视频的头尾各4秒
        const effectiveDuration = Math.max(0, videoDuration - 8); 

        // 计算每张截图之间的时间间隔，确保在有效时间段内均匀分布
        const intervalTime = effectiveDuration / (totalFramesToCapture - 1);
        let currentTime = 4; // 从第4秒开始截图

        for (let i = 0; i < totalFramesToCapture; i++) {
          await new Promise<void>(resolve => {
            if (!uploadVideoElement.value || !canvasElement.value) return;
                uploadVideoElement.value.currentTime = currentTime;
                uploadVideoElement.value.onseeked = () => {
                if (!uploadVideoElement.value || !canvasElement.value) return;
                canvasElement.value.width = uploadVideoElement.value.videoWidth;
                canvasElement.value.height = uploadVideoElement.value.videoHeight;
                requestAnimationFrame(() => {
                    if (!uploadVideoElement.value || !canvasElement.value) return;
                    const context = canvasElement.value.getContext('2d')!;
                    context.drawImage(uploadVideoElement.value, 0, 0);

                    const imgDataUrl = canvasElement.value.toDataURL('image/webp');
                    coverUrls.value.push(imgDataUrl); // 保存图片URL到数组
                    if (coverUrls.value.length === 1) {
                        coverUrl.value = imgDataUrl;
                        videoCropperCover.value = imgDataUrl;
                    }
                    currentTime += intervalTime; // 更新下次截图的时间点
                    resolve(); // 解决Promise，继续下一次循环
                });
            };
          });
        }
        isLoading.value = false;
        showPickBar.value = true;
    };
};
// 将输入的file对象转成DataURL
const createFileBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // 文件读取完成，reader.result 包含 base64 编码的字符串
      const base64String = reader.result as string;
      uploadCropperCover.value = base64String;
      resolve(base64String);
    };
    reader.onerror = reject;
    // 开始读取文件为 base64 格式
    reader.readAsDataURL(file);
  });
};
const startDrag = (e: MouseEvent | TouchEvent, eventType?: string) => {
    startX = eventType === 'touch' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    initialSliderX = sliderPosition.value;
    window.addEventListener('mousemove', dragging);
    window.addEventListener('mouseup', stopDrag);
}
const dragging = (e: MouseEvent | TouchEvent, eventType?: string) =>{
    if (!sliderContainerRef.value) return;
    const sliderRect = sliderContainerRef.value.getBoundingClientRect();
    const newX = eventType === 'touch' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    
    const newPosition = Math.max(0, Math.min(100, 
        ((newX - startX + initialSliderX /100 * sliderRect.width) / sliderRect.width) * 100
    ));
    sliderPosition.value = newPosition;   
}

const stopDrag = async() => {
    window.removeEventListener('mousemove', dragging);
    window.removeEventListener('mouseup', stopDrag);
    if (!uploadVideoElement.value || !canvasElement.value) return;
    const videoDuration = uploadVideoElement.value.duration; // 视频总时长
    const timeInSeconds = videoDuration * (sliderPosition.value / 100);
    await captureImageAtTime(timeInSeconds);
}

const captureImageAtTime = async (timeInSeconds: number) => {
    if (!uploadVideoElement.value || !canvasElement.value) return;
        uploadVideoElement.value.currentTime = timeInSeconds;
        uploadVideoElement.value.onseeked = () => {
            if (!uploadVideoElement.value || !canvasElement.value) return;
            canvasElement.value.width = uploadVideoElement.value.videoWidth;
            canvasElement.value.height = uploadVideoElement.value.videoHeight;
            requestAnimationFrame(() => {
                if (!uploadVideoElement.value || !canvasElement.value) return;
                const context = canvasElement.value.getContext('2d')!;
                context.drawImage(uploadVideoElement.value, 0, 0);

                const imgDataUrl = canvasElement.value.toDataURL('image/webp');
                coverUrl.value = imgDataUrl;
                videoCropperCover.value = imgDataUrl;
            });
        };
};

onUnmounted(() => {
  window.removeEventListener('mousemove', dragging); // 移除事件监听
  window.removeEventListener('mouseup', stopDrag); // 移除事件监听
  if (props.videoFile) {
    URL.revokeObjectURL(URL.createObjectURL(props.videoFile)); // 释放内存 销毁URL
  }
});
onMounted( async() => {
    if (props.videoFile) {
        initCover(URL.createObjectURL(props.videoFile), 7);
    }
});
</script>

<style scoped lang="scss">
.cropper-comp {
    height: auto;
    .cropper-tabs {
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
                margin-left: 40px;
            }
            .is_active {
                color: $theme-color;
                border-bottom: 3px solid $theme-color;
            }
        }
    }

    .cropper-content {
        width: 100%;
        box-sizing: border-box;
        padding: 0 32px;
        position: relative;

        .cover-select-content-pick {
            width: 100%;
            // height: 580px;
            height: auto;
            .cover-select-content-warp {
                display: flex;
                justify-content: space-between;
                margin: 24px 0 0;
                .cover-select-content-left {
                    width: 530px;
                    height: 100%;

                    .cover-cropper-left-text {
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

                    .cover-cropper-left-img {
                        height: 298px;
                        position: relative;

                        img {
                            width: 100%;
                        }                     
                        
                    }

                    .cover-cropper-left-tips {
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

                .cover-select-content-right {
                    width: 166px;
                    height: 100%;
                    .cover-cropper-right-text {
                        font-size: 14px;
                        margin: 0 0 17px;
                    }
                    .cover-cropper-right-preview-item {
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
                        .cover-cropper-right-img-preview-wrap {
                            width: 146px;
                            overflow: hidden;
                            border-radius: 4px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .cover-cropper-right-img-preview {
                                width: 100%;
                                height: 109.5px;
                                overflow: hidden;
                            }

                        }
                        .cover-cropper-right-img-preview-wrap-4x3 {
                            height: 109.5px;
                        }

                        .cover-cropper-right-img-preview-wrap-16x9 {
                            height: 82.1px;
                        }

                        &:hover {
                            background-color: #e5f5fb;
                        }
                    }
                }
            }

            .cover-select-content-pick-bar {
                box-sizing: border-box;
                .cover-slider {
                    margin: 67px 18px 0 18px;
                    height: 60px;
                    position: relative;

                    .cover-slider-list {
                        box-sizing: border-box;
                        display: flex;
                        width: 100%;
                        height: 60px;
                        overflow: hidden;
                        .cover-slider-image {
                            height: 100%;
                            width: 100px;

                            img {
                                width: 100%;
                            }
                        }
                    }

                    .slider-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 60px;
                        width: 100%;

                        .slider-dot {
                            position: absolute;
                            bottom: 0;
                            width: 8px;
                            height: 64px;
                            background-color: #ffffff;
                            border: 2px solid $theme-color;
                            border-radius: 4px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;

                            .slider-dot-hover {
                                box-sizing: border-box;
                                width: 4px;
                                height: 30%;
                                border-left: 2px solid $item-color-hover;
                                border-right: 2px solid $item-color-hover;
                            }
                        }
                    }
                    
                }
            }

            .cover-select-footer-pick {
                width: 100%;
                height: 66px;
                margin: 32px 0 0 0;
                .cover-select-footer-pick-btn {
                    display: flex;
                    justify-content: center;
                    .button {
                        height: 40px;
                        width: 128px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 6px;
                        background-color: $theme-color;
                        color: #ffffff;
                        cursor: pointer;

                        &:hover {
                            background-color: $theme-color-hover;
                        }
                    }
                }
            }
            
        }

        .cropper-loading {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 366px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
            background-color: #ffffff;
            .loading-bg {
                width: 36px;
                height: 36px;
                background-size: 100% 100%;
                background-position: 50%;
                background-repeat: no-repeat;
                background-image: url(@/assets/img/platform/cover_loading.webp);
                margin: 30px auto;
            }

        }

        .cover-select-content-upload-wrap {
            width: 100%;
            height: auto;
            .cover-select-content-upload-box {
                width: 500px;
                height: 260px;
                margin: 67px 118px 51px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                border: .5px dashed $theme-color;
                border-radius: 4px;
                cursor: pointer;
                img {
                    width: 105px;
                    height: 77px;
                    margin-top: 55px;
                }
                .upload-text-main {
                    font-size: 13px;
                    color: $theme-color;
                    margin: 16px 0 8px;
                }
                .upload-text-sub {
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 17px;
                    color: #9499a0;
                }
            }
            .cover-select-footer-upload-btn {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 40px;
                    .button {
                        height: 40px;
                        width: 128px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 6px;
                        background-color: $theme-color;
                        color: #ffffff;
                        cursor: pointer;

                        &:hover {
                            background-color: $theme-color-hover;
                        }
                    }
                }
        }
    }
}
</style>