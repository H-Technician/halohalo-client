<template>
    <Title>创作中心 - 哈喽哈喽弹幕视频网 - ( ゜- ゜)つロ 乾杯~</Title>
    <!-- 顶部加载条 -->
    <NuxtLoadingIndicator color="#00aeec"/>
    <div class="platform-view">
        <PlatformHeader />
        <!-- 左侧导航 -->
        <div class="platform-nav">
            <!-- 投稿按钮 -->
            <a class="nav-upload-btn" :href="uploadPath" @click.prevent="handleClick">
                <IconsHeaderbarUpLoad  class="icon-shangchuan"/>
                <span>投稿</span>
            </a>
            <div class="bar-items">
                <div class="platform-nav-slider-sub-menu__wrap bar-item">
                    <div class="platform-navs-item">
                        <div class="nav-wrap" @click="gotoPage('home')" :style="isActive === 'home' ? 'color: #00aeec; fill: #00aeec;':''">
                            <IconsPlatformZhuYe class="nav-menu-icon"/>
                            <span>首页</span>
                        </div>
                    </div>
                </div>
                <div class="platform-nav-slider-sub-menu__wrap bar-item" :class="isSlideDown==='uploadManager' ? 'active' : ''">
                    <div class="platform-navs-item">
                        <div class="nav-wrap" @click="gotoPage('uploadManager')" :style="isActive === 'uploadManager' ? 'color: #00aeec; fill: #00aeec;':''">
                            <IconsPlatformNeiRongGL class="nav-menu-icon"/>
                            <span>内容管理</span>
                            <el-icon size="12" color="#666666" class="slide-down" style="transition:transform 0.3s linear;" :style="[{transform:isSlideDown==='uploadManager' ? 'rotate(180deg)' : ''}]">
                                <ElIconArrowDownBold />
                            </el-icon>
                        </div>
                    </div>
                    <div class="platform-navs-item_slide-down">
                        <div class="nav-wrap-item">
                            <div class="nav-wrap_active" @click="gotoPage('uploadManagerArticle')" :style="isActiveArticle ? 'color: #00aeec;':''">
                                <span>稿件管理</span>
                            </div>
                        </div>
                        <div class="nav-wrap-item">
                            <div class="nav-wrap_active" @click="gotoPage('uploadManagerAppeal')" :style="isActiveAppeal ? 'color: #00aeec;' : ''">
                                <span>申诉管理</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="platform-nav-slider-sub-menu__wrap bar-item">
                    <div class="platform-navs-item">
                        <div class="nav-wrap" @click="gotoPage('dataCenter')" :style="isActive === 'dataCenter' ? 'color: #00aeec; fill: #00aeec;':''">
                            <IconsPlatformShuJuZx class="nav-menu-icon"/>
                            <span>数据中心</span>
                        </div>
                    </div>
                </div>
                <div class="platform-nav-slider-sub-menu__wrap bar-item" :class="isSlideDown==='comment' ? 'active' : ''">
                    <div class="platform-navs-item">
                        <div class="nav-wrap" @click="gotoPage('comment')" :style="isActive === 'comment' ? 'color: #00aeec; fill: #00aeec;':''">
                            <IconsPlatformHuDongGL class="nav-menu-icon"/>
                            <span>互动管理</span>
                            <el-icon size="12" color="#666666" class="slide-down" style="transition:transform 0.3s linear;" :style="[{transform:isSlideDown==='comment' ? 'rotate(180deg)' : ''}]">
                                <ElIconArrowDownBold />
                            </el-icon>
                        </div>
                    </div>
                    <div class="platform-navs-item_slide-down">
                        <div class="nav-wrap-item">
                            <div class="nav-wrap_active" @click="gotoPage('commentArticle')" :style="isActiveCommentArticle ? 'color: #00aeec;' : ''">
                                <span>评论管理</span>
                            </div>
                        </div>
                        <div class="nav-wrap-item">
                            <div class="nav-wrap_active" @click="gotoPage('commentDanmu')" :style="isActiveCommentDanmu ?  'color: #00aeec;' : ''">
                                <span>弹幕管理</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="platform-nav-slider-sub-menu__wrap bar-item">
                    <div class="platform-navs-item">
                        <div class="nav-wrap" @click="gotoPage('setting')" :style="isActive === 'setting' ? 'color: #00aeec; fill: #00aeec;':''">
                            <IconsPlatformSetting class="nav-menu-icon"/>
                            <span>创作设置</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主体 -->
        <div class="platform-main">
            <div class="content-body">
                <NuxtPage />
            </div>            
        </div>
        <!-- 消息确认弹框 -->
        <Popconfirm :showPopoconfirm="isShowPopoconfirm" width="370" @changPopoconfirm = "changPopoconfirm">
            <template #content>
                <div class="text-box">
                    <div class="text">确定要离开吗？</div>
                    <div class="subtext">系统可能不会保存填写的稿件信息噢...(´；ω；`)</div>
                </div>
            </template>
        </Popconfirm>
    </div>
</template>

<script setup lang="ts">
import { useIsSubmitUploadVideoStore } from '@/stores/uploadVideoStore';
// 获取路由实例
const router = useRouter();
const route = useRoute();
const isActive = ref('');
const isSlideDown = ref('');
const isActiveCommentArticle = ref(false);
const isActiveCommentDanmu = ref(false);
const isActiveArticle = ref(false);
const isActiveAppeal = ref(false);
const isGotoPage = ref('');
const uploadPath = ref('/platform/upload/video/frame?page_from=creative_home_top_upload');
const isShowPopoconfirm = ref(false); // 是否显示消息弹框
const gotoPage = (page: string) => {
    isGotoPage.value = page;
    const submitUploadVideoStore = useIsSubmitUploadVideoStore(); // 获取上传视频状态
    if (page === 'uploadManager') { 
        if (isSlideDown.value === 'uploadManager') {
            isSlideDown.value = '';
        } else {
            isSlideDown.value = 'uploadManager';
        }
        return;
    } else if (page === 'comment') {
        if (isSlideDown.value === 'comment') {
            isSlideDown.value = '';
        } else {
            isSlideDown.value = 'comment';
        }
        return;
    }
    if (submitUploadVideoStore.submitVideo && 
    route.path === '/platform/upload/video/frame'
    ) {
        routerPush(page);
    } else if (!submitUploadVideoStore.submitVideo && 
    route.path === '/platform/upload/video/frame'
    ){
        isShowPopoconfirm.value = true;
    } else {
        routerPush(page);
    }
}

const routerPush = (page: string) => {
    switch (page) {
        case 'home':
            isActive.value = 'home';
            init();
            router.push("/platform/home");
            break;
        case 'dataCenter':
            isActive.value = 'dataCenter';
            init();
            router.push("/platform/data-up/video/dataCenter/video");
            break;
        case 'setting':
            isActive.value = 'setting';
            init();
            router.push("/platform/setting");
            break;
        case 'uploadManagerArticle':
            isActiveArticle.value = true;
            if (route.path !== '/platform/upload-manager/article') {
                router.push("/platform/upload-manager/article");
            }
            break;
        case 'uploadManagerAppeal':
            isActiveAppeal.value = true;
            if (route.path !== '/platform/upload-manager/appeal') {
                router.push("/platform/upload-manager/appeal");
            }
            break;
        case 'commentArticle':
            isActiveCommentArticle.value = true;
            if (route.path !== '/platform/comment/article') {
                router.push("/platform/comment/article");
            }
            if (isActive.value !== 'comment') {
                isActive.value = 'comment';
            }
            break;
        case 'commentDanmu':
            isActiveCommentDanmu.value = true;
            if (route.path !== '/platform/comment/danmu') {
                router.push("/platform/comment/danmu");
            }
            if (isActive.value !== 'comment') {
                isActive.value = 'comment';
            }
            break;
    }

}

const init = () => {
    isActiveAppeal.value = false;
    isActiveArticle.value = false;
    isActiveCommentDanmu.value = false;
    isActiveCommentArticle.value = false;
}

watchEffect(() => {
    if (/^\/platform\/upload\/.+$/.test(route.path)) {
        isActive.value = '';
        isSlideDown.value = '';
    }
})
watchEffect(() => {
    switch (route.path) {
        case '/platform':
            router.push("/platform/home");
            break;
        case '/platform/home':
            isActive.value = 'home';
            break;
        case '/platform/upload-manager/article':
            isActive.value = 'uploadManager';
            isSlideDown.value = 'uploadManager';
            isActiveArticle.value = true;
            isActiveAppeal.value = false;
            break;
        case '/platform/upload-manager/appeal':
            isActive.value = 'uploadManager';
            isSlideDown.value= 'uploadManager';
            isActiveArticle.value = false;
            isActiveAppeal.value = true;
            break;
        case '/platform/data-up/video/dataCenter/video':
            isActive.value = 'dataCenter';
            break;
        case '/platform/comment/article':
            isActive.value = 'comment';
            isSlideDown.value = 'comment';
            isActiveCommentArticle.value = true;
            isActiveCommentDanmu.value = false;
            break;
        case '/platform/comment/danmu':
            isActive.value = 'comment';
            isSlideDown.value = 'comment';
            isActiveCommentArticle.value = false;
            isActiveCommentDanmu.value = true;
            break;
        case '/platform/setting':
            isActive.value = 'setting';
            break;
        }
});

const handleClick = (event: Event): void =>{
      // 阻止默认的链接跳转行为
      event.preventDefault();
      isGotoPage.value = uploadPath.value;
      const submitUploadVideoStore = useIsSubmitUploadVideoStore(); // 获取上传视频状态
      if (submitUploadVideoStore.submitVideo && 
      route.path === '/platform/upload/video/frame'
        ) {
        router.go(0);
      } else if (!submitUploadVideoStore.submitVideo && 
      route.path === '/platform/upload/video/frame'
        ){
        isShowPopoconfirm.value = true;
      } else {
        router.push(uploadPath.value);
      }
};

const changPopoconfirm = (showPopoconfirm: boolean, confirm: boolean) => {
    isShowPopoconfirm.value = showPopoconfirm;
    const submitUploadVideoStore = useIsSubmitUploadVideoStore(); // 获取上传视频状态
    if (confirm) {
        if (isGotoPage.value === uploadPath.value) {
            router.go(0);
        } else {
            routerPush(isGotoPage.value);
        }
        submitUploadVideoStore.setSubmitVideo(true);
    };
}

</script>

<style scoped lang="scss">
.platform-view {
    width: 100%;
    min-width: 1236px;
    background: #fafafa;

    .text-box {
        margin: 21px 0 19px;
        .text {
            display: flex;
            justify-content: center;
            word-break: break-all;
            color: #6d757a;
        }
        .subtext {
            margin: 10px 0 0;
            font-size: 13px;
            line-height: 24px;
            color: #99a2aa;
            margin-top: 10px;
            text-align: center;
        }
    }
}

.platform-nav {
    position: fixed;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    padding-top: 60px;
    top: 0;
    left: 0;
    border-right: 1px solid #f4f4f4;
    background: #fff;
    z-index: 10;
    height: 100%;
    width: 200px;
    overflow-x: hidden;
    overflow-y: auto;
}

.platform-nav::-webkit-scrollbar {
    width: 4px;
}

.platform-nav::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ddd;
}

.nav-upload-btn {
    width: 136px;
    height: 40px;
    border-radius: 2px;
    background-color: $theme-color;
    text-decoration: none;
    margin: 24px auto 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.nav-upload-btn:hover {
    background-color: $theme-color-hover;
}

.nav-upload-btn .icon-shangchuan {
    font-size: 18px;
    margin-right: 10px;
}

.nav-upload-btn span {
    cursor: pointer;
}

.bar-items {
    .platform-nav-slider-sub-menu__wrap {
        height: 46px;
        width: 200px;
        transition: all .2s ease;
        overflow: hidden;

        .platform-navs-item {
            box-sizing: border-box;
            width: 100%;
            height: 46px;
            line-height: 46px;
            padding: 0 24px 0 32px;
            cursor: pointer;
            .nav-wrap {
                width: 100%;
                height: 46px;
                line-height: 46px;
                .nav-menu-icon {
                    height: 16px;
                    width: 16px;
                    margin-right: 24px;
                    vertical-align: -2px;
                }
                span {
                    font-size: 14px;
                }
                .slide-down {
                    margin-left: 30px;
                }
            }
            &:hover {
                background-color: #f4f4f4;
            }
        }

        .platform-navs-item_slide-down {
            box-sizing: border-box;
            width: 100%;
            height: 46px;
            line-height: 46px;
            
            .nav-wrap-item {
                padding: 0 24px 0 72px;
                .nav-wrap_active {
                    width: 100%;
                    height: 46px;
                    line-height: 46px;
                    cursor: pointer;

                    span {
                        font-size: 14px;
                    }
                }
                &:hover {
                    background-color: #f4f4f4;
                }
            }
            
        }
    }

    .active {
        height: 138px;
    }
    .is_active {
        color: $theme-color;
        fill: $theme-color;
    }
}

.platform-main {
    position: relative;
    padding: 60px 0 50px 200px;
    background: #fafafa;
    min-width: 900px;
    display: flow-root;
    height: auto;
}

.platform-main .content-body {
    width: inherit;
    min-height: 400px;
    background: #fafafa;
    margin: 16px 72px 0;
    padding-bottom: 20px;
    display: flow-root;
}

</style>