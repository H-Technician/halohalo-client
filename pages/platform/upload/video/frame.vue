<template>
    <div class="video-upload">
        <!-- 导航栏 -->
        <div class="upload-tabs" :style="selectedVideo ? 'display: none' : ''">
            <ul>
                <li v-for="item in tabList" @click="activeUploadTab(item.path)" :class="isActiveUploadTab === item.path ? 'is_active' : ''">
                    {{ item.name  }}
                </li>
            </ul>
        </div>
        <!-- 选择文件界面 -->
        <div class="upload-body-container" :style="selectedVideo || isUploadVideoComplete ? 'display: none;' : ''">
            <div class="upload-wrp">
                <div class="video-input">
                    <div
                        class="video-input-wrapper"
                        @dragover.prevent
                        @dragenter.prevent
                        @dragleave.prevent
                        @drop.prevent
                        @drop="handleDrop"
                        @click="selectVideo"
                    >
                        <IconsPlatformUpload class="upload-icon"/>
                        <div class="upload-tips-text">拖拽到此处也可上传</div>
                        <div class="upload-btn">上传视频</div>
                        <div class="upload-audit">
                            <span>当前审核队列</span><button style="height: 24px; width: 40px; background-color: #45818e; border-radius: 2px; border: none; margin-left: 6px; color: #ffffff; font-family: 'HarmonyOS_Sans_SC_Medium'; cursor: pointer;">快速</button>
                        </div>
                        <input
                            type="file"
                            ref="videoInput"
                            @change="handleVideoChange"
                            style="display: none;"
                        >
                    </div>
                </div>
            </div>
            <div class="footer-item">
                <span class="i-list i-1">
                    <a target="_blank" class="title">禁止发布的视频内容</a>
                </span>
                <span class="i-list i-1">
                    <span class="title">视频大小</span>
                    <span class="title-block">
                        <span>网页端上传的文件大小上限为4G</span><br>
                        <span>视频内容时长最大4小时</span><br>
                    </span>
                </span>
                <span class="i-list i-1">
                    <span class="title">视频格式</span>
                    <span class="title-block">
                        <span>网页端、桌面客户端推荐上传的格式为：mp4</span><br>
                        <span>（推荐上传的格式在转码过程更有优势，审核过程更快哦！）</span><br>
                        <span>其他允许上传的格式：mp4，mov，mkv，m4v</span>
                    </span>
                </span>
                <span class="i-list i-1">
                    <span class="title">视频码率</span>
                    <span class="title-block">
                        <span>分辨率最大支持 3840*2160</span><br>
                        <span>推荐视频分辨率：1920*1080或者1280*720</span><br>
                        <span>推荐视频码率：1080p大于6000kbps；4k大于20000kbps；</span><br>
                        <span>网站提供转码、压制服务</span><br>
                        <span>音频采样率48000Hz</span><br>
                        <span>推荐音频码率：320kbps</span>
                    </span>
                </span>
            </div>
            <div class="footer-item">
                <span>上传视频，即表示您已同意 <a target="_blank">哈喽哈喽使用协议</a> 与 <a target="_blank">哈喽哈喽社区公约</a> ，请勿上传色情，反动等违法视频。</span>
            </div>
            <div class="footer-item">
                <span class="i-list">第三方工具</span>
                <span class="i-list i-2">
                    <el-icon><ElIconDownload class="download-tool"/></el-icon>
                    <a class="zip" href="">视频压制工具</a>
                </span>
            </div>
        </div>
        <!-- 填写投稿信息界面 -->
        <div class="upload-info-body-container" :style="selectedVideo ? '' : 'display: none;'">
            <div class="video-file">
                <div class="title-block">
                    <span>{{ videoName }}</span>
                </div>
                <div class="file-block">
                    <IconsPlatformVideoFile class="video-file-icon"/>
                    <div class="file-block-detail">
                        <div class="file-block-status">
                            <div class="file-block-status-text" v-if="!isUploadVideoSuccess">
                                <span class="process">已经上传：{{ (uploadVideoSize/(1024 * 1024)) >= 1024 ?
                                (uploadVideoSize/(1024 * 1024 * 1024)).toFixed(2) :
                                (uploadVideoSize/(1024 * 1024)).toFixed(2) }} 
                                {{ (uploadVideoSize/(1024 * 1024)) >= 1024 ? 'GB' : 'MB' }}
                                /
                                {{ (videoSize/(1024 * 1024)) >= 1024 ?
                                (videoSize/(1024 * 1024 * 1024)).toFixed(2) :
                                (videoSize/(1024 * 1024)).toFixed(2) }}
                                {{ (videoSize/(1024 * 1024)) >= 1024 ? 'GB' : 'MB' }}
                                </span>
                                <span class="process time">{{ (uploadSpeed/(1024 * 1024)).toFixed(2) }}MB/S</span>
                                <span class="process time">剩余时间：{{ uploadRemainingTime }}秒</span>
                            </div>
                            <div class="file-block-status-text" v-if="isUploadVideoSuccess">
                                <el-icon size="20" color="#67c23a"><ElIconSuccessFilled /></el-icon>
                                <span :class="statusText === '上传完成' ? 'success' : 'process'">{{ statusText }}</span>
                            </div>
                            <div class="file-block-status-manage file-block-status-manage-refresh" v-if="!isUploadVideoSuccess">
                                <span class="process percentage">{{ progress }}%</span>
                                <IconsPlatformSuspend class="file-block-status-manage-icon" @click="pauseUpload" v-if="!isPauseUpload"/>  
                                <!-- 暂停 -->
                                <IconsPlatformPlay class="file-block-status-manage-icon" @click="pauseUpload" v-else/>
                                <!-- 继续 -->
                                <IconsPlatformRefreshSmall class="file-block-status-manage-icon" @click="refreshUpload"/>
                            </div>
                            <div class="file-block-status-manage file-block-status-manage-refresh" @click="refreshVideo" v-else>
                                <IconsPlatformRefresh class="file-block-status-manage-icon"/>
                                <span class="success">更换视频</span>
                            </div>
                        </div>
                        <div class="file-block-progress">
                            <div class="file-progress-inner"
                                :class="isUploadVideoSuccess ? 'success-bg' : 'doing-bg'"
                                :style="`width: ${progress}%;`">
                            </div>
                        </div>
                    </div>
                </div>
                <video muted crossorigin="anonymous" ref="uploadVideoElement" style="display: none"></video>
                <canvas ref="canvasElement" style="display: none"></canvas>
                <!-- 投稿信息 -->
                <div class="upload-form">
                    <div class="form-title">基本设置</div>
                    <!-- 封面 -->
                    <div class="form-item">
                        <div class="cover">
                            <div class="section-title-container section-title">
                                <p class="section-title-deg">
                                    <span>*</span>
                                </p>
                                <span class="section-title-content-main">封面</span>
                            </div>
                            <div class="cover-content">
                                <div class="cover-upload" v-if="coverUrls4x3[0]">
                                    <img :src="coverSelectedUrl" alt="默认第一张封面" v-show="coverSelectedUrl"/>
                                    <div class="cover-upload-mask-btn cover-upload-mask">
                                    </div>
                                    <div class="cover-upload-mask-btn">
                                        <span @click="changeCover">更改封面</span>
                                        <!-- <span>封面模板</span> -->
                                    </div>
                                </div>
                                <div class="bcc-upload upload" v-else>
                                    <div class="bcc-upload-mask-btn" @click="selectCover">
                                        <el-icon size="30" color="silver" class="upload-mask-btn-icon"><ElIconPlus /></el-icon>
                                        <span>上传封面</span>
                                        <input
                                            type="file"
                                            ref="coverInput"
                                            @change="handleCoverChange"
                                            style="display: none;"
                                        >
                                    </div>
                                </div>
                                <div class="cover-preview" v-if="coverUrls4x3[0]">
                                    <div class="cover-preview-des">
                                        系统默认选中第一帧为视频封面，以下为更多智能推荐封面
                                    </div>
                                    <div class="cover-preview-list">
                                        <div class="cover-preview-item"  :class="index === coverIndex ? 'cover-preview-item-selected' : '' " v-for="(item, index) in coverUrls4x3" @click="selectedCover(index)">
                                            <div class="cover-preview-item-selected-mask" v-if="index === coverIndex">
                                                <IconsPlatformSelect style=" width: 20px; height: 20px; position: absolute; top: calc(50% - 10px); left: calc(50% - 10px); fill: #00aeec;"/>
                                            </div>
                                            <img :src="item" :alt="`系统默认第${index + 1}张封面图片`" v-show="item"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 封面裁剪弹层 -->
                    <DialogDiaLog :showDialog="isShowChangeCover" @isShowDialog="isShowDialogEmit" width="800">
                        <template #content>
                            <CropperComp :videoFile="inputFile ? inputFile as File : undefined" @CropperCover="cropperCoverChang"/>
                        </template>
                    </DialogDiaLog>
                    <!-- 标题 -->
                    <div class="form-item-title">
                        <div class="section-title-container section-title">
                            <div class="section-title">
                                <span class="section-title-deg">*</span>
                                <span class="section-title-main">标题</span>
                            </div>
                            <el-input
                                class="section-title-input"
                                maxlength="80"
                                placeholder="清晰明了表明内容亮点的标题会更受观众欢迎哟！"
                                show-word-limit
                                type="text"
                                v-model="title"
                            />
                        </div>
                    </div>
                    <!-- 类型 -->
                    <div class="form-item-type">
                        <div class="section-type-container section-type">
                            <div class="section-type">
                                <span class="section-type-deg">*</span>
                                <span class="section-type-main">类型</span>
                            </div>
                            <div class="type-check-radio-wrp">
                                <div class="check-radio-container" @click="type = 0">
                                    <div class="check-radio-box">
                                        <div class="check-radio-box-checked" v-show="type === 0">
                                        </div>
                                    </div>
                                    <span :class="type === 0 ? 'checked' : ''">自制</span>
                                </div>
                                <div class="check-radio-container" @click="type = 1">
                                    <div class="check-radio-box">
                                        <div class="check-radio-box-checked" v-show="type === 1">
                                        </div>
                                    </div>
                                    <span :class="type === 1 ? 'checked' : ''">转载</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 分区 -->
                    <div class="form-item-category">
                        <div class="section-category-container section-category">
                            <div class="section-category">
                                <span class="section-category-deg">*</span>
                                <span class="section-category-main">分区</span>
                            </div>
                            <div class="section-category-select-box">
                                <CategoryselectCategorySelect @SelectCategory = "SelectCategory" />
                            </div>
                        </div>
                    </div>
                    <!-- 标签 -->
                    <div class="form-item-tag">
                        <div class="section-tag-container-warp section-tag">
                            <div class="section-tag">
                                <span class="section-tag-deg">*</span>
                                <span class="section-tag-main">标签</span>
                            </div>
                            <div class="section-tag-container">
                                <TaginputTagInput :sendTag="sendTag" @updateTags="updateTags"/>
                            </div>
                        </div>
                        <!-- 推荐标签 -->
                        <div class="tag-wrp" v-if="rcmTags.length !== 0">
                            <p class="tag-label">推荐标签:</p>
                            <div class="tag-list">
                                <div
                                    class="hot-tag-container"
                                    :class="tags.findIndex(curr=>curr==item) != -1 ? 'isTagSelected' : ''"
                                    @click="sendTag=item"
                                    v-for="(item, index) in rcmTags"
                                    :key="index"
                                >
                                    <div class="hot-tag-item">
                                        <span>{{ item }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tag-wrp" v-if="rcmTags.length !== 0">
                            <p class="tag-label">参与话题:</p>
                            <div class="tag-list">
                                <div
                                    class="hot-tag-container"
                                    :class="tags.findIndex(curr=>curr==item) != -1 ? 'isTagSelected' : ''"
                                    @click="sendTag=item"
                                    v-for="(item, index) in rcmTags"
                                    :key="index"
                                >
                                    <div class="hot-tag-item">
                                        <IconsPlatformTopic class="icon-topic" />
                                        <span>{{ item }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 简介 -->
                    <div class="form-item-descr">
                        <div class="section-descr-container section-descr">
                            <div class="section-descr">
                                <span class="section-descr-main">简介</span>
                            </div>
                            <el-input
                                class="desc-text"
                                type="textarea"
                                maxlength="2000"
                                show-word-limit
                                v-model="descr"
                                resize="none"
                                placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧:)"
                                input-style="height: 156px;"
                            ></el-input>
                        </div>
                    </div>
                    <!-- 定时发布 -->
                    <div class="form-item-timed">
                        <div class="section-timed-container-warp section-timed">
                            <div class="section-timed">
                                <span class="section-timed-main">定时发布</span>
                            </div>
                            <div class="section-timed-container">
                                <div class="switch-box">
                                    <el-switch 
                                    class="section-switch"
                                    v-model="scheduled"
                                    />
                                </div>
                                <span class="timed-switch-wrp-text"> 
                                    (当前+2小时 ≤ 可选时间 ≤ 当前+15天，花火稿件使用定时发布不支持修改/取消) 
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- 加入合集 -->
                    <div class="form-item-season">
                        <div class="section-season-container-warp section-season">
                            <div class="section-season">
                                <span class="section-season-main">加入合集</span>
                            </div>
                            <div class="section-season-container">
                                <div class="video-season-text">合集功能可用于收集整理系列性稿件</div>
                                <div class="video-season-button" @click="showCollection">
                                    <el-icon><ElIconPlus /></el-icon>添加集合
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 合集弹层 -->
                    <DialogDiaLog :showDialog="isShowCollection" @isShowDialog="isShowCollectionEmit" width="600">
                        <template #content>
                            <span>集合弹层</span>
                        </template>
                    </DialogDiaLog>
                    <div class="form-title" @click="isSettingMore = !isSettingMore">
                        更多设置
                        <span>（含声明与权益、视频元素、互动管理等）</span>
                        <el-icon size="12" color="#9499a0" style="transition:transform 0.3s linear;" :style="[{transform: isSettingMore ? 'rotate(180deg)' : ''}]">
                                <ElIconArrowDownBold />
                        </el-icon>
                    </div>
                    <div class="video-setting-more" v-show="isSettingMore">
                        <div class="setting-card video-setting-card">
                            <div class="video-setting-title">
                                <span>声明与权益</span>
                            </div>
                            <div class="video-setting-content">
                                <div class="setting-label">
                                    <span class="setting-label-main" style="margin-right: 37px;">自制声明</span>
                                    <input type="checkbox" class="bcc-checkbox-checkbox">
                                    <span class="setting-label-main setting-text" style="margin-left: 10px;">未经作者授权 禁止转载</span>
                                </div>
                                <div class="setting-label">
                                    <span class="setting-label-main" style="margin-right: 24px;">创作者声明</span>
                                    <div class="auth-select-box">
                                        <Select @SelectAuth="SelectAuth"></Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="setting-card video-setting-card">
                            <div class="video-setting-title">
                                <span>视频元素</span>
                            </div>
                            <div class="video-setting-content">
                                <div class="setting-label">
                                    <span class="setting-label-main" style="margin-right: 37px;">卡片设置</span>
                                    <div class="button-blueLine "><el-icon><ElIconPlus /></el-icon>个性化设置</div>
                                </div>
                            </div>
                        </div>
                        <div class="setting-card video-setting-card">
                            <div class="video-setting-title">
                                <span>互动管理</span>
                            </div>
                            <div class="video-setting-content">
                                <div class="setting-label">
                                    <span class="setting-label-main" style="margin-right: 37px;">互动设置</span>
                                    <input type="checkbox" class="bcc-checkbox-checkbox">
                                    <span class="setting-label-main setting-text">关闭弹幕</span>
                                    <input type="checkbox" class="bcc-checkbox-checkbox">
                                    <span class="setting-label-main setting-text">关闭评论</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item-submit">
                        <div class="submit-container submit-draft" @click="submitDraft">
                            <span>存草稿</span>
                        </div>
                        <div class="submit-container submit-publish" @click="submit">
                            <span>立即投稿</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>
         <!-- 投稿完成 -->
          <div class="video-complete" v-if="isUploadVideoComplete">
            <div class="video-complete-container">
                <div class="content-wrapper">
                    <div class="bg"></div>
                    <div class="step-des">
                        稿件投递成功
                    </div>
                    <div class="op-buttons">
                        <div class="left-wrapper">
                            <button class="btn-left">
                                <span>查看稿件</span>
                            </button>
                        </div>
                        <div class="right-wrapper">
                            <button class="btn-right">
                                <span>再投一个</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    </div>
</template>
<script setup lang="ts">
import type { FileChunk, UploadProgress, UploadCover, UploadVideo } from '@/types/upload';
import { getChunkApi, 
    uploadChunkApi, 
    chunkMergeApi, 
    uploadCoverApi, 
    contributeVideoApi,
    draftVideoApi
 } from '@/api/upload';
import { imgBlob } from '@/utils/imgBlob';
import { calculateBlobMD5 } from '@/utils/md5'
import { useUploadVideoStore, useIsSubmitUploadVideoStore } from '@/stores/uploadVideoStore';
const uploadVideoStore = useUploadVideoStore(); // 初始化/获取上传视频store
const submitUploadVideoStore = useIsSubmitUploadVideoStore();
const videoInput =ref<HTMLInputElement | null>(null); // 视频上传input
const coverInput =ref<HTMLInputElement | null>(null); // 封面上传input
const uploadVideoElement = ref<HTMLVideoElement | null>(null); // 原生video元素,用于播放视频截取封面图片
const canvasElement = ref<HTMLCanvasElement | null>(null); // canvas元素
const auth = ref(''); // 创作声明
const title = ref('');
const descr = ref(''); // 视频描述/简介
const scheduled = ref(false); // 是否定时发布
const sendTag = ref(''); // 选中标签
const tags = ref<string[]>([]); // 标签
const type = ref(0); // 初始是否选中   用于选择视频类型
const rcmTags = ref(['学习', '生活', '记录', '娱乐', '幽默', '万恶之源', '搞笑', '记录', '原神', '吐槽', '新人', '直播', '原创']); // 初始化推荐标签
const updateTags = (updateTags: string[]) => { // 更新标签列表/选择标签回调
    tags.value = updateTags;
};
const categoryId = ref(1); // 初始分类id
const subCategoryId = ref(81); // 初始化子分类id
const selectedVideo =ref(false); // 是否选择视频
const progress = ref(0); // 初始上传进度
const uploadSpeed = ref(0); // 初始上传速度
const uploadRemainingTime = ref(0); // 初始剩余时间
const videoSize = ref(0); // 初始视频大小
const uploadVideoSize = ref(0); // 初始已经上传视频大小
const isUploadVideoSuccess = ref(false); // 是否上传成功
const statusText = ref(''); // 初始状态文本
const isSettingMore = ref(false); // 是否显示更多设置
const coverUrls4x3 = ref<string[]>([]); // 定义一个数组来保存封面图片URL
const coverUrls16x9 = ref<string[]>([]); // 定义一个数组来保存封面图片URL
const coverSelectedUrl = ref(''); // 定义一个变量来保存选中的封面图片URL
const videoName = ref(''); // 视频名称
const coverIndex = ref(0); // 定义一个变量来保存选中的封面图片索引
const isPauseUpload = ref(false); //是否暂停上传
const numberChunks = ref(0); // 分片总数
const identifier = ref(''); // 唯一标识符 由后端返回
const inputFile = ref<File | null>(null); // 待上传视频文件
let chunkSize = 1024 * 1024 * 3; // 分片的大小
const duration = ref(0); // 视频总时长
const controller = ref(new AbortController()); // 创建一个AbortController实例
const signal = ref(controller.value.signal); // 获取AbortSignal实例
const isShowChangeCover = ref(false) // 是否显示更换封面弹层
const isShowCollection = ref(false) // 是否显示收藏弹层
const url = ref(''); // 视频文件url
let coverUrl: UploadCover = {
    coverUrl4x3: '',
    coverpath4x3: '',
    coverUrl16x9: '',
    coverpath16x9: '',
};
const isUploadVideoComplete = ref(false);
// 获取路由实例
const router = useRouter();
const isActiveUploadTab = ref('/platform/upload/video/frame');
const activeUploadTab = (routerPath: string) => {
    if (isActiveUploadTab.value !== routerPath) {
        router.push(routerPath);
        isActiveUploadTab.value = routerPath;
    }
};
// 点击选择上传视频文件
const handleVideoChange = async (event: Event) => {
    if (!event.target) return; // 添加类型断言
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    if (file.size > 1024 * 1024 * 1024 * 4) {
        ElMessage.success('视频大小不能超过4GB');
        clearFileInput();
        return;
    }
    await uploadVideoChunks(file);

};

const handleCoverChange = () => {

}

// 拖拽上传文件
const handleDrop = async (event: DragEvent) =>{
    event.preventDefault();
    if (!event.dataTransfer || !event.dataTransfer.files.length) return; // 添加类型断言
    const file = event.dataTransfer.files[0];
    if (file.size > 1024 * 1024 * 1024 * 4) {
        ElMessage.success('视频大小不能超过4GB');
        clearFileInput();
        return;
    }
    await uploadVideoChunks(file);
};

// 选择视频
const selectVideo = () => {
    if (videoInput.value) {
        videoInput.value.click();
    }
};
// 选择视频封面
const selectCover = () => {
    if (coverInput.value) {
        coverInput.value.click();
    }
};
// 选中系统默认的图片
const selectedCover = async (index: number) => {
    coverIndex.value = index;
    coverSelectedUrl.value = coverUrls4x3.value[index];
    await uploadCover(index);
}
// 判断视频文件格式类型
const isVideoFile = (file: File): boolean => {
    const videoExtensions = ['mp4', 'm4v', 'mkv', 'mov']; // 支持的视频文件扩展名
    const fileExtension = file.name.toLowerCase().split('.').pop(); // 获取文件扩展名并转换为小写
    if (!fileExtension) {
        return false;
    }
    return videoExtensions.includes(fileExtension);
};

// 计算分片数量
const calculateChunkCount = (file: File, chunkSize: number): number =>{
  // 计算分片数量，使用向上取整确保所有数据都被包含
  return Math.ceil(file.size / chunkSize);
}

// 获取文件信息并准备上传
const uploadVideoChunks = async (file: File) => {
    // 初始化内容
    init();
    controller.value = new AbortController();
    signal.value = controller.value.signal; // 初始化AbortSignal实例
    url.value = URL.createObjectURL(file);
    const isVideo = isVideoFile(file);
    if (isVideo) {
        submitUploadVideoStore.setSubmitVideo(false);
        await initCover(url.value, 4); // 获取视频封面
        videoName.value = file.name;
        selectedVideo.value = true;
        videoSize.value = file.size;
        inputFile.value = file;
        initTitle();
        // const md5Value = await getFileMD5ByChunks(file);
        // videoMd5.value = md5Value;
        const numberOfChunks = calculateChunkCount(file, chunkSize);
        numberChunks.value = numberOfChunks;
        // console.log(file.name);
        const data = {
            filename: file.name, 
            totalChunks: numberOfChunks,
            totalSize: file.size
        }; 
        const response = await getChunkApi(data);      
        if (response.code === 200) {
            const resData = response.data as FileChunk
            if (resData.skipUpload) {
                identifier.value = resData.identifier
                // console.log('文件已上传');
                isUploadVideoSuccess.value = true;
                progress.value = 100;

                statusText.value = '上传完成';
                return;
            }  else if (resData.uploaded && !resData.skipUpload) {
                identifier.value = resData.identifier
                await continueUpload();
                return;
            }
            identifier.value = resData.identifier; // 获取上传标识符
            await uploadChunks(
            file, 
            numberOfChunks, 
            chunkSize, 
            resData.identifier);
        }
    } else {
        ElMessage.error('请选择正确的视频文件');
        clearFileInput();
    }
};
 // 分片上传
const uploadVideo = async (
    chunkFile: Blob,  // 分片文件
    identifier: string, // 文件唯一标识符（MD5）
    numberOfChunks: number, // 当前分片索引
    totalChunks: number, // 分片总数
    totalSize: number, // 文件总大小
    filename: string // 文件名
    ) => {
    const formData = new FormData();
    formData.append('identifier', identifier); // 文件唯一标识符（MD5）
    formData.append('chunkNumber', numberOfChunks.toString()); // 当前分片索引
    formData.append('file', chunkFile); //分片文件
    formData.append('totalChunks', totalChunks.toString());  // 分片总数
    formData.append('totalSize', totalSize.toString());    // 文件总大小
    formData.append('filename', filename);     // 文件名
    await uploadChunkApi(formData, signal.value);
};

// 清除文件输入的值
const clearFileInput = () => {
  if (videoInput.value) {
    videoInput.value.value = ''; // 清除文件输入框的值
  }
};
// 计算文件上传进度
const calculateSpeedAndRemainingTime = (progress: UploadProgress): { speed: number, remainingTime: number } => {
    const elapsedTime = performance.now() - progress.startTime; // 单位：毫秒
    const speed = (progress.bytesUploaded / elapsedTime) * 1000; // 转换为字节/秒
    const remainingBytes = progress.totalSize - progress.bytesUploaded;
    const remainingTime = Math.ceil(remainingBytes / speed); // 剩余时间，向上取整为秒
    return { speed, remainingTime };
}
// 更换视频
const refreshVideo = () => {
    if (videoInput.value) {
        videoInput.value.click();
    }

}
// 初始化封面，并截取视频中的几张图片
const initCover = async (url: string, totalFramesToCapture: number) => {
    if (!uploadVideoElement.value || !canvasElement.value) return;
    uploadVideoElement.value.src = url;
    uploadVideoElement.value.onloadedmetadata = async () => {
    if (!uploadVideoElement.value || !canvasElement.value) return;
        const videoDuration = uploadVideoElement.value.duration; // 视频总时长
        duration.value = videoDuration;
        uploadVideoStore.setDuration(duration.value);
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
                // 等待视频准备好再在画布上绘制
                requestAnimationFrame(() => {
                    if (!uploadVideoElement.value || !canvasElement.value) return;
                    const context = canvasElement.value.getContext('2d')!;

                    // 首先裁剪为4:3
                    const videoAspectRatio = uploadVideoElement.value.videoWidth / uploadVideoElement.value.videoHeight;
                    const cropAspectRatio4x3 = 4 / 3;

                    let cropWidth4x3, cropHeight4x3;
                    if (videoAspectRatio >= cropAspectRatio4x3) {
                        if (!uploadVideoElement.value || !canvasElement.value) return;
                        // 视频宽足够，按宽度裁剪
                        cropHeight4x3 = uploadVideoElement.value.videoHeight;
                        cropWidth4x3 = cropHeight4x3 * cropAspectRatio4x3;
                        const offsetX4x3 = (uploadVideoElement.value.videoWidth - cropWidth4x3) / 2;
                        canvasElement.value.height = cropHeight4x3;
                        canvasElement.value.width = cropWidth4x3;
                        context.drawImage(uploadVideoElement.value, offsetX4x3, 0, cropWidth4x3, cropHeight4x3, 0, 0, cropWidth4x3, cropHeight4x3);
                    } else {
                        if (!uploadVideoElement.value || !canvasElement.value) return;
                        // 视频太窄，按高度裁剪
                        cropWidth4x3 = uploadVideoElement.value.videoWidth;
                        cropHeight4x3 = cropWidth4x3 / cropAspectRatio4x3;
                        const offsetY4x3 = (uploadVideoElement.value.videoHeight - cropHeight4x3) / 2;
                        canvasElement.value.height = cropHeight4x3;
                        canvasElement.value.width = cropWidth4x3;
                        context.drawImage(uploadVideoElement.value, 0, offsetY4x3, cropWidth4x3, cropHeight4x3, 0, 0, cropWidth4x3, cropHeight4x3);
                    }
                    const imgDataUrl = canvasElement.value.toDataURL('image/webp');
                    coverUrls4x3.value.push(imgDataUrl);
                    coverSelectedUrl.value = coverUrls4x3.value[0];
                    // 从4:3图片裁剪16:9，宽度等于4:3的宽度
                    const cropAspectRatio16x9 = 16 / 9;
                    const targetWidth16x9 = cropWidth4x3; // 16:9的宽度等于4:3的宽度
                    const targetHeight16x9 = targetWidth16x9 / cropAspectRatio16x9; // 计算16:9的高度
                    const offsetY16x9 = (cropHeight4x3 - targetHeight16x9) / 2; // 计算裁剪起始Y坐标，确保高度取自中间
                    canvasElement.value.height = targetHeight16x9;
                    canvasElement.value.width = targetWidth16x9;
                    // 绘制裁剪后的16:9到画布
                    // 创建Image对象
                    const image = new Image();
                    image.src = imgDataUrl;
                    image.onload = async () => {
                        if (!uploadVideoElement.value || !canvasElement.value) return;
                        context.drawImage(image, 0, offsetY16x9, targetWidth16x9, targetHeight16x9, 0, 0, targetWidth16x9, targetHeight16x9);

                        const imgDataUrl16x9 = canvasElement.value.toDataURL('image/webp');
                        coverUrls16x9.value.push(imgDataUrl16x9);
                    };

                    currentTime += intervalTime; // 更新下次截图的时间点
                    resolve(); // 解决Promise，继续下一次循环
                });
            };
          });
        }
        await uploadCover(0);
        // console.log(coverUrls16x9.value[0]);
    };
};
// 暂停上传
const pauseUpload = async() => {
    if (isPauseUpload.value) {
        isPauseUpload.value = false;
        await continueUpload(); // 继续上传
    } else {
        isPauseUpload.value = true;
        // 取消请求
        controller.value.abort();
        
    }
}
// 继续上传
const continueUpload = async() => {
    controller.value = new AbortController();
    signal.value = controller.value.signal; // 初始化AbortSignal实例
    const chunkdata = {
        filename: videoName.value, 
        totalChunks: numberChunks.value,
        totalSize: videoSize.value
    };
    const response = await getChunkApi(chunkdata);
    if (response.code === 200) {
        const data = response.data as FileChunk;
        if (data.skipUpload) { //已经上传完成 跳过上传
            isUploadVideoSuccess.value = true;
            progress.value = 100;
            statusText.value = '上传完成';
            return;
        } else {
            if (inputFile.value == null) {
                return;
            }
            const uploaded: number[] = data.uploaded;
            // 过滤出未上传的分片索引
            const unuploadedChunks = Array.from({ length: numberChunks.value }, (_, index) => index)
                .filter(index => !uploaded.includes(index));
            //初始化速度和进度条
            let uploadProgress: UploadProgress = {
                startTime: performance.now(),
                bytesUploaded: chunkSize * uploaded.length,
                totalSize: inputFile.value.size,
            };
            for(const unuploadedIndex of unuploadedChunks) {
                const start = unuploadedIndex * chunkSize;
                const end = Math.min(start + chunkSize, inputFile.value.size);
                const chunk = inputFile.value.slice(start, end);
                await uploadVideo(chunk, data.identifier, unuploadedIndex, numberChunks.value, inputFile.value.size, inputFile.value.name);
                if (isPauseUpload.value) {
                    return; // 暂停上传
                }
                if (unuploadedIndex < (numberChunks.value - 1)) {
                    uploadProgress.bytesUploaded += chunkSize;
                } else if (unuploadedIndex === (numberChunks.value - 1)){
                    // 计算所有完整分片的总大小
                    const fullChunksSize = (numberChunks.value - 1) * chunkSize;
                    // 最后一个分片的大小
                    const lastChunkSize = inputFile.value.size - fullChunksSize;
                    uploadProgress.bytesUploaded = lastChunkSize;
                }
                // 更新上传进度状态
                const { speed, remainingTime } = calculateSpeedAndRemainingTime(uploadProgress);
                progress.value = Math.ceil(uploadProgress.bytesUploaded/inputFile.value.size * 100);
                uploadVideoSize.value = uploadProgress.bytesUploaded;
                uploadSpeed.value = speed;
                uploadRemainingTime.value = remainingTime;
            }
            progress.value = 100;
            uploadSpeed.value = inputFile.value.size;
            uploadRemainingTime.value = 0;
            isUploadVideoSuccess.value = true;
            const chunkMergeData = { 
                identifier: data.identifier, 
                filename: inputFile.value.name, 
                totalChunks: numberChunks.value 
            };
            const re = await chunkMergeApi(chunkMergeData);
            if (re.code === 200) {
                statusText.value = '上传完成';
            } else if (re.code === 500){
                statusText.value = '视频合并出现错误，请重新上传';
            }
        }
    }
}
// 按顺序依次上传视频分片
const uploadChunks = async (file: File, 
    numberOfChunks: number, 
    chunkSize: number, 
    identifier: string
    ) => {
    // 初始化速度和进度条
    let uploadProgress: UploadProgress = {
        startTime: performance.now(),
        bytesUploaded: 0,
        totalSize: file.size,
    };
    for(let i = 0; i < numberOfChunks && !isPauseUpload.value; i++) {
        // 计算当前片的开始和结束位置
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);    
        // 读取文件的当前片
        const chunk = file.slice(start, end);
        await uploadVideo(chunk, identifier, i, numberOfChunks, file.size, file.name);
        if (isPauseUpload.value) {
            return; // 暂停上传
        }
        if (i < (numberOfChunks - 1)) {
            uploadProgress.bytesUploaded += chunkSize;
        } else {
            // 计算所有完整分片的总大小
            const fullChunksSize = (numberOfChunks - 1) * chunkSize;
            // 最后一个分片的大小
            const lastChunkSize = file.size - fullChunksSize;
            uploadProgress.bytesUploaded = lastChunkSize;
        }
        const { speed, remainingTime } = calculateSpeedAndRemainingTime(uploadProgress);
        progress.value = Math.ceil(uploadProgress.bytesUploaded/file.size * 100);
        uploadVideoSize.value = uploadProgress.bytesUploaded;
        uploadSpeed.value = speed;
        uploadRemainingTime.value = remainingTime;
    }
    progress.value = 100;
    uploadSpeed.value = file.size;
    uploadRemainingTime.value = 0;
    isUploadVideoSuccess.value = true;
    const chunkMergeData = { 
        identifier: identifier, 
        filename: file.name, 
        totalChunks: numberOfChunks 
    };
    const re = await chunkMergeApi(chunkMergeData);
    if (re.code === 200) {
        statusText.value = '上传完成';
    } else if (re.code === 500){
        statusText.value = '视频合并出现错误，请重新上传';
    }
};

