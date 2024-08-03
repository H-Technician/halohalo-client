<template>
    <NuxtLayout name="publiclayout">
        <Title>哈喽哈喽 (゜-゜)つロ 干杯~-halohalo-测试页面1-{{ title }}</Title>
        <div id="xgplayer"></div>
        <div class="test">
            <el-button type="primary" @click="getUserInfo">请求测试服务端</el-button>
            <el-button type="primary" @click="govideo(1)">平凡的一天</el-button>
            <el-button type="primary" @click="govideo(2)">熊出没</el-button>
            <el-button type="primary" @click="govideo(3)">气象站台</el-button>
            <el-button type="primary" @click="test5">点击</el-button>

            <div style="display: block;">
                <span style="display: block;">{{ UserInfoUpdata?.uid }}</span>
                <span style="display: block;">{{ UserInfoUpdata?.username }}</span>
                <span style="display: block;">{{ UserInfoUpdata?.nickname }}</span>
                <span style="display: block;">{{ UserInfoUpdata?.gender }}</span>
                <span style="display: block;">{{ UserInfoUpdata?.description }}</span>
                <span style="display: block;">{{ UserInfoUpdata?.mail}}</span>
                <span style="display: block;">{{ UserInfoUpdata?.phone }}</span>
            </div>
            <!-- <div style="height: 296px; width: 260px; padding: 10px 16px; background: hsla(0, 0%, 8%, .9); border-radius: 2px;">
                <div class="play-panel-item"></div>
            </div> -->
            <div class="tooltip-test">
                <div class="text-test">
                    真好呀,不错不错哟
                    <div class="ui-tip ui-tip-arrow ui-tip-arrow-up ui-theme-black hl_dm_tip"  id="tip_1">
                        <div class="hl_dam_like">
                            <span>10</span>
                        </div>
                        <div class="hl_dam_copy"></div>
                        <div class="hl_dam_withdraw"></div>
                    </div>
                </div>
                <!-- <div class="ui-tip ui-tip-arrow ui-tip-arrow-up ui-theme-black"  id="tip_1">箭头向上的tip层</div> -->
                <!-- <div class="ui-tip ui-tip-arrow ui-tip-arrow-down ui-theme-black"  id="tip_2">just code it!</div> -->
            </div>
            <div style="width: 150px; height: 150px;">
                <!-- <svg width="150" height="150" viewBox="0 0 150 150"> -->
                    <!-- 设置背景 -->
                    <!-- <circle cx="75" cy="75" r="60" fill="#000" />
                    <circle cx="75" cy="75" r="60" fill="none" stroke="#ddd" stroke-width="8" />
                    <circle ref="progressCircle" id="progressCircle" cx="75" cy="75" r="60" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="377" stroke-dashoffset="0"></circle> -->
                    <!-- 叉符号 -->
                    <!-- <path d="M 50,50 L 100,100 M 50,100 L 100,50" stroke="#fff" stroke-width="4" fill="none" />
                </svg> -->
                <IconsPlayClose />
            </div>
            <!-- <svg t="1722476693366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4300" width="48" height="48">
                <path d="M801.856 734.016 579.904 512l222.016-222.016c18.816-18.816 18.88-49.152 0.064-67.968-18.752-18.752-49.216-18.752-67.904 0L512 444.032 289.92 222.016c-18.688-18.752-49.088-18.752-67.904 0C203.328 240.768 203.328 271.232 222.144 290.048L444.096 512l-222.016 221.952c-18.816 18.752-18.816 49.152-0.064 67.968C231.424 811.392 243.84 816 256 816s24.576-4.608 33.92-14.016L512 579.968l222.08 222.016c9.408 9.344 21.696 14.016 33.92 14.016 12.288 0 24.576-4.608 33.92-14.016C820.672 783.104 820.736 752.768 801.856 734.016z" p-id="4301"></path>
            </svg> -->
            <el-button type="primary" @click="toggleAnimation()">暂停/继续</el-button>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css'
