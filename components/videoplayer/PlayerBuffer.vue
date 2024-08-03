<template>
    <div class="player-progress-schedule">
        <div class="player-progress-schedule-buffer" :style="`transform: scaleX(${bufferPer}%);`"></div>
    </div>
</template>
<script setup lang="ts">
const bufferPer = ref(0.00001);
const props = defineProps({
    // 当前进度百分比 小数0~1
    bufferPer: {
        type: Number,
        default() {
            return 0.00001;
        }
    }
});
// 监听 bufferPer 的变化
watch(() => props.bufferPer, 
    (newValue) => {
    bufferPer.value = newValue * 100;
});
</script>
<style scoped lang="scss">
.player-progress-schedule {
    width: 100%;
    height: 2px;
    background-color: hsla(0,0%,100%,.2);
    overflow: hidden;;
    border-radius: 2px;
    position: absolute;
    bottom: 0;
    left: 0;

    .player-progress-schedule-buffer {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        background-color: $theme-color;
    }

}
</style>