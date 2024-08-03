<template>
    <div class="home-carousel_warp">
        <div class="home-carousel-skeleton_warp" :style="isImgsDownLoad ? 'display: none;' : ''">
            <div class="home-carousel-skeleton-box"></div>
        </div>
        <div class="home-carousel-box">
            <NuxtLink to="https://www.hblog.top" target="_blank" class="carousel-container"
                :style="`width: ${data.containerWidth}%;transition: ${data.transition};transform: ${data.transform}`"
                @mouseover="manualSwitching(null, false)" @mouseleave="manualSwitching(null, true)">
                <div class="carousel-item" :style="`width: ${data.itemWidth}% `" v-for="(item, index) in data.playList" :key="index"  v-if="carouselLoadList.length > 0">
                    <img class="carousel-img" :src="item.url" :alt="item.title + ' 轮播图'" :style="carouselLoadList.includes(item.id) ? '' : 'display: none;'" :key="item.id"/>
                    <div class="carousel-mask" :style="`background-color: ${item.color}`"></div>
                </div>
            </NuxtLink>
            <div class="carousel-footer">
                <div class="tool">
                    <NuxtLink to="/test" target="_blank">
                        <p class="title" v-if="carouselList[data.currentIndex]">
                            {{ carouselList[data.currentIndex].title || "" }}
                        </p>
                    </NuxtLink>
                    <div class="dots">
                        <div class="dot" v-for="index of data.carouselCount" :key="index"
                            :class="data.currentIndex === index - 1 ? 'dot-active' : ''"
                            @click="changeCurrentIndex(index - 1)">
                            <!-- 吃豆人 -->
                            <div class="dot-item" :style="data.currentIndex === index - 1 ? 'display: none;' : ''"></div>
                            <div class="dot-active" :class="isreverse ? 'dot-active-reverse' : 'dot-active'">
                                <div v-if="data.currentIndex === index - 1"></div>
                                <div v-if="data.currentIndex === index - 1"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="arrow">
                    <button @click="arrowClick(false)">
                        <el-icon size="14"><ElIconArrowLeftBold /></el-icon>
                    </button>
                    <button @click="arrowClick(true)">
                        <el-icon size="14"><ElIconArrowRightBold /></el-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Carousel } from "@/types/carousel";
const carouselLoadList = ref<number[]>([]);
const data = reactive<{
    carouselCount: number
    itemWidth: number
    containerWidth: number
    currentIndex: number
    carouselTimer: NodeJS.Timeout | null;
    playList: Array<Carousel>
    transition: string
    transform: string
}>({
    carouselCount: 0,//轮播图数量
    itemWidth: 100,
    containerWidth: 100,
    currentIndex: 0,
    carouselTimer: null,//自动切换计时器
    playList: [{
    title: '被穷鬼缠上了怎么办？',
    url: 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/lw1kx-hkspf.png' ,
    // url: 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/976w_550h_1c-web-home-carousel-cover.avif' ,
    color: '#6a4336' ,
    type: 'video' ,
    id: 1 ,
},
{
    title: '堪称“叫父”级别的振刀' ,
    url: 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/mx9ov-g6215.png' ,
    color: '#452d2a' ,
    type: 'video' ,
    id: 2 ,
},
{
    title: '十年后的一次探访，我才读懂“教育的闭环”竟然' ,
    url: 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/rjh3e-zltaf.png' ,
    color: '#865e39' ,
    type: 'video' ,
    id: 3 ,
},
{
    title: '残血遇强敌，又陷生死局！' ,
    url: 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/tyjzh-7tyty.png' ,
    color: '#1f1c20' ,
    type: 'video' ,
    id: 4 ,
},
{
    title: '法情冲突下的正义命题！' ,
    url: 'https://haliyunoss.oss-cn-chengdu.aliyuncs.com/img/carousel/v44ih-zi3rp.jpg' ,
    color: '#5f4b2e' ,
    type: 'video' ,
    id: 5 ,
}],//播放列表
    transition: "",
    transform: ""
});

const isImgsDownLoad =ref(false);
const carouselList = ref<Array<Carousel>>([]);
const carouselContainer = ref<HTMLElement | null>(null);
const urls: string[] = data.playList.map((item: { url: any; }) => item.url);
const isreverse = ref(false);

//初始化轮播图
const initCarousel = () => {
    data.carouselCount = carouselList.value.length;
    data.itemWidth = 100 / data.carouselCount;
    data.containerWidth = 100 * data.carouselCount;

    // 将最后一张图挪到最前面
    data.playList = handelSequence(carouselList.value, data.carouselCount - 1);

    //设置初始状态
    nextTick(() => {
        //设置初始偏移量
        if (carouselContainer.value) {
            carouselContainer.value.style.transform = `translateX(-${data.itemWidth}%)`;
        }
    })
}

