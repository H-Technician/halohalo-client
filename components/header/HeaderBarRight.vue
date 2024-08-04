<template>
    <!-- 登录弹窗 -->
    <DialogLoginDiaLog :showDialog="dialogVisible" width="780" height="440" @isShowDialog="isShowLoginDialog">
        <template #content>
            <LoginreisterLoginReister @closeLoginDialog="closeLoginDialog" />
        </template>
    </DialogLoginDiaLog>
    <!-- 头像 -->
    <div class="right-entry">
        <div class="header-avater" v-if="isLogin">
            <PopoverAvatarPopover popStyle="padding-top: 16px; margin-left: -13px;" @isShowPopover="isShowAvatarPopover">
                <template #reference>
                    <!-- 登录后显示头像 -->
                    <div class="header-avatar-wrap">
                        <NuxtLink to="https://www.hblog.top" target="_blank" class="header-avatar-wrap--container mini-avatar--small" :class="showAvatarPopover ? 'big-avatar--small' : ''">
                            <picture class="v-img" v-if="userInfo">
                                <img src="@/assets/img/defaultAvatar.svg" alt="默认头像" style="position: absolute;" :style="isloadImg ? 'display: none;' : ''"/>
                                <img :src="userInfo?.avatar" :alt="userInfo?.username+'头像'" v-if="isloadImg"/>
                            </picture>
                        </NuxtLink>
                    </div>
                </template>
                <template #content>
                    <HeadercardAvatar @islogout="isLogout" :userInfo="userInfo ? userInfo : {}" />
                </template>
            </PopoverAvatarPopover>
        </div>
        <div class="header-avater" v-else>
            <Popover popStyle="padding-top: 14px;">
                <template #reference>
                    <!-- 未登录显示登录 -->
                    <div class="header-avatar-wrap">
                        <div class="default-login" @click="dialogVisible = true;">
                            <span class="nologin-text">登录</span>
                        </div>
                    </div>
                </template>
                <template #content>
                    <HeadercardNoLogin @isLogin="isLoginDialog"/>
                </template>
            </Popover>
        </div>
        <!-- 大会员 -->
        <div class="right-entry-item">
            <div class="right-entry-item-vip">
                <Popover popStyle="padding-top: 16px;">
                    <template #reference>
                        <!-- 未读信息数量 -->
                        <div class="red-num-message">12</div>
                        <NuxtLink to="/test" target="_blank" class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                                <IconsHeaderbarDaHuiyuan />
                            <span>大会员</span>
                        </NuxtLink>
                    </template>
                    <template #content>
                        <span>测试</span>
                    </template>
                </Popover>
            </div>
        </div>
        <!-- 消息 -->
        <div class="right-entry-item">
            <div class="right-entry-item-message" v-if="isLogin">
                <!-- 未读信息数量 -->
                <div class="red-num-message">12</div>
                <NuxtLink to="/test" target="_blank" class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                        <IconsHeaderbarXioaXi />
                    <span>消息</span>
                </NuxtLink>
            </div>
            <div class="right-entry-item-message" v-else>
                <Popover popStyle="padding-top: 16px;">
                    <template #reference>
                        <div class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                                <IconsHeaderbarXioaXi />
                            <span>消息</span>
                        </div>
                    </template>
                    <template #content>
                        <HeadercardNoLoginCard 
                        content="登录即可查看消息记录"
                        @isLogin="isLoginDialog"/>
                    </template>
                </Popover>
            </div>
        </div>
        <!-- 动态 -->
        <div class="right-entry-item">
            <div class="right-entry-item-dynamic" v-if="isLogin">
                <!-- 未读信息数量 -->
                <div class="red-num-message">12</div>
                <NuxtLink to="/test" target="_blank" class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                        <IconsHeaderbarDongTai />
                    <span>动态</span>
                </NuxtLink>
            </div>
            <div class="right-entry-item-dynamic" v-else>
                <Popover popStyle="padding-top: 16px;">
                    <template #reference>
                        <div class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                                <IconsHeaderbarDongTai />
                            <span>动态</span>
                        </div>
                    </template>
                    <template #content>
                        <HeadercardNoLoginCard 
                        content="登录即可查看关注动态"
                        @isLogin="isLoginDialog"/>
                    </template>
                </Popover>
            </div>
        </div>
        <!-- 收藏 -->
        <div class="right-entry-item">
            <div class="right-entry-item-collection" v-if="isLogin">
                <NuxtLink to="/test" target="_blank" class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                        <IconsHeaderbarShiouCang />
                    <span>收藏</span>
                </NuxtLink>
            </div>
            <div class="right-entry-item-collection" v-else>
                <Popover popStyle="padding-top: 16px;">
                    <template #reference>
                        <div class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                                <IconsHeaderbarShiouCang />
                            <span>收藏</span>
                        </div>
                    </template>
                    <template #content>
                        <HeadercardNoLoginCard 
                        content="登录即可查看我的收藏"
                        @isLogin="isLoginDialog"/>
                    </template>
                </Popover>
            </div>
        </div>
        <!-- 历史 -->
        <div class="right-entry-item">
            <div class="right-entry-item-history" v-if="isLogin">
                <NuxtLink to="/test" target="_blank" class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                        <IconsHeaderbarLiSHi />
                    <span>历史</span>
                </NuxtLink>
            </div>
            <div class="right-entry-item-history" v-else>
                <Popover popStyle="padding-top: 16px;">
                    <template #reference>
                        <div class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                                <IconsHeaderbarLiSHi />
                            <span>历史</span>
                        </div>
                    </template>
                    <template #content>
                        <HeadercardNoLoginCard 
                        content="登录即可查看历史记录"
                        @isLogin="isLoginDialog"/>
                    </template>
                </Popover>
            </div>
        </div>
        <!-- 创作中心 -->
        <div class="right-entry-item">
            <div class="right-entry-item-creation" v-if="isLogin">
                <NuxtLink to="/platform/upload/video/frame?spm_id_from=333.1007.0.0" target="_blank" class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                        <IconsHeaderbarChiuangZuo />
                    <span>创作中心</span>
                </NuxtLink>
            </div>
            <div class="right-entry-item-creation" v-else>
                <div target="_blank" class="right-entry--outside" :class="props.isFixedHeaderRight ? 'right-entry--outside-slide-down' : 'right-entry--outside-color'">
                        <IconsHeaderbarChiuangZuo />
                    <span>创作中心</span>
                </div>
            </div>
        </div>
        <!-- 投稿按钮 -->
        <div class="right-entry-item right-entry-item--upload" v-if="isLogin">
            <Popover :popStyle=uploadoffsetStyle>
                <template #reference>
                    <NuxtLink class="upload-buttom" to="/platform/upload/video/frame" target="_blank">
                        <IconsHeaderbarUpLoad />
                        <span style="margin-left: 2px;">投稿</span>
                    </NuxtLink>
                </template>
                <template #content>
                    <HeadercardUpload />
                </template>
            </Popover>
        </div>
        <div class="right-entry-item right-entry-item--upload" v-else>
            <div class="upload-buttom" @click="gotoUpload">
                <IconsHeaderbarUpLoad />
                <span style="margin-left: 2px;">投稿</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UserInfo } from '@/types/user'
