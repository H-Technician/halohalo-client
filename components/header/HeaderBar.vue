<template>
    <div class="header-bar" :class="HeaderClasses" :style="props.isShadow ? 'box-shadow: 0 0 30px rgba(0,0,0,.1);' : ''">
        <HeaderBarLeft :OPenHeaderLeft="props.OPenHeader" :isShowCenter="props.isShowCenter"/>
        <HeaderBarCenter :OPenHeadercenter="props.OPenHeader" :style="props.isShowCenter ? '' : ' display: none;'" />
        <HeaderBarRight :OPenHeaderRight="props.OPenHeader" />
    </div>
</template>

<script lang="ts" setup>
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
    },
    isDisplayHeader: {
        type: Boolean,
        default: true
    }
})
const HeaderClasses = computed(() => {
  return [
    props.OPenHeader ? 'header-bar-slide-down' : '',
    props.isDisplayHeader ? '' : 'hide-header-bar'
  ].filter(Boolean);
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
    /* visibility: visible; */
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
.hide-header-bar {
    visibility: hidden;
}
</style>
  