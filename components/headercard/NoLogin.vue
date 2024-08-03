<template>
    <div class="no-login-popover-container">
        <div class="no-login-popover-item-title">
            <span>登录后你可以:</span>
        </div>
        <div class="no-login-popover-item-list">
            <div class="no-login-popover-item-list-data">
                <IconsHeaderbarHD class="data-icon"/>
                <span>免费看高清视频</span>
            </div>
            <div class="no-login-popover-item-list-data">
                <IconsHeaderbarBoFangJl class="data-icon"/>
                <span>多端同步播放记录</span>
            </div>
            <div class="no-login-popover-item-list-data">
                <IconsHeaderbarDanMu class="data-icon"/>
                <span>发表弹幕/评论</span>
            </div>
            <div class="no-login-popover-item-list-data">
                <IconsHeaderbarVideo class="data-icon"/>
                <span>热门影视番剧看不停</span>
            </div>
        </div>
        <div class="no-login-popover-item-submit">
            <button @click="gologin">立即登录</button>
            <div class="text">首次使用？<span @click="goregister">点我注册</span></div>
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['isLogin']);
const gologin = () => {
    emit('isLogin', true)
}
const goregister = () => {
    emit('isLogin', true)
}
</script>

<style scoped lang="scss">
.no-login-popover-container {
    box-sizing: border-box;
    width: 350px;
    height: 230px;
    padding: 20px;
    display: grid;
    place-items: center;
    cursor: pointer;

    .no-login-popover-item-title {
        width: 100%;
        height: 14px;
        span{
            line-height: 14px;
            font-size: 14px;
            color: $text-color;
        }
    }

    .no-login-popover-item-list {
        width: 100%;
        height: 70px;
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        grid-template-rows: repeat(2, 1fr);
        
        .no-login-popover-item-list-data {
            width: 100%;
            height: 22px;
            padding-top: 4px;

            .data-icon {
                height: 22px;
                width: 22px;
                line-height: 22px;
                vertical-align: -5px;
                fill: $theme-color;
            }
            span{
                line-height: 22px;
                font-size: 14px;
                margin-left: 4px;
                color: $text-color;
            }
        }
        
    }

    .no-login-popover-item-submit {
        width: 100%;
        height: 60px;

        button {
            width: 100%;
            height: 36px;
            background-color: $theme-color;
            font-size: 14px;
            color: #ffffff;
            border-radius: 6px;
            border: none;
            cursor: pointer;

            &:hover {
                background-color: $theme-color-hover;
            }
        }

        .text {
            padding-top: 10px;
            height: 20px;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: $text-color;

            span {
                color: $theme-color;
            }
        }
        
    }
    
}
</style>