<template>
    <div class="dialog-warp" v-if="showDialog">
        <div class="dialog-overlay"></div>
        <div class="dialog-area" :style="{ width: `${props.width}px`, height: `${props.height}px` }">
          <div class="dialog-title">
            <div class="title-text">
              <span>{{ props.title }}</span>
              <div class="title-close" v-if="showClose">
                <IconsDialogClose class="icon-close" @click="close" />
              </div>
            </div>
          </div>
          <div class="dialog-content">
            <slot name="content"></slot>
          </div>
        </div>
    </div>
</template>
<script setup  lang="ts">
const showDialog =ref(false)
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
  (newVal) => {
    showDialog.value = newVal;
    //console.log(newVal);
  },
  { immediate: true }
);
const close = () => {
    showDialog.value = false;
    emit('isShowDialog', showDialog.value);
}

</script>
<style scoped lang="scss">
.dialog-overlay {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.4);    
}

.dialog-area {
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

    .dialog-title {
        position: relative;
        height: 32px;
        text-align: center;
        overflow: hidden;
        line-height: 36px;
        width: 100%;
        color: #000000;
        font-size: 18px;

        .title-text {
            position: relative;
            z-index: 1000;
        }

        .title-close {
            position: absolute;
            right: 16px;
            top: 16px;
            height: 18px;
            width: 18px;
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

    .dialog-content {
        //padding: 0 2rem;
        min-height: 2rem;
        height: calc(100% - 36px);
    }
}
</style>