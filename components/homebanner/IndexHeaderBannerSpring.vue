<template>
    <div class="header-banner" ref="headerBanner">
        <!-- 动画效果头图，文件资源版权归bilibili官方所有，本项目仅用作学习，无商业用途！ -->
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/bg.webp" class="bg" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/cloud.webp" class="cloud" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/city.webp" class="city" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/mountains.webp" class="mountains" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/signboards.webp" class="signboards" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/bushes.webp" class="bushes" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/big-cat.webp" class="big-cat" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/big-cat-eyes.webp" class="big-cat-eyes" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/big-cat-no-eyes.webp" class="big-cat-no-eyes" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/kitten.webp" class="kitten" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/payphone.webp" class="payphone" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/pole01.webp" class="pole01" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/lawn01.webp" class="lawn01" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/big-bushes.webp" class="big-bushes" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/pole02.webp" class="pole02" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/girl-bicycle02.webp" class="girl-bicycle02" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/girl-bicycle01.webp" class="girl-bicycle01" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/flower02.webp" class="flower02" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/big-flower.webp" class="big-flower" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/lawn02.webp" class="lawn02" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/flower01.webp" class="flower01" alt="">
        </div>
        <div class="header-banner__inner">
            <video src="~assets/img/bilibili_banner_spring/video-butterfly.webm" class="video-butterfly" autoplay loop muted></video>
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/twig.webp" class="twig" alt="">
        </div>
        <div class="header-banner__inner">
            <img src="~assets/img/bilibili_banner_spring/butterfly.webp" class="butterfly" alt="">
        </div>
        <div class="header-banner__logo">
            <a  href="" target="_blank" class="logo-box">
                <img src="~/assets/img/homelogo.png" alt="">
            </a>
        </div>
    </div>

</template>
<script setup lang="ts">
const headerBanner = ref<HTMLElement | null>(null);
const headerBannerInner = ref<HTMLElement | null>(null);
// 初始化头图效果
const initHeader = () =>{
    let startingPoint: number;
    const headerBannerHTMLElement = headerBanner.value as HTMLElement; 
    let isMoving = false;

    function handleMouseMove(e: { clientX: number; clientY: number; }) {
        if (headerBannerHTMLElement) {  
            // 现在可以安全地使用headerBannerHTMLElement，因为它不是null  
            const headerRect = headerBannerHTMLElement.getBoundingClientRect(); // 动态获取header的位置
            if (
                e.clientX >= headerRect.left && e.clientX <= headerRect.right &&
                e.clientY >= headerRect.top && e.clientY <= headerRect.bottom
            ) {
                // 当鼠标进入头图范围就开始动态效果
                if (!isMoving) {
                    startingPoint = e.clientX;
                    isMoving = true;
                }
                let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.1;
                headerBannerHTMLElement.style.setProperty('--percentage', percentage as unknown as string);
            } else {
                // 鼠标移出头图范围，效果复原
                if (isMoving) {
                    headerBannerHTMLElement.style.setProperty('--percentage', '0.1');
                    isMoving = false;
                }
            }  
        }
        
    }

    function handleMouseOut (e: { clientX: number; clientY: number; }) {
            // 鼠标离开窗口时，头图回到原位
            headerBannerHTMLElement.style.setProperty('--percentage', '0.1');
            isMoving = false;
    }

    // 监听窗口鼠标移动事件，触发头图转变效果
    document.addEventListener('mousemove', handleMouseMove);
    // 检测鼠标是否离开窗口
    document.addEventListener('mouseout', handleMouseOut);
}

onMounted(() => {
    // 初始化头图的监听器
    initHeader();
});
onBeforeUnmount(() => {
    document.removeEventListener('mousemove', initHeader);
    document.removeEventListener('mouseout', initHeader);
})
</script>

<style scoped lang="scss">
.header-banner {
    position: relative;
    z-index: 0;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    min-height: 155px;
    height: 9.375vw;
    max-height: 240px;
    height: 100%;
    width: 100%;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    // --percentage: 0.1;
    animation: resetAnimation 0.5s forwards ease;

    .header-banner__inner {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .bg {
            width: 2000px;
            height: 187px;
            transform: translate(0px, 0px) rotate(0deg) scale(1);
        }

        .cloud {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 0px) rotate(0deg) scale(1); 
            transform: translatey(calc(var(--percentage) * 10px));
        }

        .city {
            height: 224.4px; 
            width: 2400px; 
            transform: translate(300px, 24px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 10px));
        }

        .mountains {
            height: 205.7px; 
            width: 2200px; 
            transform: translate(330px, 33px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 30px));
        }

        .signboards {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 30px));
        }

        .bushes {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 40px));
        }

        .big-cat {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 40px));
        }

        .big-cat-eyes {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 50px));
        }

        .big-cat-no-eyes {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 40px));
        }

        .kitten {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 40px));
        } 

        .payphone {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 75px));
        }

        .pole01 {
            height: 187px; 
            width: 2000px; 
            transform: translate(100px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 80px));
        }

        .lawn01 {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 80px));
        }

        .big-bushes {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 10px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 90px));
        }

        .pole02 {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1); 
            transform: translatex(calc(var(--percentage) * 90px));
        }

        .girl-bicycle02 {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 100px));
        }

        .girl-bicycle01 {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 100px));
        }

        .flower02 {
            height: 187px; 
            width: 2000px; 
            transform: translate(-100px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 110px));
        }

        .big-flower {
            height: 168.3px; 
            width: 1800px; 
            transform: translate(-90px, 0px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 120px));
        }

        .lawn02 {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 0px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 120px));
        }

        .flower01 {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 0px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 130px));
        }

        .video-butterfly {
            object-fit: cover; 
            height: 100px; 
            width: 180px; 
            transform: translate(-245px, 15px) rotate(0deg) scale(1);
            /* transform: translatex(calc(var(--percentage) * 1px));*/
        }

        .twig {
            height: 205.7px; 
            width: 2200px; 
            transform: translate(0px, 0px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 140px));
        }

        .butterfly {
            height: 187px; 
            width: 2000px; 
            transform: translate(0px, 15px) rotate(0deg) scale(1);
            transform: translatex(calc(var(--percentage) * 140px));
        }
    }
    .header-banner__logo {
        position: relative;
        width: 100%;
        max-width: 2078px;
        margin: 0 auto;
        display: flex;

        .logo-box {
            text-decoration: none;
            display: block;
            img {
                position: absolute;
                height: 65px;
                width: auto;
                margin-top: 60px;
                margin-left: 50px;
                cursor: pointer;
            }
        } 
    }  
}
</style>