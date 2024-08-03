<template>
    <div class="avatar-popover_warp" @mouseleave="handleMouseLeave">
        <div class="avatar-popover-box" @mouseenter="handleMouseEnter" @click="handleClick" ref="PopRef">
            <slot name="reference"></slot>
        </div>
        <div class="avatar-popover-area to-bottom" :style="popStyle">
            <div
                class="avatar-popover-content"
                ref="PopCon"
                :class="isPopoverShow ? 'popShow-bottom' : 'popHide-bottom'"
                :style="{ display: popoverDisplay }"
            >
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let inTimer: string | number | NodeJS.Timeout | undefined;  // 节流计时器
// 气泡框的显隐
const popoverDisplay = ref("none");
const isPopoverShow = ref(false);
//定义popover显示回调
const emit = defineEmits(['isShowPopover']);

// let outTimer;
const props = defineProps({
    trigger: {
        type: String,
        default() {
            return "hover";
        }
    },
    popStyle: {
        type: String,
        default() {
            return"";
        }
    }
})

const show = () => {
    popoverDisplay.value = "";
    isPopoverShow.value = true;
    emit('isShowPopover',isPopoverShow.value);
}
const hide = () => {
    isPopoverShow.value = false;
    emit('isShowPopover',isPopoverShow.value);
    setTimeout(() => {
        popoverDisplay.value = "none";
    }, 300);
}

const handleMouseEnter = () => {
    if (props.trigger === "hover") {
        inTimer = setTimeout(() => {
            show();
        }, 100);
    }
}
const handleMouseLeave = () => {
    if (props.trigger === "hover") {
        clearTimeout(inTimer);
        hide();
    }
}
const handleClick = () =>{
    if (props.trigger === "click") {
        if (isPopoverShow) {
            hide();
        } else {
            show();
        }
    }
}
    // 点击空白处关闭气泡
const handleOutsideClick = (event: { target: any; }) => {
    const PopRef = ref<HTMLElement | null>(null);
    const PopCon = ref<HTMLElement | null>(null);
    if (PopRef.value && !PopRef.value.contains(event.target)) {
        hide();
    }

    if (PopCon.value && !PopCon.value.contains(event.target)) {
        hide();
    }
}

onMounted(() => {
    if (props.trigger === 'click') {
        window.addEventListener("click", handleOutsideClick);
    }
});

onBeforeUnmount(() => {
    if (props.trigger === 'click') {
        window.removeEventListener("click", handleOutsideClick);
    }
});

</script>

<style scoped lang="scss">
.avatar-popover_warp {
    position: relative;
}
.avatar-popover-box {
    position: relative;
}
.avatar-popover-area {
    position: absolute;
    transition: .3s;
    z-index: 1;
    /* padding-left: 100%;*/
}

.avatar-popover-content {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transform: translateZ(2px);
}

.to-bottom {
    top: 100%;
    left: 50%;
    /* padding-top: 5px;*/
    /* right: 100%;*/
}


.to-bottom {
    transform: translate3d(-50%,0,0);   /* 水平左移半个元素身位，使其水平与父元素居中 */
}

.popHide-bottom {
    animation: fade-out-bottom 0.6s ease-out forwards;
    transform-origin: top; /* 设置动画的旋转点为顶部 */
}

.popShow-bottom {
    animation: fade-in-bottom 0.6s ease-out forwards;
    transform-origin: top;
}

/* 淡入动画 */
@keyframes fade-in-bottom {
    0% {
        opacity: 0; /* 初始状态透明 */
        transform: translateY(-4px); /* 向上平移 4px，将元素隐藏在顶部 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
        transform: translateY(0); /* 平移恢复到原始位置 */
    }
}

/* 淡出动画 */
@keyframes fade-out-bottom {
    0% {
        opacity: 1; /* 初始状态不透明 */
        transform: translateY(0);   /* 原始位置 */
    }
    100% {
        opacity: 0; /* 最终状态透明 */
        transform: translateY(-4px); /* 向上平移 4px，将元素隐藏在顶部 */
    }
}
</style>