//重新上传视频
const refreshUpload = async () => {
    if (!inputFile.value) {
        return;
    }
    // 暂停正在的上传请求
    if (!isPauseUpload.value) {
        isPauseUpload.value = true;
        // 取消请求
        controller.value.abort();
    }
    // 初始化进度条
    progress.value = 0;
    uploadSpeed.value = 0;
    uploadRemainingTime.value = 0;
    uploadVideoSize.value = 0;
    isPauseUpload.value = false;
    controller.value = new AbortController();
    signal.value = controller.value.signal; // 初始化AbortSignal实例
    await uploadChunks(inputFile.value, 
    numberChunks.value, 
    chunkSize, 
    identifier.value);
}
// 初始化内容
const init = () =>{
    progress.value = 0;
    uploadSpeed.value = 0;
    uploadRemainingTime.value = 0;
    uploadVideoSize.value = 0;
    isUploadVideoSuccess.value = false;
    videoName.value = '';
    coverIndex.value = 0;
    coverUrls4x3.value = [];
    coverUrls16x9.value = [];
    coverSelectedUrl.value = '';
    statusText.value = '正在合并视频，请稍等';
    isPauseUpload.value = false;
    numberChunks.value = 0;
    identifier.value = '';
    url.value = '';
};

// 初始化标题等
const initTitle = () => {
    if (inputFile.value) {
        title.value = inputFile.value.name.toString().replace(/\.[^\.]+$/, "");
    }
}
const SelectAuth = (authItem: string) => {
    auth.value = authItem;
}
// 上传视频封面
const uploadCover = async (index: number) => {
    // 将图片转成Blob
    const cover4x3blob = await imgBlob(coverUrls4x3.value[index]);
    const cover16x9blob = await imgBlob(coverUrls16x9.value[index]);
    const identifier = await calculateBlobMD5(cover4x3blob);
    const formData = new FormData();
    formData.append('identifier', identifier); // 封面文件唯一标识符（MD5）
    formData.append('coverFileName', identifier + ".webp"); // 当前分片索引
    formData.append('file4x3', cover4x3blob); // 4x3封面
    formData.append('file16x9', cover16x9blob);  // 16x9封面
    const response = await uploadCoverApi(formData);
    if (response.code === 200) {
        const data = response.data as UploadCover;
        coverUrl.coverpath4x3 = data.coverpath4x3;
        coverUrl.coverpath16x9 = data.coverpath16x9;
        coverUrl.coverUrl4x3 = data.coverUrl4x3;
        coverUrl.coverUrl16x9 = data.coverUrl16x9;
    } else {
        console.error('封面上传出错');
    }
};

