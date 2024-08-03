<template>
     <div class="scrollContainer">
        <div class="scrollWrap">
            <div class="scrollRow"><img src="@/assets/img/bdf.png" alt="msi"></div>
            <div class="scrollRow"><span :style="props.iscolor ? 'color: #000000' : 'color: #ffffff'">十周年</span></div>
            </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    iscolor: {
        type: Boolean,
        default: false
    }
})
</script>
<style scoped lang="scss">
.scrollContainer {
    width: 55px;
    height: 64px;
    display: flex;
    align-items: center;

    .scrollWrap {
    height: 38px;
    width: 55px;
    overflow: hidden;
    position: relative;
    flex: 1;

        .scrollRow {
            position: absolute;
            height: 100%;
            width: 100%;
            img {
                height: 100%;
                width: auto;
            }
            span {
                display: flex;
                height: 100%;
                line-height: 38px;
                font-size: 14px;
                justify-content: center;
                cursor: pointer;
            }
        }
    }
    // 关键帧动画
    @keyframes anim1 {
    0% {
        top: 0;
        opacity: 1;
    }

    45% {
        top: 0;
        opacity: 1;
    }

    50% {
        top: -100%;
        opacity: 0;
    }

    51% {
        top: 100%;
        opacity: 0;
    }

    95% {
        top: 100%;
        opacity: 1;
    }

    96% {
        opacity: 1;
    }

    100% {
        top: 0;
        opacity: 1;
    }
    }

    @keyframes anim2 {
    0% {
        top: 100%;
        opacity: 0;
    }

    45% {
        top: 100%;
        opacity: 0;
    }

    50% {
        top: 0;
        opacity: 1;
    }

    95% {
        top: 0;
        opacity: 1;
    }

    100% {
        top: -100%;
        opacity: 0;
    }
    }

    .scrollRow:nth-child(1) {
    animation: anim1 8s linear infinite;
    }

    .scrollRow:nth-child(2) {
    top: 25px;
    animation: anim2 8s linear infinite;
    }
}

</style>