<template>
    <div v-if="showPopoconfirm">
        <div class="popoconfirm-overlay_warp" :class="showPopoconfirm ? 'popoconfirm-overlay-show' : ''"></div>
        <div class="popoconfirm_warp" :class="showPopoconfirm ? 'popoconfirm-show' : ''" :style="{ width: `${props.width}px`, height: `${props.height}px` }">
          <div class="popoconfirm-body-area">
            <slot name="content"></slot>
          </div>
          <div class="btn-group">
            <button class="bili-btn ok" @click="confirm">确定</button>
            <button class="bili-btn cancel" @click="cancel">取消</button>
          </div>
        </div>
    </div>
</template>
<script setup  lang="ts">
const showPopoconfirm =ref(false)
const props = defineProps({
    // 弹框的显示隐藏
    showPopoconfirm: {
      type: Boolean,
      default: false
    },
    // 宽度设置
    width: {
      type: [String, Number],
      default: 'auto'
    },
    // 弹框高度设置
    height: {
      type: [String, Number],
      default: 'auto'
    },
})
const emit = defineEmits(['changPopoconfirm']);
watch(
  () => props.showPopoconfirm,
  (newVal) => {
    showPopoconfirm.value = newVal;
  },
  { immediate: true }
);
// 确认
const confirm = () => {
    showPopoconfirm.value = false;
    emit('changPopoconfirm', false, true);
}
// 取消
const cancel = () => {
    showPopoconfirm.value = false;
    emit('changPopoconfirm', false, false);
}
</script>
<style scoped lang="scss">
.popoconfirm-overlay_warp {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.4);    
}

.popoconfirm_warp {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: fit-content;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    min-width: 400px;
    overflow: hidden;
    background: #fff;
    z-index: 999;
    border-radius: 6px;
    transform: none;
    padding: 10px;

    .popoconfirm-body-area {
        //padding: 0 2rem;
        min-height: 2rem;
        height: calc(100% - 36px);
    }

    .btn-group {
        display: flex;
        justify-content: center;
        margin: 10px 0 18px;

        .bili-btn {
            width: 90px;
            margin: 0 8px;
            height: 30px;
            display: inline-block;
            line-height: 28px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 10px;
            box-sizing: border-box;
            font-size: 12px;
            border: 0 none;
        }

        .ok {
            background-color: $theme-color;
            color: #fff;
            &:hover {
                background-color: $theme-color-hover;
            }
        }

        .cancel {
            border: 1px solid #ccd0d7;
            background-color: #fff;
        }

    }
}

.popoconfirm-show {
    animation: fade-popoconfirm-in 0.4s ease-out forwards;
    transform-origin: top;
}

/* 淡入动画 */
@keyframes fade-popoconfirm-in {
    0% {
        opacity: 0; /* 初始状态透明 */
        transform: translateZ(-6px); /* 向上平移 6px，将元素隐藏在顶部 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
        transform: translateZ(0); /* 平移恢复到原始位置 */
    }
}

.popoconfirm-overlay-show {
    animation: fade-popoconfirm-overlay-in 0.4s ease-out forwards;
    transform-origin: top;
}

/* 淡入动画 */
@keyframes fade-popoconfirm-overlay-in {
    0% {
        opacity: 0; /* 初始状态透明 */
        transform: translateZ(-6px); /* 向上平移 6px，将元素隐藏在顶部 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
        transform: translateZ(0); /* 平移恢复到原始位置 */
    }
}

</style>