// 开启定期切换
const startInterval = () => {
    data.carouselTimer = setInterval(() => {
        changeCurrentImg(true);
    }, 2500)
}

//切换当前图片
const changeCurrentImg = (isNext: boolean) => {
    let translateX = 0;
    if (isNext) {
        translateX = -data.itemWidth * 2;
        data.currentIndex = data.currentIndex + 1 >= data.carouselCount ? 0 : data.currentIndex + 1;
    } else {
        //如果点击的是左边按钮 isreverse.value 的值变成 true;
        isreverse.value = true
        data.currentIndex = data.currentIndex - 1 < 0 ? data.carouselCount - 1 : data.currentIndex - 1;
    }
    data.transition = "transform 300ms ease 0s";
    data.transform = `translateX(${translateX}%)`;

    setTimeout(() => {
        data.transition = "transform 0ms ease 0s";
        data.transform = `translateX(-${data.itemWidth}%)`;
        if (isNext) {
            //将第一张房到最后
            data.playList = handelSequence(data.playList, 1);
        } else {
            //将最后一张放最前面
            data.playList = handelSequence(data.playList, data.carouselCount - 1);
        }

    }, 300)
    //定时800ms后吃人豆方向恢复向右
    //isreverse.value 的值变成 false;
    if (isreverse.value){
        setTimeout(() => {
            isreverse.value = false;
        }, 800);
    }
}

//根据index切换图片
const changeCurrentIndex = (i: number) => {
    if (i === data.currentIndex) return;
    manualSwitching(() => {
        if (i === 0) {
            isreverse.value = true;
            // 将最后一张图挪到最前面
            data.playList = handelSequence(carouselList.value, data.carouselCount - 1);
        } else {
            if (i < data.currentIndex){
                isreverse.value = true;
            }else if ( i > data.currentIndex){
                isreverse.value = false;
            }
            // 当前图片前一张在最前面，其他图片依次排列
            data.playList = handelSequence(carouselList.value, i - 1);
        }
        data.currentIndex = i;
        if (isreverse.value){
            setTimeout(() => {
                isreverse.value = false;
            }, 600);
        }
    });
}

//点击切换按钮
const arrowClick = (() => {
    //节流
    var timer: NodeJS.Timeout | null = null;
    return (isNext: boolean) => {
        if (timer) return;

        manualSwitching(() => {
            changeCurrentImg(isNext);
        });

        timer = setTimeout(() => {
            timer = null;
        }, 300);
    }
})();

//手动切换
const manualSwitching = (fn: null | (() => void), recoverable = true) => {
    if (data.carouselTimer) {
        clearInterval(data.carouselTimer);
        data.carouselTimer = null;
    }
    if (typeof fn === "function") fn();
    //判断是否需要恢复计时
    if (!recoverable) return;
    startInterval();
}

//处理图片顺序
const handelSequence = (data: any[], start: number) => {
    const before = data.slice(0, start);
    return [...data.slice(start, data.length), ...before];
}
// 判断图片是否完全加载
const loadCarouselImgs = async (url: string, index: number) => {
    await loadImage(url, () => {
        // 将当前图片加载完成的index添加到数组中
        carouselLoadList.value.push(index);
        // console.log('所有图片加载完成');
    }, (error) => {
        console.error('图片加载失败:', error.message);
    });
}

onMounted(async () => {  
    carouselList.value = data.playList;
    // await loadImage(carouselList.value[0].url, () => {
    //     carouselLoadList.value.push(carouselList.value[0].id);
    //     console.log(carouselLoadList.value);
    //     //isImgsDownLoad.value = false;// 所有图片加载成功后隐藏骨架屏
    // }, (error) => {
    //     console.error('图片加载失败:', error.message);
    // });
    for (let i = 0; i < carouselList.value.length; i++) {
        await loadCarouselImgs(carouselList.value[i].url, carouselList.value[i].id);
    }
    isImgsDownLoad.value = true; // 所有图片加载成功后隐藏骨架屏
    console.log(carouselLoadList.value);
    // await loadImages(urls, () => {
    //     isImgsDownLoad.value = false; // 所有图片加载成功后隐藏骨架屏
    // // console.log('所有图片加载完成');
    // }, (error) => {
    //     console.error('图片加载失败:', error.message);
    // });
    initCarousel();
    startInterval();
});
</script>
  