import type { UserInfo } from '@/types/user'
// import Danmu from 'xgplayer/es/plugins/danmu'
import 'xgplayer/es/plugins/danmu/index.css'
import HlsPlugin from 'xgplayer-hls'
const UserInfoUpdata = ref<UserInfo>();
import Http  from '@/composables/useRequest'
const videoUrl = ref<string>('https://haliyunoss.oss-cn-chengdu.aliyuncs.com/ordinaryDay/output.m3u8');
const title = ref<string>('平凡的日子');
const progressCircle = ref<HTMLElement | null>(null);
// const NewTokenStore = useNewTokenStore();// 正确访问类型为string的全局变量
// const NewRefreshToken = useNewTokenStore();
// console.log(NewTokenStore.newAccessToken);
// console.log(NewTokenStore.newRefreshToken);
// const CookiesTokentest = useCookie("halohaloToken");
// if (CookiesTokentest.value) {
//     NewTokenStore.setNewAccesstoken(CookiesTokentest.value); // 修改全局变量，参数类型需为string
//     console.log('测试' + NewTokenStore.newAccesstoken);
// }
const handleVideoChange = () => {
    console.log('change')
}
const test4 = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); 
const test5 = () => {
    test4.value[0] = 100;
    console.log(test4.value);
}

const getUserInfo = async () => {
    console.log('获取用户信息')
    //const userId = localStorage.getItem('halohaloUid');
  const res = await Http.get('/user/account/getUserInfo')
  if (res.code === 200) {
    // 获取用户信息成功
    //console.log(userinfo.data)
    // userInfo.value = userinfo.data
    //isLogin.value = true
    UserInfoUpdata.value = res.data as UserInfo;
    console.log(UserInfoUpdata.value)
  } else {
    // 获取用户信息失败
    // console.log(userinfo.data)
  }
}
const govideo = (video: number) => {
    switch (video) {
        case 1:
            videoUrl.value = 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/ordinaryDay/output.m3u8';
            init(videoUrl.value);
            title.value = '平凡的一天';
            break;
        case 2:
            videoUrl.value = 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/BoonieBears/output.m3u8';
            init(videoUrl.value);
            title.value = '熊出没';
            break;
        case 3:
            videoUrl.value = 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/test/test.m3u8';
            init(videoUrl.value);
            title.value = '气象站台';
            break;
    
    }
}
// const { data: data2 } = useAsyncData('uniqueKey2', async () => {   
//     try {  
//     // 调用你自己封装的方法  
//     const result1 = await Http.get('/user/account/test')  
//     return result1 // 返回的数据将被赋值给 `data`  
//   } catch (err) {  
//     throw err // 如果有错误，抛出错误以便 Nuxt 可以处理它  
//   } 
// })


