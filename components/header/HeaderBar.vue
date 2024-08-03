<template>
    <div class="header-bar" :class="isOPenHeaderBar ? 'header-bar-slide-down' : ''" :style="props.isShadow ? 'box-shadow: 0 0 30px rgba(0,0,0,.1);' : ''">
        <HeaderBarLeft :OPenHeaderLeft="isOPenHeaderBar" :isShowCenter="props.isShowCenter"/>
        <HeaderBarCenter :OPenHeadercenter="isOPenHeaderBar" :style="props.isShowCenter ? '' : 'visibility: hidden;  display: none;'" />
        <HeaderBarRight :OPenHeaderRight="isOPenHeaderBar" />
    </div>
</template>

<script lang="ts" setup>
const isOPenHeaderBar = ref(false)
const props = defineProps({
    OPenHeader: {
        type: Boolean
    },
    isShadow: {
        type: Boolean,
        default: false
    },
    isShowCenter: {
        type: Boolean,
        default: true
    }
})
watchEffect(() => {
  if (props.OPenHeader) {
    isOPenHeaderBar.value = true
  } else {
    isOPenHeaderBar.value = false
  }
});
</script>
<style scoped>
.header-bar {
    box-sizing: border-box; /* 让内边距不增加宽度 */
    position: absolute;
    margin: 0;
    padding: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 2560px;
    width: 100%;
    height: 64px;
    min-width: 1236px;
}

.header-bar-slide-down {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    animation: headerSlideDown .3s linear forwards;
    /* box-shadow: 0 0 10px rgba(0,0,0,.1); */
    border-bottom: 1px solid rgba(0,0,0,.1);
    animation-name: scale-up;
    background-color: #ffffff;
    z-index: 3;
}

</style>
  