<template>
    <NuxtLayout name="searchlayout" :isDisplayHeader="isDisplayHeader">
        <Title>哈喽哈喽 (゜-゜)つロ 干杯~-halohalo-测试页面2</Title>
        <!-- <div class="test">>
            <div id="app"></div>
        </div> -->
        <!-- <div class="test"> -->
            <!-- <Captcha :showCaptcha="showCaptchaBox" @isshowCaptcha="isshowCaptcha">
                <template #content>
                    <span>测试</span>
                </template>
            </Captcha>
        </div>
        <button @click="test">测试</button> -->
         <div class="platform-navs">
            <div class="platform-nav-slider-sub-menu__wrap" :class="test1 ? 'active' : ''">
                <div class="platform-navs-item">
                    <div class="nav-wrap">
                        <span>首页</span>
                    </div>
                </div>
                <div class="platform-navs-item_active">
                    <div class="nav-wrap_active">
                        <span>首页1</span>
                    </div>
                    <div class="nav-wrap_active">
                        <span>首页1</span>
                    </div>
                </div>
            </div>
            <div class="platform-nav-slider-sub-menu__wrap bar-item">
                <div class="platform-navs-item">
                    <div class="nav-wrap">
                        <span>首页</span>
                    </div>
                </div>
            </div>
            
         </div>
        <Popconfirm :showDialog="false" width="370">
            <template #content>
                <div class="text-box">
                    <div class="text">确定要离开吗？</div>
                    <div class="subtext">系统可能不会保存填写的稿件信息噢...(´；ω；`)</div>
                </div>
            </template>
        </Popconfirm>
        <DialogDiaLog :showDialog="showCaptchaBox" width="1030">
            <template #content>
                <PlatformCardUploadVideoCard :file="file1" />
            </template>
        </DialogDiaLog>
        <input
            type="file"
            accept="video/*"
            ref="videoInput"
            @change="handleImagesChange"
            style="height: 40px; width: 900px;"
        >
        <!-- <Select style="margin-left: 40px;"></Select> -->
        <!-- <ClientOnly>
            <CropperPicture :videoFile="url"></CropperPicture>
        </ClientOnly> -->
        <div style="height: 458px; width: 732px; margin: 0 auto; margin-bottom: 40px; z-index: 1; position: relative;">
            <VideoplayerPlayer :videoUrl="m3u8Url" @changWebFullScreen="changWebFullScreen"/>
        </div>
        <div style="width: 100%; display: flex; justify-content: center;">
            <el-button type="primary" @click="govideo(0)">NeverGonna Give You Up</el-button>
            <el-button type="primary" @click="govideo(1)">青岛大学-满天星辰不及你</el-button>
            <el-button type="primary" @click="govideo(2)">青岛大学-岁月神偷</el-button>
            <el-button type="primary" @click="govideo(3)">青岛大学-青花瓷</el-button>
            <el-button type="primary" @click="govideo(4)">气象站台</el-button>
        </div>
        <!-- <Tooltip :overlayStyle="{height: '10px', width: 'auto'}" :tooltip="'Tooltip测试'">
            <button style="margin: 0 auto; height: 60px; width: 100px;">Tooltip测试</button>
        </Tooltip> -->
        <!-- <VideoplayerPanel>
            <template #reference>
                <button style="height: 60px; width: 100px;">Tooltip测试</button>
            </template>
            <template #content>
                <span>测试111</span>
            </template>
        </VideoplayerPanel> -->
        <div style="width: 100%; height: 900px;"></div>
    </NuxtLayout>
</template>
<script setup lang="ts">
const showCaptchaBox = ref(false);
const test1 = ref(false);
const img = ref('')
const url = ref();
const file1 = ref();
const isDisplayHeader = ref(true);
const videoUrls = [
    'https://static.v.hblog.top/uploads_2022_09_24_ge4ZfU9g_137649199_u2-1-208/index.m3u8',
    'https://static.v.hblog.top/《满天星辰不及你》范静如胡轶涵：青岛大学2022年6月18日毕业典礼快闪（官方超清字幕版）/index.m3u8',
    'https://static.v.hblog.top/2024青岛大学毕业典礼《岁月神偷》/index.m3u8',
    'https://static.v.hblog.top/《青花瓷》青岛大学2024年毕业典礼/index.m3u8',
    'https://static.v.hblog.top/test/test.m3u8'
];
const m3u8Url = ref<string>(videoUrls[0]);
const govideo = (video: number) => {
    switch (video) {
        case 0:
            m3u8Url.value = videoUrls[0];
            break;
        case 1:
            m3u8Url.value = videoUrls[1];
            break;
        case 2:
            m3u8Url.value = videoUrls[2];
            break;
        case 3:
            m3u8Url.value = videoUrls[3];
            break;
        case 4:
            m3u8Url.value = videoUrls[4];
            break;
    
    }
}
const test = () => {
   console.log(aesEncrypt(password.value, 'E5B056F43EBD7A2D45B3CFD8F1BE4A18'));
    switch (test1.value) {
        case true:
            test1.value = false;
            break;
        case false:
            test1.value = true;
            break;
    }
}
const password = ref('1234567890');
const handleImagesChange = async (event: Event) => {
    if (!event.target) return; // 添加类型断言
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    // url.value = URL.createObjectURL(file);
    file1.value = file;
    showCaptchaBox.value = true;
    // url.value = file;
    // const imageUrl = await readFileAsDataURL(file);
    // url.value = imageUrl;
    // const md5 = getFileMD5(file);
    // console.log(md5);
};
const changWebFullScreen = (isWebFullScreen: boolean) => {
    if (!isWebFullScreen) {
        isDisplayHeader.value = true;
    } else {
        isDisplayHeader.value = false;
    }
    // console.log(isWebFullScreen);
}
async function readFileAsDataURL(file: File) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(event) {
        resolve(event.target?.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
    });
}
onBeforeUnmount (() => {
    URL.revokeObjectURL(url.value);
});
// 获取用户信息
// const { data: userInfo, pending, error } = useAsyncData('getUserInfo', async () => {
//     if (isLogin.value){
//         try { 
//             const res = await Http.get('/user/account/getUserInfo')  
//             if (res.code === 200) {
//             // 获取用户信息成功
//             return res.data as UserInfo// 返回的数据将被赋值给 `data`  
            
//             } else if (res.code === 401) {
//             // console.log("获取失败")
//             isLogin.value = false;
//             }
//         } catch (err) {  
//             throw err // 如果有错误，抛出错误以便 Nuxt 可以处理它  
//         } 
//     }
// });
//console.log(userInfo);
</script>
<style scoped lang="scss">
.test {
    top: 60px;
    height: 400px;
    width: 600px;
    background-color: aqua;
}
#app {
    height: 100%;
    width: 100%;
}

.platform-navs {
    .platform-nav-slider-sub-menu__wrap {
        height: 46px;
        width: 200px;
        background-color: aqua;
        transition: all .2s ease;
        overflow: hidden;

        .platform-navs-item {
            display: block;
            box-sizing: border-box;
            width: 100%;
            height: 46px;
            line-height: 46px;
            padding: 0 24px 0 32px;
            .nav-wrap {
                width: 100%;
                height: 46px;
                line-height: 46px;
            }
        }

        .platform-navs-item_active {
            display: block;
            box-sizing: border-box;
            width: 100%;
            height: 46px;
            line-height: 46px;
            padding: 0 24px 0 72px;
            transition: all .2s ease;
            .nav-wrap_active {
                width: 100%;
                height: 100%;
                line-height: 46px;
            }
        }
    }

    .active {
        height: 136px;
    }
}

.cropper {
    width: 600px;
    height: 400px;
}

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
        font-size: 14px;
        line-height: 24px;
        color: #99a2aa;
        margin-top: 10px;
        text-align: center;
    }
}
</style>