const isshow = ref(false)
const show = () => {
    isshow.value = true
}
const isShowDialog = (msg: any) => {
    // console.log(msg.value)
    if (msg.value) {
        isshow.value = true;
    } else {
        isshow.value = false;
    }
}
const init = async (url: string) => {
    const [Danmu] = await Promise.all([
    import('xgplayer/es/plugins/danmu')
    ])
    if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
        // 原生支持 hls 播放
        player = new Player({
            id: 'xgplayer',
            url: url,
            rotateFullscreen: false,
            controls: {
                autoHide: true,
                mode: 'normal'
            },
            volume: {
                showValueLabel :true
            },
            dynamicBg: {
                disable: false
            },
            miniscreen: {
                // disable: false,
                // isShowIcon: true,
                isScrollSwitch: true,
                disableDrag: true,
                left: "1000",
                top: "600",
                width: "160",
                height: "90"
            },
            // mini: true, 
            plugins: [Danmu.default],
            danmu: {
                defaultOpen: true,
                comments: [
                    {
                    duration: 15000,
                    id: '1',
                    start: 3000,
                    txt: '好看，精彩！！！',
                    //弹幕自定义样式
                    style: {
                        color: '#ff9500',
                        fontSize: '20px',
                        border: 'solid 1px #ff9500',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                    },
                    {
                    duration: 15000,
                    id: '1',
                    start: 3000,
                    txt: '好看，精彩！！！',
                    //弹幕自定义样式
                    style: {
                        color: '#ff9500',
                        fontSize: '20px',
                        border: 'solid 1px #ff9500',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                    },
                    {
                    duration: 15000,
                    id: '1',
                    start: 3000,
                    txt: '好看，精彩！！！',
                    //弹幕自定义样式
                    style: {
                        color: '#ff9500',
                        fontSize: '20px',
                        border: 'solid 1px #ff9500',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                    },
                    {
                    duration: 15000,
                    id: '1',
                    start: 3000,
                    txt: '好看，精彩！！！',
                    //弹幕自定义样式
                    style: {
                        color: '#ff9500',
                        fontSize: '20px',
                        border: 'solid 1px #ff9500',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                    },
                    {
                    duration: 15000,
                    id: '1',
                    start: 3000,
                    txt: '好看，精彩！！！',
                    //弹幕自定义样式
                    style: {
                        color: '#ff9500',
                        fontSize: '20px',
                        border: 'solid 1px #ff9500',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                    }
                ],
                area: {
                    start: 0,
                    end: 1
                }
            },
            definition: {
                list: [{
                definition: '1080p',// 清晰度
                url: videoUrl.value,
                text: {
                    zh: '标清', // 显示中文文案
                    en: '1080P' // 显示英文文案
                }
                },{
                definition: '720p',// 清晰度
                url: videoUrl.value,  // 对应播放地址
                text: {
                    zh: '高清',  // 显示中文文案
                    en: '720P'   // 显示英文文案
                }
                }],
                defaultDefinition: "1080p"
            }
            
        })
    } else if (HlsPlugin.isSupported()) { // 第一步
        player = new Player({
            id: 'xgplayer',
            isLive: false,
            url: url, // hls 流地址
            rotateFullscreen: false,
            plugins: [HlsPlugin, Danmu.default], // 第二步
            controls: {
                autoHide: true,
                mode: 'normal'
            },
            danmu: {
                defaultOpen: true
            },
            volume: {
                showValueLabel :true,
                showIcon: true,
                comments: [
                    {
                    duration: 15000,
                    id: '1',
                    start: 3000,
                    txt: '好看，精彩！！！',
                    //弹幕自定义样式
                    style: {
                        color: '#ff9500',
                        fontSize: '20px',
                        border: 'solid 1px #ff9500',
                        borderRadius: '50px',
                        padding: '5px 11px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                    }
                ],
                area: {
                    start: 0,
                    end: 1
                }
            },
            dynamicBg: {
                disable: false
            },
            miniscreen: {
                // disable: false,
                // isShowIcon: true,
                isScrollSwitch: true,
                disableDrag: true,
                left: "1000",
                top: "600",
                width: "160",
                height: "90"
            },
            definition: {
                list: [{
                definition: '4k',// 清晰度
                url: videoUrl.value,
                text: {
                    zh: '4k', // 显示中文文案
                    en: '4k' // 显示英文文案
                }
                },{
                definition: '1080p',// 清晰度
                url: videoUrl.value,  // 对应播放地址
                text: {
                    zh: '1080p高清',  // 显示中文文案
                    en: '1080p'   // 显示英文文案
                }
                },{
                definition: '720p',// 清晰度
                url: videoUrl.value,  // 对应播放地址
                text: {
                    zh: '720p高清',  // 显示中文文案
                    en: '720P'   // 显示英文文案
                }
                },{
                definition: '480p',// 清晰度
                url: videoUrl.value,  // 对应播放地址
                text: {
                    zh: '480p标清',  // 显示中文文案
                    en: '480P'   // 显示英文文案
                }
                }],
                defaultDefinition: "1080p"
        }
        })
    }
}
let animationPaused = false;

function toggleAnimation() {
    if (!progressCircle.value) return;
    if (animationPaused) {
        progressCircle.value.style.animationPlayState = 'running';
        animationPaused = false;
    } else {
        progressCircle.value.style.animationPlayState = 'paused';
        animationPaused = true;
    }
}
let player: Player
onMounted(async () => { 
    init(videoUrl.value);
})

</script>
<style scoped lang="scss">
#xgplayer {
    margin: auto;
    margin-top: 64px;
    width: 720px !important;
    height: 400px !important;
    z-index: 1;
}
.test {
    width: 800px;
    height: 660px;
    display: flex;
    justify-content: center;
}

.text-container {
    width: 200px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}
.text-container:empty { /* 内容区域空状态时的样式 */
    background-color: #F2F2F2;
}
.text-container:empty::after { /* 内容区域空状态时追加骨架屏样式 */
    content: '';
    display: block;
    width: 200px;
    height: 30px;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(225, 225, 225, 0.753), transparent);
    animation: loading 1.5s infinite;
}
.tooltip-test {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
}
.text-test {
    position: relative;
    width: auto;
    height: 24px;
    font-size: 16px;
}
/* tips */
.ui-tip{
    top: 120%;
    width: auto;
    height: 28px;
    padding: .3rem;
    margin: 0 auto;
    position: absolute;
    text-align: center;
    border-radius: 28px;
    border: 1px solid #FFFFFF;
    line-height: 28px;
}
/* tip with arrow */
.ui-tip-arrow::before,.ui-tip-arrow::after{
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0px;
    border-width: .25rem;
    border-style: solid;
}
/* arrow up */
.ui-tip-arrow.ui-tip-arrow-up::after{ 
    border-left-color: transparent;
    border-top-color: transparent;
    bottom: 100%;
    right: 50%;
}
.ui-tip-arrow.ui-tip-arrow-up::before{
    border-right-color: transparent;
    border-top-color: transparent;
    bottom: 100%;
    left: 50%;
}
/* arrow down */
.ui-tip-arrow.ui-tip-arrow-down::after{ 
    border-left-color: transparent;
    border-bottom-color: transparent;
    right: 50%;
    top: 100%;
}
.ui-tip-arrow.ui-tip-arrow-down::before{
    border-right-color: transparent;
    border-bottom-color:transparent;
    left: 50%;
    top: 100%;
}
/* a black background theme */
.ui-theme-black{
    background-color:hsla(0, 0%, 8%, .9);
    color: #FFFFFF;
}
.ui-theme-black::after,.ui-theme-black::before {
    border-color: hsla(0, 0%, 8%, .9);
}
.hl_dm_tip {
    display: flex;
    align-items: center;
    justify-content: center;
}
.hl_dam_like {
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: url(@/assets/img/like.svg) no-repeat;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 8px;
    position: relative;
    span {
        font-size: 10px;
        position: absolute;
        top: -10px;
        color: #FFFFFF;
        right: -10px;
    }
}
.hl_dam_copy {
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: url(@/assets/img/copy.svg) no-repeat;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 8px;
}
.hl_dam_withdraw {
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: url(@/assets/img/withdraw.svg) no-repeat;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 8px;
}
@keyframes loading{ /* 骨架屏的动画 */
    100% {
        transform: translateX(100%);
    }
}
#progressCircle {
    -webkit-transform: stroke-dashoffset 5s ease-in-out;
    transition: stroke-dashoffset 5s ease-in-out;
    -webkit-animation: progressAnimation 5s linear infinite;
    animation: progressAnimation 5s linear infinite;
    -webkit-transform-origin: center;
    transform-origin: center;
    transform: rotate(-90deg);
}

@keyframes progressAnimation {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 377; }
}

</style>
