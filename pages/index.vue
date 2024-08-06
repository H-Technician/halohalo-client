<template>
    <Title>哈喽哈喽 (゜-゜)つロ 干杯~-halohalo</Title>
    <div class="index" ref="bodyScrollTop">
      <div class="large-layout">
        <!-- 头部 -->
        <HeaderBar :isFixedHeader="isFixedHeader"/>
        <IndexChannelFixed :style="isOPenChannelFixed ? '' : 'display: none;' "/>
        <HomebannerIndexHeaderBannerSpring />
        <IndexChannel />
      </div>
      <!-- 主体布局 -->
      <div class="layout-container">
        <div class="carousel-container">
          <IndexCarousel />
        </div>
        <div class="video-card-container"  v-for="(item, index) in list" :key="index":info="item">
          <VideocardsVideoCard />
        </div>
        <div class="fixed-roll-btn">
          <div class="roll-btn" @click=" refreshTime++;">
              <IconsVideocardRefresh :style="`transform: rotate(${refreshTime * 360}deg);`" :size="20" class="refresh-icon"/>
              <span>换一换</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
const oldScrollTop = ref<number>(0); // 记录上一次滚动结束后的滚动距离
const scrollTop = ref<number>(0); // 记录当前的滚动距离
const bodyScrollTop = ref<any>(null); 
const bodyScrollTopH = ref<number>(0);
const isFixedHeader = ref(false); 
const refreshTime = ref(0);
const isOPenChannelFixed = ref(false);
const list = ref<number>(11);
const leijia = () => {
 list.value += 5;
}
const scrollHandle = () => {
  scrollTop.value = window.scrollY; //滚动条距离浏览器顶部高度
  if(!bodyScrollTopH.value) {
    bodyScrollTopH.value = bodyScrollTop.value.offsetHeight;
  }
}
// console.log(NewTokenStore.newAccessToken);
// console.log(NewTokenStore.newRefreshToken);
onMounted (() => {  
    window.addEventListener('scroll', scrollHandle);
    // console.log(videoCard.value.offsetHeight);
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrollHandle)
})
watch(() => scrollTop.value,
    (newValue, oldValue) => {
        //  setTimeout(() => {
            if (newValue === window.scrollY) {
                // 延时执行后当newValue等于window.scrollY，代表滚动结束
                // console.log('滚动结束');
                oldScrollTop.value = newValue; // 每次滚动结束
                // console.log(oldScrollTop);
                if (oldScrollTop.value > 80 ) {
                  isFixedHeader.value=true;
                  if(oldScrollTop.value > 200) {
                    isOPenChannelFixed.value=true;
                  }else {
                    isOPenChannelFixed.value=false;
                  }
                }else {
                  isFixedHeader.value=false;
                }
            }
        //  }, 20); // 需要使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
        if (oldScrollTop.value === oldValue) {
            // 每次滚动开始时oldScrollTop与oldValue相等
            // console.log('滚动开始');
        }
    }
)

</script>
<style scoped>
.index {
  position: absolute;
  margin: 0 auto;
  width: 100%;
  max-width: 2560px;
  background-color: #ffffff;
  overflow: hidden;
  min-width: 1186px;
  scroll-behavior: smooth; 
}
.large-layout {
  background-color: #fff;
  min-height: 64px;
  margin: 0 auto;
  max-width: 2200px;
  width: 100%;
  color: #000;
  min-width: 1186px;
}
.layout-container {
  display: grid;
  box-sizing: border-box;
  margin: 0 auto;
  /* grid-template-columns: repeat(5, 1fr);   */
  width: 100%;
  /* padding: 0 60px; */
  background-color: #ffffff;
  gap: 18px; 
  scroll-behavior: smooth;
}


.layout-container .carousel-container, .layout-container .video-card-container {
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;

}
.carousel-container {
  grid-row: 1/3;
  grid-column: 1/3;

}

@media (max-width: 1366.9px) {
    .layout-container  {
        grid-template-columns: repeat(4, 1fr);
        padding: 0 50px;
    }

    .fixed-roll-btn {
        right: 15px;
        top: 255px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .layout-container  {
        grid-template-columns: repeat(5, 1fr);
        padding: 0 60px;
    }

    .fixed-roll-btn {
        right: 20px;
        top: 265px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .layout-container  {
        grid-template-columns: repeat(5, 1fr);
        padding: 0 60px;
    }

    .fixed-roll-btn {
        right: 20px;
        top: 265px;
    }
}

@media (min-width: 2200px) {
    .layout-container  {
        grid-template-columns: repeat(6, 1fr);
        padding: 0 70px;
    }

    
    .fixed-roll-btn {
        right: 25px;
        top: 265px;
    }
}

.fixed-roll-btn {
    position: absolute;
    /* right: 20px;
    top: 265px; */
    z-index: 1;
    transform: translate(10px);
}

.fixed-roll-btn .roll-btn {
    flex-direction: column;
    margin-left: 0;
    height: auto;
    width: 20px;
    padding: 9px;
    background-color: #fff;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    font-size: 12px;
    border: 1px solid #e5e7e9;
    transform-origin: center;
    transition: .2s;
    cursor: pointer;
    line-height: 1.15;
}
.fixed-roll-btn span {
  font-size: 14px;
}
.fixed-roll-btn .roll-btn:hover {
    background-color: #e1e3e5;
}

.fixed-roll-btn .roll-btn .refresh-icon {
    height: 16px;
    width: 16px;
    line-height: 18px;
    margin-bottom: 6px;
    transition: transform .5s ease;
    color: #000;
}

@media (max-width: 1120px) {
    .fixed-roll-btn {
        opacity: 0.8;
    }
}
</style>
