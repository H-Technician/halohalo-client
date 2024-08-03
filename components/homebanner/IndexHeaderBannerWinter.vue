<template>
    <div class="header-banner">
        <!-- 动画效果头图，文件资源版权归bilibili官方所有，本项目仅用作学习，无商业用途！ -->
        <div class="view">
            <img src="~assets/img/bilibili_banner_winter/bilibili-winter-view-1.jpg" class="morning" alt="">
            <img src="~assets/img/bilibili_banner_winter/bilibili-winter-view-2.jpg" class="afternoon" alt="">
            <video autoplay loop muted class="evening">
                <source src="~assets/img/bilibili_banner_winter/bilibili-winter-view-3.webm" type="video/webm" />
            </video>
            <img src="~assets/img/bilibili_banner_winter/bilibili-winter-view-3-snow.png" class="window-cover" alt="">
        </div>
        <div class="tree">
            <img src="~assets/img/bilibili_banner_winter/bilibili-winter-tree-1.png" class="morning" alt="">
            <img src="~assets/img/bilibili_banner_winter/bilibili-winter-tree-2.png" class="afternoon" alt="">
            <img src="~assets/img/bilibili_banner_winter/bilibili-winter-tree-3.png" class="evening" alt="">
        </div>
        <div class="header-banner__logo">
            <div class="logo-box">
                <img src="~/assets/img/homelogo.png" alt="">
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
// 初始化头图效果
const initHeader = () =>{
    let startingPoint: number;
    const headerBanner: Element | null = document.querySelector('.header-banner');
    const headerBannerHTMLElement = headerBanner as HTMLElement; 
    let isMoving = false;

    function handleMouseMove(e: { clientX: number; clientY: number; }) {
        if (headerBanner) {  
            // 现在可以安全地使用headerBanner，因为它不是null  
            const headerRect = headerBanner.getBoundingClientRect(); // 动态获取header的位置
            if (
                e.clientX >= headerRect.left && e.clientX <= headerRect.right &&
                e.clientY >= headerRect.top && e.clientY <= headerRect.bottom
            ) {
                // 当鼠标进入头图范围就开始动态效果
                if (!isMoving) {
                    startingPoint = e.clientX;
                    headerBannerHTMLElement.classList.add('moving');
                    isMoving = true;
                }
                let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5;
                headerBannerHTMLElement.style.setProperty('--percentage', percentage as unknown as string);
            } else {
                // 鼠标移出头图范围，效果复原
                if (isMoving) {
                    headerBannerHTMLElement.classList.remove('moving');
                    headerBannerHTMLElement.style.setProperty('--percentage', 0.5 as unknown as string);
                    isMoving = false;
                }
            }  
        }
        
    }

    function handleMouseOut (e: { clientX: number; clientY: number; }) {
            // 鼠标离开窗口时，头图回到原位
            headerBannerHTMLElement.classList.remove('moving');
            headerBannerHTMLElement.style.setProperty('--percentage', 0.5 as unknown as string);
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
<style scoped>
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
    width: 100%;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    --percentage: 0.5;
}

.header-banner .view, .header-banner .tree {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: brightness(80%);
}

.header-banner .view img, .header-banner .view video, .header-banner .tree img {
    position: absolute;
    display: block;
    width: 120%;
    height: 100%;
    object-fit: cover;
}

.header-banner .morning {
    z-index: 20;
    opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
}

.header-banner .afternoon {
    z-index: 10;
    opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
}

.header-banner .view {
    transform: translatex(calc(var(--percentage) * 100px));
}

.header-banner .tree {
    transform: translatex(calc(var(--percentage) * 50px));
    filter: blur(3px);
}

.header-banner .view, .header-banner .tree, .header-banner .morning, .header-banner .afternoon {
    transition: .2s all ease-in;
}

.header-banner.moving .view, .header-banner.moving .tree, .header-banner.moving .morning, .header-banner.moving .afternoon {
    transition: none;
}

.header-banner .window-cover {
    opacity: calc((var(--percentage) - 0.9) / 0.1);
}
.header-banner .header-banner__logo {
    position: relative;
    width: 100%;
    max-width: 2078px;
    margin: 0 auto;
    display: flex;
}

.header-banner .header-banner__logo img {
    position: absolute;
    height: 65px;
    width: auto;
    margin-top: 60px;
    margin-left: 50px;
    cursor: pointer;
}
</style>