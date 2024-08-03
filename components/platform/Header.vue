<template>
    <!-- 头部 -->
    <div class="platform-header">
        <div class="header-content">
            <div class="left-block">
                <div class="logo-container">
                    <img src="~assets/img/headerlogo.png" alt="">
                    <span>创作中心</span>
                </div>
                <NuxtLink to="/" target="_blank" class="platform-entry">
                    <IconsHeaderbarTitleLogo class="index-iconfont"/>
                    <span>主站</span>
                </NuxtLink>
            </div>
            <div class="right-block">
                <!-- 头像 -->
                <Popover popStyle="padding-top: 8px;">
                    <template #reference>
                        <NuxtLink to="/" target="_blank" class="avatar-box">
                            <div class="avatar" v-if="userInfo">
                                <img src="@/assets/img/defaultAvatar.svg" alt="默认头像" style="position: absolute;" :style="isloadImg ? 'display: none;' : ''"/>
                                <img :src="userInfo?.avatar" :alt="userInfo?.username+'头像'" v-if="isloadImg"/>
                            </div>
                        </NuxtLink>
                        <div class="avatar"></div>
                    </template>
                    <template #content>
                        <PlatformAvatarPopover/>
                    </template>
                </Popover>
                <div class="tips">
                    成为UP主的第1145天
                    <el-icon><ElIconArrowRightBold /></el-icon>
                </div>
                <div class="line-divid"></div>
                <Popover popStyle="padding-top: 18px;">
                    <template #reference>
                        <NuxtLink to="" target="_blank" class="message">
                            <el-badge is-dot class="item" v-if="true" :offset="[0, 4]">
                                <IconsPlatformXinFeng class="xinfeng"/>
                            </el-badge>
                            <IconsPlatformXinFeng class="xinfeng" v-else/>
                        </NuxtLink>
                    </template>
                    <template #content>
                        <div><span>测试</span></div>
                    </template>
                </Popover>
                    <div class="download">
                        <IconsPlatformXiaZai class="xiazai"/>
                    </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import { getUserInfoApi } from '@/api/user'
const isLogin = useIsLogin()
const isloadImg = ref(false); // 是否加载头像图片
const userInfo = ref<UserInfo>();

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

onBeforeMount(async() => {
    if (isLogin.value) {
        await getUserInfo(); // 获取用户信息
    }
});
</script>
<style scoped>
.platform-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 900;
    min-width: 1236px;
}

.platform-header .header-content {
    height: 60px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 100px 0 32px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.05);
    margin-right: calc(-100vw + 100%);
    min-width: 800px;
    width: 100%;
}

.platform-header .header-content .left-block {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 100%;
}

.platform-header .header-content .left-block .logo-container {
    height: 40%;
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
}

.platform-header .header-content .left-block .logo-container img {
    height: 160%;
    width: auto;
}

.platform-header .header-content .left-block .logo-container span {
    font-size: 21px;
    font-weight: 600;
    color: #00a1d6;
}

.platform-header .header-content .left-block .platform-entry {
    margin-left: 20px;
    display: block;
    text-decoration: none;
    color: #757575;
    font-size: 14px;
    cursor: pointer;
}

.platform-header .header-content .left-block .platform-entry .index-iconfont {
    height: 18px;
    width: 18px;
    margin-right: 5px;
    font-weight: 600;
    vertical-align: -4px;
    fill: #757575;
}

.platform-header .header-content .right-block {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    font-size: 16px;
    color: #757575;
    height: 100%;
}

.platform-header .header-content .right-block .avatar-box {
    position: relative;
    line-height: 1;
    height: 30px;
    width: 30px;
    display: block;
    text-decoration: none;
    background: #cdd0d6;
    border-radius: 50%;
    cursor: pointer;
}
.platform-header .header-content .right-block .avatar-box .avatar {
    height: 100%;
    border-radius: 50%;
    width: 100%;
    overflow: hidden;
}

.platform-header .header-content .right-block .avatar-box .avatar img {
    height: 100%;
    width: 100%;
}

.platform-header .header-content .right-block .tips {
    display: flex;
    align-items: center;
    background: rgba(250,142,87,.1);
    border: 1px solid rgba(250,142,87,.43);
    border-radius: 15px;
    padding: 5px 12px 5px 16px;
    font-size: 12px;
    color: #fa8e57;
    text-align: center;
    margin-right: 32px;
    margin-left: 12px;
    cursor: pointer;
}

.platform-header .header-content .right-block .line-divid {
    width: 1px;
    height: 16px;
    background: #e7e7e7;
    margin-right: 32px;
}
.right-block .message {
    cursor: pointer;
    display: block;
    text-decoration: none;
}

.message .xinfeng {
    font-size: 22px;
    font-weight: 600;
    fill: #757575;
    color: #757575;
}
.platform-header .header-content .right-block .download {
    margin-left: 30px;
    cursor: pointer;
}

.platform-header .header-content .right-block .download .xiazai {
    font-size: 32px;
    font-weight: 600;
    color: #757575;
    fill: #757575;
}
</style>