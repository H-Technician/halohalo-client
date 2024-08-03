<template>
    <div class="login-dialog-warp" v-if="showDialog">
        <div class="login-dialog-overlay" :class="showDialogStyle ? 'dialog-overlay-show' : 'dialog-overlay-hide'"></div>
        <div class="login-dialog-area" :class="showDialogStyle ? 'dialog-show' : 'dialog-hide'" :style="{ width: `${props.width}px`, height: `${props.height}px` }">
          <div class="login-dialog-title">
            <div class="login-title-text">
              <span>{{ props.title }}</span>
              <div class="title-close" v-if="showClose">
                <IconsDialogClose class="icon-close" @click="close" />
              </div>
            </div>
          </div>
          <div class="login-dialog-content">
            <slot name="content"></slot>
          </div>
        </div>
    </div>
</template>
<script setup  lang="ts">
const showDialog =ref(false)
const showDialogStyle = ref(false)
const props = defineProps({
    // 弹框的显示隐藏
    showDialog: {
      type: Boolean,
      default: false
    },
    // 底部按钮大小
    size: {
      type: String,
      default: 'medium'
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
    // 是否显示右上角的关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 弹框标题
    title: {
      type: String,
      default: ''
    }
})
const emit = defineEmits(['isShowDialog']);
watch(
  () => props.showDialog,
  (newVal, oldVal) => {
    showDialogStyle.value = newVal;
    setTimeout(() => {
        showDialog.value = newVal;
    }, 600);
    //console.log(newVal);
  },
  { immediate: true }
);
const close = () => {
    showDialogStyle.value = false;
    setTimeout(() => {
        showDialog.value = false;
        emit('isShowDialog', showDialog.value);
    }, 600)
}

</script>
<style scoped lang="scss">
.login-dialog-overlay {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.4);    
}

.login-dialog-area {
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

    .login-dialog-title {
        position: relative;
        height: 36px;
        text-align: center;
        overflow: hidden;
        line-height: 36px;
        width: 100%;
        color: #000000;
        font-size: 18px;

        .login-title-text {
            position: relative;
            z-index: 1000;
        }

        .title-close {
            position: absolute;
            right: 14px;
            top: 16px;
            height: 20px;
            width: 20px;
            line-height: 36px;
            fill: $item-color;
            cursor: pointer;

            &:hover {
                fill: $theme-color;
            }

            .icon-close {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }

    .login-dialog-content {
        //padding: 0 2rem;
        min-height: 2rem;
        height: calc(100% - 36px);
    }
}

.dialog-show {
    animation: fade-dialog-in 0.6s ease-out forwards;
    transform-origin: top;
}
.dialog-hide {
    animation: fade-dialog-out 0.6s ease-out forwards;
    transform-origin: top; /* 设置动画的旋转点为顶部 */
}

/* 淡入动画 */
@keyframes fade-dialog-in {
    0% {
        opacity: 0; /* 初始状态透明 */
        transform: translateZ(-1px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
        transform: translateZ(0); /* 平移恢复到原始位置 */
    }
}

/* 淡出动画 */
@keyframes fade-dialog-out {
    0% {
        opacity: 1; /* 初始状态不透明 */
        transform: translateZ(0);   /* 原始位置 */
    }
    100% {
        opacity: 0; /* 最终状态透明 */
        transform: translateZ(-1px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
}

.dialog-overlay-show {
    animation: fade-dialog-overlay-in 0.6s ease-out forwards;
    transform-origin: top;
}
.dialog-overlay-hide {
    animation: fade-dialog-overlay-out 0.6s ease-out forwards;
    transform-origin: top; /* 设置动画的旋转点为顶部 */
}

/* 淡入动画 */
@keyframes fade-dialog-overlay-in {
    0% {
        opacity: 0; /* 初始状态透明 */
        transform: translateZ(-1px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
        transform: translateZ(0); /* 平移恢复到原始位置 */
    }
}

/* 淡出动画 */
@keyframes fade-dialog-overlay-out {
    0% {
        opacity: 1; /* 初始状态不透明 */
        transform: translateZ(0);   /* 原始位置 */
    }
    100% {
        opacity: 0; /* 最终状态透明 */
        transform: translateZ(-1px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
}

</style>