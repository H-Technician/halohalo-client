<template>
    <div class="avatar-popover-area">
        <div class="avatar-popover-username">
            <a href="" class="avatar-popover-item-username">
                <span>{{  props.userInfo.nickname }}</span>
            </a>
        </div>
        <div class="avatar-popover-coins">
            <a href="" target="_blank" class="avatar-popover-item-coins">
                <span class="coins-text">硬币:</span><span class="coins-num">{{  props.userInfo.coin }}</span>
            </a>
            <a href="" target="_blank" class="avatar-popover-item-coins">
                <span class="coins-text">h币:</span><span class="coins-num">10</span>
            </a>
        </div>
        <div class="avatar-popover-level">
            <div class="avatar-popover-level-progress">
                <IconsLevelLv4 />
                <!-- <el-progress :percentage="60" style="width: 182px; margin-top: 16px;" :show-text="false" :stroke-width="2" color="#f3cb85"/> -->
                <div class="level-progress">
                    <div class="bg"></div>
                </div>
                <IconsLevelLv5 />
            </div>
            <a href="">当前成长11111，距离升级Lv6 还需要17689</a>
        </div>
        <div class="avatar-popover-entry">
            <a href="" target="_blank" class="avatar-popover-outside">
                <span class="outside-num">34</span>
                <span class="outside-text">关注</span>
            </a>
            <a href="" target="_blank" class="avatar-popover-outside">
                <span class="outside-num">28</span>
                <span class="outside-text">粉丝</span>
            </a>
            <a href="" target="_blank" class="avatar-popover-outside">
                <span class="outside-num">10</span>
                <span class="outside-text">动态</span>
            </a>
        </div>
        <a href="" target="_blank" class="avatar-popover-vip">
            <div class="avatar-popover-vip-left">
                <span class="vip-text">联合会员超值月卡上线</span>
                <span class="vip-price">低至0.4元/天</span>
            </div>
            <div class="avatar-popover-vip-right">
                <button class="vip-btn">立即参与</button>
            </div>
        </a>
        <a href="" target="_blank" class="avatar-popover-single-item">
            <div class="single-item-left">
                <IconsHeaderbarGeRenzx />
                <span>个人中心</span>
            </div>                            
            <el-icon><ElIconArrowRightBold /></el-icon>
        </a>
        <a href="" target="_blank" class="avatar-popover-single-item">
            <div class="single-item-left">
                <IconsHeaderbarTouGaoGL />
                <span>投稿管理</span>
            </div>                            
            <el-icon><ElIconArrowRightBold /></el-icon>
        </a>
        <a href="" target="_blank" class="avatar-popover-single-item">
            <div class="single-item-left">
                <IconsHeaderbarTuiJian />
                <span>推荐服务</span>
            </div>                            
            <el-icon><ElIconArrowRightBold /></el-icon>
        </a>
        <div class="placeholder"></div>
        <div class="avatar-popover-single-item logout" @click="logout">
            <IconsHeaderbarDengChu class="icon"/>
            <span>退出登录</span>
        </div>

    </div>
