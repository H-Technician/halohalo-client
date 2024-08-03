<template>
    <svg width="150" height="150" viewBox="0 0 150 150" 
    class="close-warp"
    >
        <!-- 设置背景 -->
        <circle cx="75" cy="75" r="60" class="close-bg" />
        <circle ref="progressCircle" 
        class="progress-circle" 
        cx="75" 
        cy="75" 
        r="60" 
        fill="none" 
        stroke="#fff" 
        stroke-width="8" 
        stroke-dasharray="377" 
        :stroke-dashoffset="dashOffset"></circle>
        <!-- 叉符号 -->
        <path d="M 50,50 L 100,100 M 50,100 L 100,50" 
        stroke="#fff" 
        stroke-width="4" 
        fill="none" />
    </svg>
</template>
<script setup lang="ts">
const progressCircle = ref<SVGCircleElement | null>(null);
const props = defineProps({
    progress: {
        type: Number,
        default: 0.7
    },
    isPaused: {
        type: Boolean,
        default: false
    },
    isFull: {
        type: Boolean,
        default: true
    }
});
const maxOffset = 377; // 圆环的总长度
const dashOffset = computed(() => maxOffset * props.progress); // 计算偏移量
</script>
<style scoped lang="scss">
.close-warp {
  width: 20px;
  height: 20px;
  //transform: scale(20 / 150); /* 原始宽度和高度是150，现在缩小到20，所以比例是20 / 150 */
  cursor: pointer;
  opacity: 1;
}
.close-bg {
    fill: rgba(24, 25, 28, .8);
}
.progress-circle {
    // -webkit-transform: stroke-dashoffset 5s ease-in-out;
    // transition: stroke-dashoffset 5s ease-in-out;
    // -webkit-animation: progressAnimation 5s linear infinite;
    // animation: progressAnimation 5s linear infinite;
    -webkit-transform: transform 0.5s ease-in-out; /* 添加过渡效果 */
    transition: transform 0.5s ease-in-out; /* 添加过渡效果 */
    -webkit-transform-origin: center;
    transform-origin: center;
    transform: rotate(-90deg);
}
.state-paused {
    -webkit-animation-play-state: paused !important;
    animation-play-state: paused !important;
}
// @keyframes progressAnimation {
//     0% { stroke-dashoffset: 0; }
//     100% { stroke-dashoffset: 377; }
// }
</style>