import { getUserInfoApi } from '@/api/user';
const dialogVisible = ref(false);
const showAvatarPopover = ref(false);
const isLogin = useIsLogin();
const screenWidth = ref<number>(0); //屏幕宽度
const uploadoffsetStyle = ref<string>("");
const userInfo = ref<UserInfo>();
const isloadImg = ref(false); // 是否加载头像图片
const isShowLoginDialog = (isShowLoginDialog: boolean) => {
    if (isShowLoginDialog) {
        dialogVisible.value = true;
    } else {
        dialogVisible.value = false;
    }
}
const closeLoginDialog = async (closeLoginDialog: boolean) => {
    await getUserInfo();
    if (closeLoginDialog === true) {
        showAvatarPopover.value = false;
        dialogVisible.value = false;
        isLogin.value = true;
    } 
}
const isLogout = (isLogout: boolean) => {
    if (isLogout) {
        isLogin.value = true;
    } else {
        isLogin.value = false;
    }
}
const gotoUpload = () =>{
    dialogVisible.value = true;
}
const props = defineProps({
    isFixedHeaderRight: {
        type: Boolean
    }
})

const isShowAvatarPopover = (isShowAvatarPopover: boolean) => {
    if (isShowAvatarPopover) {
        showAvatarPopover.value = true;
    } else {
        showAvatarPopover.value = false;
    }
}

const isLoginDialog = (isLoginDialog: boolean) => {
    if (isLoginDialog) {
        dialogVisible.value = true;    
    } else {
        dialogVisible.value = false;
    }
}
// 更新屏幕宽度的函数
const updateScreenWidth = () =>{
  screenWidth.value = window.innerWidth;
}
// 登录后获取用户信息
const getUserInfo = async () => {
    const response = await getUserInfoApi(); // 获取用户信息
    if (response.code === 200) {
        userInfo.value = response.data as UserInfo;
        const avatarUrl = userInfo.value.avatar;
        await loadImage(avatarUrl, () => {
        isloadImg.value = true;
        }, (error) => {
        console.error('图片加载失败:', error.message);
        });
    } else if (response.code === 401) {
        isLogin.value = false;
    } else {
        throw new Error('获取用户信息失败');
    }
    
}  
watchEffect(() => {
  if (screenWidth.value < 1279.9) {
    uploadoffsetStyle.value = "padding-top: 18px; margin-left: -150px";
    // console.log(uploadoffsetStyle.value)
  } else {
    uploadoffsetStyle.value = "padding-top: 18px; margin-left: -122px";
    // console.log(uploadoffsetStyle.value)
  }
});

