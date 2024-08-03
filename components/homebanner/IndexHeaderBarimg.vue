<template>
        <!-- 动画效果头图，文件资源版权归bilibili官方所有，本项目仅用作学习，无商业用途！ -->
    <div class="header-banner">
        <img src="~/assets/img/header-banner.png" class="header-img" alt="banner背景图">
    </div>
    <div class="header-banner__inner">
        <div class="logo-box">
            <img src="~/assets/img/homelogo.png" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
<style scoped>

.header-banner {
    box-sizing: border-box;
    position: absolute;
    z-index: 0;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    left: 0;
    padding: 0;
    max-width: 2560px;
    min-height: 155px;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    height: 155px;
    width: 100%;
}


.header-banner .header-img {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 155px;
    background-size: 100% 100%;
    filter: brightness(80%);
}

.header-banner__inner {
    position: relative;
    width: 100%;
    max-width: 2078px;
    margin: 0 auto;
    display: flex;
    /* align-items: flex-end; */
}

.header-banner__inner img {
    position: absolute;
    height: 65px;
    width: auto;
    margin-top: 60px;
    margin-left: 50px;
    cursor: pointer;
}
@media (max-width: 1366.9px) {
    .header-banner {
        padding: 0 56px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .header-banner {
        padding: 0 64px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .header-banner {
        padding: 0 96px;
        max-width: 2270px;
    }
}

@media (min-width: 2200px) {
    .header-banner {
        max-width: 2078px;
    }
}
</style>
  