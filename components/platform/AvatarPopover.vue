<template>
    <div class="avatar-popover">
        <div class="avatar-popover-single-item">
            <a href="" target="_blank" class="single-item">
                <IconsHeaderbarGeRenzx />
                <span>个人中心</span>
            </a>                            
        </div>
        <div class="avatar-popover-single-item">
            <a href="" target="_blank" class="single-item">
                <IconsHeaderbarTouGaoGL />
                <span>投稿管理</span>
            </a>                            
        </div>
        <div class="avatar-popover-single-item">
            <a href="" target="_blank" class="single-item">
                <IconsHeaderbarHbiGl />
                <span>H币钱包</span>
            </a>                            
        </div>
        <div class="avatar-popover-single-item">
            <a href="" target="_blank" class="single-item">
                <IconsHeaderbarDingDan />
                <span>订单中心</span>
            </a>                            
        </div>
        <div class="avatar-popover-single-item">
            <a href="" target="_blank" class="single-item">
                <IconsHeaderbarZhiBo />
                <span>直播中心</span>
            </a>                            
        </div>
        <div class="placeholder"></div>
        <div class="avatar-popover-single-item logout" @click="logout">
            <div class="single-item">
                <IconsHeaderbarDengChu />
                <span>退出登录</span>
            </div>
        </div>
    </div>
</template>    
<script setup lang="ts">
import { logoutApi } from '@/api/login';
import { removeLocalStoragejwt } from '@/utils/localStorage';
const logout = async () => {
    const response = await logoutApi();
    if (response.code === 200) {
        ElMessage.success(response.msg);
        removeLocalStoragejwt();
        history.replaceState({}, document.title, "/passport/login"); // 刷新页面 清除浏览器历史 防止用户返回到登录页
        window.open('/passport/login', '_self'); // 跳转登录页保证刷新页面
    } else if (response.code === 401) {
        ElMessage.success(response.msg);
        removeLocalStoragejwt();
        history.replaceState({}, document.title, "/passport/login"); // 刷新页面 清除浏览器历史 防止用户返回到登录页
        window.open('/passport/login', '_self'); // 跳转登录页保证刷新页面
    }
    
}
</script>
<style scoped lang="scss">
.avatar-popover {
    box-sizing: border-box;
    width: 140px;
    height: 270px;
    margin: 0;
    display: grid;
    place-items: center;
    padding-top: 10px;
    .avatar-popover-single-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 34px;
        width: 100%;
        color: $text-color;
        fill: $text-color;
        font-size: 14px;
        cursor: pointer;
        transition: background-color .3s;

        &:hover {
            background-color: $item-color-hover;
        }
        .single-item {
            display: flex;
            color: $text-color;
            text-decoration: none;
            align-items: center;
            margin: auto;
        }

        .single-item span {
            line-height: 14px;
            margin-left: 10px;
        }

    }

    .placeholder {
        width: 80%;
        border-bottom: 1px solid #ddd;
    }
    .logout {
        display: flex;
        justify-content: initial !important; 
        
        span {
            line-height: 14px;
            margin-left: 10px;
        }
    }
    
}

</style>