onMounted(() => {
  // 监听窗口大小变化
  window.addEventListener('resize', updateScreenWidth);
  // 初始化屏幕宽度
  updateScreenWidth();
});
onBeforeMount(async() => {
  // 移除窗口大小变化监听
  window.removeEventListener('resize', updateScreenWidth);
  if (isLogin.value) {
    await getUserInfo(); // 获取用户信息
  }
});
</script>
<style scoped lang="scss">
.right-entry {
    display: flex;
    align-items: center;
    margin-left: 20px;
    flex-shrink: 0;     /*容器空间不足时不缩小，即固定大小*/
    .header-avater {
        position: relative;
        box-sizing: content-box;
        width: 50px;
        height: 50px;
        padding-right: 16px;
        display: flex;
        align-items: center;
    }
}
.right-entry-item {
    position: relative;
    display: block;
    .right-entry-item-vip,
    .right-entry-item-message,
    .right-entry-item-dynamic,
    .right-entry-item-collection,
    .right-entry-item-history,
    .right-entry-item-creation {
        display: block;
        position: relative;
        .red-num-message {
            position: absolute;
            top: -6px;
            z-index: 1;
            padding: 0 3px;
            min-width: 15px;
            border-radius: 10px;
            background-color: #fa5a57;
            color: #fff;
            font-size: 12px;
            line-height: 15px;
        }

    }
}


.default-login {
    position: absolute;
    top: 2px;
    left: 10px;
    z-index: 2;
    display: block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: $theme-color;
    text-align: center;
    line-height: 38px;
    color: rgba(255, 255, 255, 0.9);
}

.default-login .nologin-text {
    font-size: 13px;
    text-align: center;
    justify-content: center;
    display: block;
}

.header-avatar-wrap {
    position: relative;
    box-sizing: content-box;
    width: 45px;
    height: 45px;
    text-align: center;
    cursor: pointer;
}

.header-avatar-wrap--container {
    position: relative;
    z-index: 2;
    background: #cdd0d6;
}

.mini-avatar--small {
    position: absolute;
    top: 2px;
    left: 10px;
    z-index: 2;
    display: block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid #fff;
    transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease; /* 添加平滑过渡效果 */
}

.v-img {
    position: relative;
    display: inline-block;
    line-height: 1;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: 50%;
    // background-color: transparent;
    background-color: #ffffff 
}

.header-avatar-wrap .big-avatar--small {
    top: 15px;
    left: -35px;
    width: 90px;
    height: 90px;
    transition: big-avatar 0.3s ease-in-out;
    transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease; /* 添加平滑过渡效果 */
}
@keyframes big-avatar {
    0% {
        top: 0px;
        left: 0px;
        width: 38px;
        height: 38px;
    }
    100% {
        top: 15px;
        left: -35px;
        width: 90px;
        height: 90px;
    }
}
.header-avatar-wrap:hover .mini-avatar--small {
    animation: shrink 0.3s both; /* 初始状态为缩小 */
}

.right-entry-item .right-entry--outside .item {
    bottom: -2px;
}

@keyframes shrink {
  to {
    transform: scale(1); /* 缩小到原始大小 */
  }
}

.v-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
    border-radius: 50%;
    image-rendering: -webkit-optimize-contrast;
}

.right-entry--outside {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
    flex-shrink: 0;
    margin-right: 0;
    min-width: 50px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
}

.right-entry--outside-slide-down {
    fill: #000000;
    color: #000000;
}
.right-entry--outside-color {
    fill: #ffffff;
    color: #ffffff;
}
.right-entry--outside :deep(.el-badge__content) {
    border: none !important;
    font-size: 11px;
    padding: 0 2px;
    height: 16px;
}

.right-entry--outside :deep(.is-dot) {
    border: none !important;
    height: 7px !important;
    width: 3px !important;
    right: 6px;
}
.right-entry--outside .iconfont {
    font-size: 20px;
    display: inline-block;
    position: relative;
}

.right-entry-item--upload {
    margin-left: 15px;
}

.upload-buttom {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    width: 90px;
    height: 34px;
    border-radius: 8px;
    background: $upload-background;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 34px;
    cursor: pointer;
    transition: background-color .3s;
    text-decoration: none;
}

.upload-buttom:hover {
    background-color: $upload-hover;
}

.icon-shangchuan {
    margin-right: 5px;
    line-height: 34px;
    margin-top: -2px;
}
@media (min-width: 1280px) {
    .red-num-message {
        left: 25px;
    }
}
@media (max-width: 1279.9px) {
    .right-entry--outside {
        margin: 0 5px;
        min-width: 25px;
    }

    .upload-buttom {
        width: 34px;
        height: 34px;
        margin-left: 0;
    }

    .icon-shangchuan {
        margin-right: 0;
    } 

    .right-entry--outside span, .upload-buttom span {
        display: none;
    }
    .red-num-message {
        left: 17px;
    }
}

/* 跳动效果 */
@keyframes jump {
  0%, 100% {
    transform: translateY(0); /* 起始和结束状态，图标回到原位 */
  }
  50% {
    transform: translateY(-5px); /* 中间状态，图标向上跳动 20px */
  }
}
.right-entry-item .right-entry--outside:hover .item,.right-entry-item .right-entry--outside:hover svg {
    animation: jump 0.3s; /* 应用跳动动画效果 */
}
</style>
<style>  
.loginreister {
    border-radius: 10px !important;
    /* background-color: brown; */
}
.loginreister .el-icon {
    height: 40px;
    width: 40px;
}

</style>
  