<style scoped lang="scss">
.home-carousel_warp {
    height: calc(100% - 76px);
    width: 100%;
    position: relative;
    .home-carousel-skeleton_warp {
        width: 100%; 
        height: 100%; 
        border-radius: 6px;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        .home-carousel-skeleton-box { 
            border-radius: 6px;  
            display: block;
            position: relative;
            top: 0;
            z-index: 3;
            left: 0;
            width: 100%;  
            height: 100%;  
            display: block;
            background: linear-gradient(
                100deg, 
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 60%
            ) #f0f2f5;
            background-size: 200% 100%;
            background-position-x: 120%;
            animation: loading 1.4s ease-in-out infinite;

            &::before {
                content: "";
                display: block;
            }
        }
    }
    .home-carousel-box {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        .carousel-container {
            height: 100%;
            width: 100%;
            text-decoration: none;
            display: flex;
            .carousel-item {
                //float: left;
                position: relative;
                height: auto;
                width: 100%;
                cursor: pointer;
                background: #f1f2f3;
                .carousel-img {
                    width: 100%;
                    height: auto;
                    display: block;
                    object-fit: cover;
                }
                .carousel-mask {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    user-select: none;
                    pointer-events: none;
                    mask-image: linear-gradient(0, #2f3238 100px, transparent 220px);
                    -webkit-mask-image: linear-gradient(0, #2f3238 100px, transparent 220px);
                }
                
            }
        }
        .carousel-footer {
            box-sizing: border-box;
            position: absolute;
            bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 100%;
            height: 70px;
            padding: 0 16px;  
            .arrow {
                position: absolute;
                top: 20px;
                right: 20px;
                display: flex;
                flex-wrap: nowrap;
                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 18px;
                    background-color: rgba(255, 255, 255, .2);
                    border: none;
                    outline: none;
                    cursor: pointer;
                    user-select: none;
                    -webkit-user-select: none;
                    &:first-child {
                        margin-right: 12px;
                    }
                    &:hover {
                        background-color: rgba(255, 255, 255, .3);
                    }
                }
            } 
            .tool {
                a {
                    text-decoration: none;
                }
                /* 标题 */
                .title {
                    color: #fff;
                    font-size: 18px;
                    margin-bottom: 6px;
                    cursor: pointer;
                    /* 超出10个字隐藏，之所以设置11em是因为省略号占一个位置 */
                    width: 25em;
                    overflow: hidden;
                    /* 显示省略符号来代表被修剪的文本。 */
                    text-overflow:ellipsis; 
                    /* 文本不换行 */
                    white-space:nowrap;

                }
                /*指示点 */
                .dots {
                    height: 20px;
                    display: table-cell;
                    text-align: center;
                    align-items: center;
                    .dot {
                        position: relative;
                        display: inline-block;
                        height: 12.8px;
                        width: 12.8px;
                        margin: 0 3px;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        transition: .5s;
                        .dot-item {
                            position: absolute;
                            justify-content: center;
                            align-items: center;
                            margin: 1.9px;
                            height: 9px;
                            width: 9px;
                            border-radius: 50%;
                            background-color: rgba(255, 255, 255, .3);
                        }
                         /* 吃豆人 */ 
                        .dot-active {
                            position: absolute;
                            width: 12.8px;
                            height: 12.8px;
                            align-items: center;
                            justify-content: center;
                            background: none;
                            div {
                                /* 绝对定位 两个重合 */
                                position: absolute;
                                width: 0;
                                height: 0;
                                border: 7px solid #fff;
                                border-radius: 50%;
                                border-right-width: 7px;
                                border-right-color: transparent;
                                &:nth-child(1) {
                                    /* 执行动画：动画名 时长 线性的 停留在最后一帧 */
                                    animation: dot-active1 0.75s linear forwards;
                                }
                                &:nth-child(2) {
                                    animation: dot-active2 0.75s linear forwards;
                                }
                            }
                        }
                        /* 根据左右切换求额定吃人豆是否反向 */
                        .dot-active-reverse {
                            position: absolute;
                            width: 12.8px;
                            height: 12.8px;
                            align-items: center;
                            justify-content: center;
                            transform: rotate(180deg);
                        }

                    }
                }
            }
        }
    }
}
// 骨架屏动画
@keyframes loading {
    to{
        background-position-x: -20%;
    }
}

/* 定义吃豆人动画 */
@keyframes dot-active1 {
  0% {
    transform: rotate(360deg);
  }
  40% {
    transform: rotate(270deg);
  }
  60% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes dot-active2 {
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(90deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
</style>