// 提交投稿
const submit = async () => {
    if (title.value === '' ) {
        ElMessage.error('∑(°^°) 请输入稿件标题...') 
        return;
    }
    if (tags.value.length === 0 ) {
        ElMessage.error('∑(°^°) 至少填写一个标签吧...') 
        return;
    }
    await submitVideo();
};
// 提交为草稿
const submitDraft = async () => {
    await submitDraftVideo();
};

// 投稿请求
const submitVideo = async () => {
    const data: UploadVideo = {
        original: identifier.value,
        title: title.value,
        type: type.value,
        auth: auth.value,
        duration: duration.value,
        category_id: categoryId.value,
        sub_category_id: subCategoryId.value,
        tags: tags.value.join(','),
        descr: descr.value,
        cover_url4x3: coverUrl.coverpath4x3,
        cover_url16x9: coverUrl.coverpath16x9,
    }
    const response = await contributeVideoApi(data);
    if (response.code === 200) {
        upDateUrl();
        selectedVideo.value = false;
        isUploadVideoComplete.value = true;
        URL.revokeObjectURL(url.value);
        submitUploadVideoStore.setSubmitVideo(true);
    }
    if (response.code === 201) {
        ElMessage(response.msg + '噢...(´；ω；`), 请前往稿件中心修改');
    }
};
// 存为草稿稿件请求
const submitDraftVideo = async () => {
    const data = {
        original: identifier.value,
        title: title.value,
        type: type.value,
        auth: auth.value,
        duration: duration.value,
        category_id: categoryId.value,
        sub_category_id: subCategoryId.value,
        tags: tags.value.join(','),
        descr: descr.value,
        cover_url4x3: coverUrl.coverpath4x3,
        cover_url16x9: coverUrl.coverpath16x9,
    }
    const response = await draftVideoApi(data);
    if (response.code === 200) {
        URL.revokeObjectURL(url.value);
        router.push('/platform/upload-manager/article');
        submitUploadVideoStore.setSubmitVideo(true);
    }
    if (response.code === 201) {
        ElMessage(response.msg);
    }
};
// 更改封面
const changeCover = () => {
    isShowChangeCover.value = true;
};
// 打开集合弹层
const showCollection = () => {
    isShowCollection.value = true;
};
// 裁切封面弹窗回调
const isShowDialogEmit = (isShow: boolean) => {
    isShowChangeCover.value = isShow;
};
const isShowCollectionEmit = (isShow: boolean) => {
    isShowCollection.value = isShow;
};
// 选取分区信息
const SelectCategory = (categoryMain: number, categorySub: number, categorySubTag: string) => {
    let array = categorySubTag.split(",");
    rcmTags.value = array;
    categoryId.value = categoryMain;
    subCategoryId.value = categorySub;
};
// 封面裁切回调
const cropperCoverChang = (coverpath4x3: string, coverpath16x9: string, base64Image: string, showDialog: boolean) => {
    coverSelectedUrl.value = base64Image;
    isShowChangeCover.value = showDialog;
    if (coverpath4x3 && coverpath16x9) {
        coverUrl.coverpath4x3 = coverpath4x3;
        coverUrl.coverpath16x9 = coverpath16x9;
    }
}
// 顶部导航栏
const tabList = ref([
    {
        name: '视频投稿', // 导航栏名称
        path: '/platform/upload/video/frame' // 导航栏跳转路径
    },
    {
        name: '专栏投稿',
        path: '/platform/upload/text/edit'
    },
    {
        name: '音频投稿',
        path: '/platform/upload/audio/frame'
    },
    {
        name: '贴纸投稿',
        path: '/platform/upload/sticker'
    },
    {
        name: '视频素材投稿',
        path: '/platform/upload/videoMaterial'
    }
]);
// 在url上动态添加查询参数
function setMultipleQueryParameters(params: Record<string, string | number | boolean>) {
  // 创建URL对象
  const url = new URL(window.location.href);
  // 获取查询参数对象
  const searchParams = url.searchParams;

  // 遍历要设置的参数对象
  Object.entries(params).forEach(([key, value]) => {
    // 设置或更新每个查询参数，确保值被转换为字符串
    searchParams.set(key, value.toString());
  });

  // 使用replaceState更新当前URL，避免添加新的历史记录
  window.history.replaceState({ path: url.href }, '', url.href);
}
const upDateUrl = () => {
    setMultipleQueryParameters({
    page_from: 'creative_home_top_upload',
    });
};
onUnmounted(() => {
  if (url.value) {
    URL.revokeObjectURL(url.value); // 释放内存 销毁URL
  }
});
</script>
<style scoped lang="scss">
.video-upload {
    // padding-top: 8px;
    overflow: auto;
    .upload-tabs {
        margin-top: 16px;
        border-bottom: 1px solid $item-color-hover;
        ul {
            list-style: none;
            display: flex;
            padding: 0;
            margin: 0;
            height: 40px;
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
}

.upload-body-container {
    max-width: 830px;
    margin: 0 auto;
    position: relative;
    width: 100%;
}
.upload-wrp {
    margin-top: 20px;
    position: relative;
    border: 2px dashed #ccc;
}

.video-input {
    margin-top: 62px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    position: relative;
    color: #999;
    font-size: 14px;
    text-align: center;
}

.pic-input {
    display: flex;
    justify-content: center;
    position: relative;
    color: #999;
    font-size: 14px;
    text-align: center;
}

.video-input-wrapper {
    flex: 1;
    cursor: pointer;
    padding-bottom: 20px;
    display: inline-block;
}

.pic-input-wrapper {
    flex: 1;
    cursor: pointer;
    padding: 70px 0;
    display: inline-block;
}

.icon-shangchuan {
    font-size: 40px;
}

.upload-tips-text {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
}

.upload-btn {
    color: #fff;
    margin: 20px auto;
    width: 200px;
    height: 44px;
    cursor: pointer;
    background: $theme-color;
    border-radius: 4px;
    text-align: center;
    line-height: 44px;
    white-space: nowrap;
}

.upload-body-container .footer-item {
    margin-top: 18px;
    text-align: center;
    color: $item-color;
    fill: $item-color;
    font-size: 12px;
    line-height: 20px;
}

.upload-body-container .footer-item a:not(.title):not(.zip) {
    color: $theme-color;
    cursor: pointer;
}

.upload-body-container .footer-item a:not(.title):not(.zip):hover {
    color: $theme-color;
}

.upload-body-container .footer-item .i-list {
    margin: 0 10px;
}

.upload-body-container .footer-item .i-1 {
    cursor: pointer;
    position: relative;
}

.upload-body-container .footer-item .i-1 a {
    color: #99a2aa;
}

.upload-body-container .footer-item .i-1 .title:hover {
    color: $theme-color;
}

.upload-body-container .footer-item .i-2 .zip {
    color: #99a2aa;
    text-decoration: none;
}

.upload-body-container .footer-item .i-2 .zip:hover {
    color: $theme-color;
    text-decoration: underline;
}

.upload-body-container .footer-item .i-1 .title-block {
    position: absolute;
    font-size: 12px;
    border: 1px solid #f9d199;
    color: #666;
    text-align: left;
    padding: 20px;
    background-color: #fcfae0;
    white-space: nowrap;
    z-index: 10;
    bottom: 28px;
    right: -5px;
    display: none;
}

.upload-body-container .footer-item .i-1:hover .title-block {
    display: block;
}

.upload-body-container .footer-item .i-1 .title-block:after {
    position: absolute;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    border: 1px solid;
    border-color: transparent #f9d199 #f9d199 transparent;
    background-color: #fcfae0;
    right: 10px;
    bottom: -8px;
}

.upload-body-container .footer-item .download-tool {
    size: 16px;
    transform: translateY(3px);
}

.video-upload {
    .upload-info-body-container {
        .video-file {
            .title-block {
                box-sizing: border-box;
                height: 70px;
                padding: 10px 10px 10px 31px;
                border-bottom: 1px solid $item-color-hover;
                
                span {
                    font-size: 18px;
                    line-height: 50px;
                }
            }

            .file-block {
                box-sizing: border-box;
                width: 900px;
                padding: 20px 0;
                display: flex;
                .video-file-icon {
                    box-sizing: border-box;
                    height: 42px;
                    width: 36px;
                    margin: 0 10px 0 32px;
                }

                .file-block-detail {
                    width: 100%;
                    .file-block-status {
                        display: flex;
                        justify-content: space-between;
                        .file-block-status-text {
                            height: 28px;
                            display: flex;
                            align-items: center;
                            .success {
                                line-height: 28px;
                                font-size: 14px;
                                color: #67c23a;
                                margin-left: 10px;
                            }

                            .process {
                                line-height: 28px;
                                font-size: 14px;
                                color: #909399;
                                margin-left: 10px;
                            }

                            .time {
                                margin-left: 6px;
                            }
                        }
                    }
                    .file-block-status-manage {
                        display: flex;
                        align-items: center;
                        .file-block-status-manage-icon {
                            height: 22px;
                            width: 22px;
                            margin-left: 6px;
                            cursor: pointer;
                        }
                        .process {
                            line-height: 28px;
                            font-size: 14px;
                            color: #909399;
                        }

                        .success {
                            line-height: 28px;
                            font-size: 14px;
                            color: $theme-color;
                            cursor: pointer;
                        }

                        .percentage {
                            margin-right: 6px;
                        }
                    }
                    .file-block-progress {
                        height: 3px;
                        width: 100%;
                        background-color: $item-color-hover;
                        margin-top: 6px;
                        .file-progress-inner {
                            height: 2px;
                            border-radius: 2px;
                            transition: width 0.2s ease;
                        }

                        .doing-bg {
                            background-color: $theme-color;
                        }

                        .success-bg {
                            background-color: #67c23a;
                        }
                       
                    }
                }
            }
            
            .upload-form {
                box-sizing: border-box;
                width: 900px;
                height: auto;
                margin: 12px 30px 0 0;
                .form-title {
                    margin: 0 0 0 32px;
                    font-size: 18px;
                    cursor: pointer;
                    span {
                        font-size: 14px;
                        color: #9499a0;
                    }
                }
                .form-item {
                    height: 127px;
                    margin: 24px 0 0 20px;
                    .cover {
                        display: flex;
                        .section-title-container {
                            display: flex;
                            width: 134px;
                            height: 127px;
                            .section-title-deg {
                                display: inline-flex;
                                align-items: center;
                                color: #ff3b30;
                                width: 12px;
                            }
                            .section-title-content-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                            }
                        }

                        .cover-content {
                            display: flex;
                            height: 127px;
                            width: 100%;

                            .cover-upload {
                                display: flex;
                                align-items: center;
                                height: 127px;
                                width: 169px;
                                border-radius: 4px;
                                overflow: hidden;
                                cursor: pointer;
                                position: relative;
                                background-color: #c9ccd0;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    display: block;
                                    aspect-ratio: 4 / 3;
                                }

                                .cover-upload-mask-btn {
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                    height: 30px;
                                    width: 100%;
                                    color: #fff;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    span {
                                        font-size: 13px;
                                        height: 18px;
                                        line-height: normal;
                                    }
                                }

                                .cover-upload-mask {
                                    background-color: #000;
                                    opacity: 0.6;
                                }
                                
                            }

                            .bcc-upload {
                                box-sizing: border-box;
                                height: 127px;
                                width: 169px;
                                border: 1px dashed silver;
                                border-radius: 4px;
                                background-color: #fafafa;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;

                                .bcc-upload-mask-btn {
                                    display: flex;
                                    justify-content: center;
                                    flex-direction: column;
                                    span {
                                        font-size: 12px;
                                        color: silver;
                                    }
                                    .upload-mask-btn-icon {
                                        margin: 0 auto;
                                    }
                                }
                            }
                            .cover-preview {
                                box-sizing: border-box;
                                padding: 4px 0 0 34px;
                                .cover-preview-des {
                                    height: 26px;
                                    font-size: 12px;
                                    line-height: 26px;
                                }
                                .cover-preview-list {
                                    display: flex;
                                    padding: 6px 0 0;
                                    box-sizing: border-box;
                                    .cover-preview-item {
                                        position: relative;
                                        box-sizing: border-box;
                                        display: flex;
                                        margin: 0 14px 0 0;
                                        width: 120px;
                                        height: 90px;
                                        border-radius: 4px;
                                        overflow: hidden;
                                        border: 2px solid $background--;
                                        cursor: pointer;
                                        background-color: #c9ccd0;

                                        &:hover {
                                            border: 2px solid $theme-color;
                                        }
                                        img {
                                            width: 100%;
                                            height: 100%;
                                            background-color: #c9ccd0;
                                            aspect-ratio: 4 / 3;
                                        }

                                        .cover-preview-item-selected-mask {
                                            position: absolute;
                                            width: 100%;
                                            height: 100%;
                                            content: '';
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
                                            left: 0;
                                            z-index: 1;
                                            background: rgba(0, 0, 0, 0.4);
                                        }
                                    }

                                    .cover-preview-item-selected {
                                        border: 2px solid $theme-color;
                                    }
                                }
                            }
                        }
                    
                    }
                }

                .form-item-title {
                    box-sizing: border-box;
                    height: 40px;
                    margin: 24px 0 0 20px;

                    .section-title-container {
                        display: flex;
                        .section-title {
                            display: flex;
                            width: 134px;
                            .section-title-deg {
                                display: inline-flex;
                                align-items: center;
                                color: #ff3b30;
                                width: 12px;
                            }
                            .section-title-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                            }
                        }

                        .section-title-input {
                            height: 39px;

                            &:deep(.is-focus) {
                                border-color: $theme-color;
                                box-shadow: $theme-color 0 0 0 1px;
                            }
                        }
                        

                    }
                }

                .form-item-type {
                    box-sizing: border-box;
                    height: 40px;
                    margin: 24px 0 0 20px;

                    .section-type-container {
                        display: flex;
                        .section-type {
                            display: flex;
                            width: 116.9px;
                            .section-type-deg {
                                display: inline-flex;
                                align-items: center;
                                color: #ff3b30;
                                width: 12px;
                            }
                            .section-type-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                            }
                        }

                        .type-check-radio-wrp {
                            display: flex;

                            .check-radio-container {
                                display: flex;
                                align-items: center;
                                margin: 0 20px 0 0;
                                cursor: pointer;
                                .check-radio-box {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 50%;
                                    border: 1px solid #bec3cc;
                                    margin: 0 6px 0 0;
                                    
                                    .check-radio-box-checked {
                                        width: 12px;
                                        height: 12px;
                                        border-radius: 50%;
                                        background-color: $theme-color;
                                        transform: scale(1)
                                    }
                                }

                                span {
                                    font-size: 14px;
                                    line-height: 14px;
                                }

                                .checked {
                                    color: $theme-color;
                                }
                            }
                        }
                        

                    }
                }

                .form-item-category {
                    box-sizing: border-box;
                    height: 40px;
                    margin: 24px 0 0 20px;

                    .section-category-container {
                        display: flex;
                        .section-category {
                            display: flex;
                            width: 116.9px;
                            .section-category-deg {
                                display: inline-flex;
                                align-items: center;
                                color: #ff3b30;
                                width: 12px;
                            }
                            .section-category-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                            }
                        }

                        .section-category-select-box {
                            .select-box-prefix {
                                display: flex;
                            }
                        }

                        

                    }
                }

                .form-item-tag {
                    box-sizing: border-box;
                    height: auto;
                    margin: 24px 0 0 20px;

                    .section-tag-container-warp {
                        display: flex;
                        .section-tag {
                            display: flex;
                            width: 134px;
                            .section-tag-deg {
                                display: inline-flex;
                                align-items: center;
                                color: #ff3b30;
                                width: 12px;
                            }
                            .section-tag-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                            }
                        }

                        .section-tag-container {
                            box-sizing: border-box;
                            width: 100%;
                        }
                    }

                    .tag-wrp {
                        display: flex;
                        margin-top: 15px;
                        width: 80%;

                        .tag-label {
                            font-size: 14px;
                            color: #222;
                            padding: 14px 0 0 134px;
                        }

                        .tag-list {
                            display: flex;
                            flex-wrap: wrap;
                            flex: 1;

                            .hot-tag-container {
                                text-align: center;
                                padding: 0 15px 0 16px;
                                margin: 6px 0 6px 12px;
                                height: 30px;
                                color: #6d757a;
                                cursor: pointer;
                                border-radius: 4px;
                                background: #f6f6f6;
                                font-size: 12px;
                                line-height: 14px;
                                border: none;

                                .hot-tag-item {
                                    font-size: 12px;
                                    line-height: 30px;
                                    display: inline-flex;
                                    align-items: center;

                                    .icon-topic {
                                        height: 12px;
                                        width: 12px;
                                        margin-right: 6px;
                                        fill: #6d757a;
                                    }
                                }
                            }

                            .isTagSelected {
                                background: #00a1d6;
                                color: #fff;
                                cursor: not-allowed;
                                border: 0; 

                                .hot-tag-item {
                                    .icon-topic {
                                        fill: #ffffff;
                                    }
                                }
                            }
                        }
                    }

                }

                .form-item-descr {
                    box-sizing: border-box;
                    height: 182px;
                    margin: 24px 0 0 20px;

                    .section-descr-container {
                        display: flex;
                        .section-descr {
                            display: flex;
                            width: 134px;
                            .section-descr-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                                margin-left: 12px;
                            }
                        }

                        .desc-text {
                            :deep(.el-textarea__inner) {
                                padding: 10px 16px;
                                border-radius: 6px;
                            }
                            :deep(.el-textarea__inner:focus) {
                                box-shadow: 0 0 0 1px #dcdfe6;
                            }
                        }

                        

                    }
                }

                .form-item-timed {
                    box-sizing: border-box;
                    height: 40px;
                    margin: 24px 0 0 20px;

                    .section-timed-container-warp {
                        display: flex;
                        .section-timed {
                            display: flex;
                            width: 116.9px;
                            .section-timed-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                                margin-left: 12px;
                            }
                        }

                        .section-timed-container {
                            display: flex;
                            align-items: center;
                            .switch-box {
                                display: flex;
                                align-items: center;
                                .section-switch {
                                    --el-switch-on-color: #00aeec;
                                }
                            }
                            .timed-switch-wrp-text {
                                line-height: 32px;
                                font-size: 14px;
                                margin-left: 12px;
                                color: #61666d;
                            }
                        }

                        

                    }
                }

                .form-item-season {
                    box-sizing: border-box;
                    height: 40px;
                    margin: 24px 0 0 20px;
                    margin-bottom: 40px;

                    .section-season-container-warp {
                        display: flex;
                        .section-season {
                            display: flex;
                            width: 116.9px;
                            .section-season-main {
                                display: inline-flex;
                                align-items: center;
                                font-size: 14px;
                                margin-left: 12px;
                            }
                        }

                        .section-season-container {
                            display: flex;
                            align-items: center;
                            .video-season-text {
                                width: 100%;
                                height: 20px;
                                line-height: 20px;
                                font-size: 14px;
                            }

                            .video-season-button {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 140px;
                                height: 36px;
                                border-radius: 6px;
                                font-size: 16px;
                                border: 1px solid $theme-color;
                                line-height: 36px;
                                color: $theme-color;
                                background-color: #fff;
                                cursor: pointer;

                            }
                                
                        }

                        

                    }
                }

                .setting-card {
                    width: 100%;
                    margin-top: 24px;
                    padding: 0 0 0 20px;

                    .video-setting-title {
                        span {
                            font-size: 14px;
                            margin-left: 12px;
                        }
                    }

                    .video-setting-content {
                        margin-left: 134px;
                        height: 90px;

                        .setting-label {
                            display: flex;
                            align-items: center;
                            margin-top: 28px;

                            .bcc-checkbox-checkbox {
                                width: 14px;
                                height: 14px;
                                line-height: 14px;
                                border-radius: 2px;
                                border: 1px solid #bec3cc;
                                cursor: pointer;

                            }
                            .setting-label-main {
                                font-size: 14px;
                                margin-right: 20px;
                                margin-left: 10px;

                                .auth-select-box {
                                    width: auto;
                                }
                            }

                            .setting-text {
                                cursor: pointer;
                            }

                            .button-blueLine {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 106px;
                                height: 36px;
                                border-radius: 6px;
                                font-size: 16px;
                                border: 1px solid $theme-color;
                                line-height: 36px;
                                color: $theme-color;
                                background-color: #fff;
                                cursor: pointer;
                            }

                        }
                    }
                }

                .form-item-submit {
                    box-sizing: border-box;
                    height: 110px;
                    margin: 24px 0 0 20px;
                    padding: 32px 0 32px 134px;
                    display: flex;

                    .submit-container {
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 120px;
                        height: 40px;
                        border-radius: 6px;
                        cursor: pointer;
                    }
                    .submit-draft {
                        border: 1px solid #ccc;
                    }

                    .submit-publish {
                        background-color:  $theme-color;
                        color: #ffffff;
                        margin-left: 20px;
                        &:hover {
                            background-color: $theme-color-hover;
                        }
                    }
                }
            }
        }
    }

    .video-complete {
        width: 100%;
        .video-complete-container {
            width: 100%;
            .content-wrapper {
                .bg {
                    width: 366px;
                    height: 207px;
                    background-size: 100% 100%;
                    background-position: 50%;
                    background-repeat: no-repeat;
                    background-image: url(@/assets/img/platform/video_complete.png);
                    margin: 30px auto;
                }
                .step-des {
                    margin-top: 16px;
                    text-align: center;
                    font-size: 24px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, .85);
                    line-height: 32px;
                }

                .op-buttons {
                    margin-top: 82px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 50px;
                    font-size: 14px;

                    .left-wrapper {
                        position: relative;
                        margin-right: 10px;

                        .btn-left {
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 140px;
                            height: 40px;
                            background-color: #fff;
                            border: 1px solid #ccc;
                            border-radius: 6px;
                            cursor: pointer;
                            &:hover {
                                background-color: $item-color-hover;
                            }
                        } 
                    }

                    .right-wrapper {
                        position: relative;
                        margin-right: 10px;

                        .btn-right {
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 140px;
                            height: 40px;
                            border-radius: 6px;
                            border: none;
                            cursor: pointer;

                            background-color:  $theme-color;
                            color: #ffffff;
                            margin-left: 20px;
                            &:hover {
                                background-color: $theme-color-hover;
                            }
                        } 
                    }
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