</template>
<script setup lang="ts">
import { logoutApi } from '@/api/login';
import { removeLocalStoragejwt } from '@/utils/localStorage'; 
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['islogout']);
const logout = async () => {
    const response = await logoutApi();
    if (response.code === 200) {
        removeLocalStoragejwt();
        ElMessage.success(response.msg);
        emit('islogout', false);
    } else if (response.code === 401) {
        removeLocalStoragejwt();
        ElMessage.success(response.msg);
        emit('islogout', false);
    }
    
}
</script>
<style scoped lang="scss">
.avatar-popover-area {
    box-sizing: border-box;
    width: 290px;
    height: 450px;
    margin: 0;
    display: grid;
    place-items: center;
    padding: 34px 20px 10px;

    .avatar-popover-username {
        display: block;
        text-align: center;
        width: 100%;
        height: 24px;
        line-height: 24px;
        margin-top: 10px;

        .avatar-popover-item-username {
            text-decoration: none;
            color: #000000;
            font-size: 18px;
            span {
                display: block;
                align-items: center;
                margin: 0 auto;
            }
        }
    }
    .avatar-popover-coins {
        display: block;
        text-align: center;
        width: 100%;
        height: 13px;
        line-height: 13px;

        .avatar-popover-item-coins {
            font-size: 13px;
            text-decoration: none;

            .coins-text {
                margin: 0 2px;
                color: $item-color--;
            }
            .coins-num {
                margin: 0 2px;
                color: #000000;
            }
        }
    }
    .avatar-popover-level {
        display: block;
        text-align: center;
        width: 100%;
        height: 44px;
        line-height: 44px;
        cursor: pointer;

        .avatar-popover-level-progress {
            display: flex;
            text-align: center;
            width: 100%;
            height: 12px;
            line-height: 12px;
            align-items: center;

            .level-progress {
                width: 100%;
                height: 1.8px;
                border-radius: 1px;
                margin: 4px 4px 0 4px;
                background-color: $item-color-hover;

                .bg {
                    width: 40%;
                    height: 100%;
                    background-color: #f3cb85;
                }
            }
        }

        a {
            text-decoration: none;
            font-size: 12px;
            color: $item-color--;
        }
    }
    .avatar-popover-entry {
        display: flex;
        align-items: center;
        margin-top: 8px;

        .avatar-popover-outside {
            display: flex;
            align-items: center;
            flex-direction: column;
            text-decoration: none;
            flex-shrink: 0;
            margin: 0 16px;
            min-width: 50px;
            text-align: center;
            cursor: pointer;
            
            .outside-num {
                font-size: 18px;
                color: #000000;
            }
            .outside-text {
                font-size: 12px;
                color: $text-color;
            }

            &:hover .outside-num {
                color: $theme-color;
            }
            &:hover .outside-text {
                color: $theme-color;
            }
        }
    }
    .avatar-popover-vip {
        position: relative;
        display: flex;
        text-decoration: none;
        height: 56px;
        width: 100%;
        margin-top: 12px;
        margin-bottom: 10px;
        border-radius: 8px;
        background-image: linear-gradient(to right top, #e1e9ff, #f6dced);

        .avatar-popover-vip-left {
            position: absolute;
            display: flex;
            top: 10px;
            left: 8px;
            flex-direction: column;
            flex-shrink: 0;
            min-width: 50px;
            text-align: left;
            cursor: pointer;

            .vip-text {
                font-size: 14px;
                color: $upload-background;

            }
            .vip-price {
                font-size: 12px;
                color: $text-color;
            }
        }
        .avatar-popover-vip-right {
            position: absolute;
            display: flex;
            top: 12px;
            align-items: center;
            right: 10px;
            .vip-btn {
                width: 74px;
                height: 30px;
                border-radius: 6px;
                border: 1px solid #fff;
                background-color: #fff;
                align-items: center;
                font-size: 14px;
                color: $upload-background;
                cursor: pointer;
            }
        }
    }

    .avatar-popover-single-item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-decoration: none;
        padding: 0 14px;
        height: 38px;
        width: 100%;
        border-radius: 8px;
        color: $text-color;
        fill: $text-color;
        font-size: 14px;
        cursor: pointer;
        transition: background-color .3s;
        margin-bottom: 2px;

        &:hover {
            background-color: $background--hover;
        }
        .single-item-left {
            display: flex;
            align-items: center;
        }

        .single-item-left span {
            line-height: 14px;
            margin-left: 10px;
        }

    }

    .placeholder {
        width: 100%;
        margin: 6px 0 12px 0;
        border-bottom: 1px solid #ddd;
    }
    .logout {
        display: flex;
        justify-content: initial !important; 
        
        span {
            line-height: 14px;
            margin-left: 10px;
        }
        .icon {
            width: 14px;
            height: 100%;
        }
    }
    
}

</style>