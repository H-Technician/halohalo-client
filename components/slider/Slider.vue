<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
interface Props {
  width?: string | number // 宽度
  min?: number // 最小值
  max?: number // 最大值
  disabled?: boolean // 是否禁用
  range?: boolean // 是否使用双滑块模式
  step?: number // 步长，取值必须大于0，并且可被 (max - min) 整除
  formatTooltip?: (value: number) => string | number // Slider 会把当前值传给 formatTooltip，并在 Tooltip 中显示 formatTooltip 的返回值
  tooltip?: boolean // 是否展示 Tooltip
  value?: number | number[] // (v-model)设置当前取值，当 range 为 false 时，使用 number，否则用 [number, number]
  track?: boolean // 是否显示已选择滑动条
  opacity?: number // 透明度 范围 0-1
  marks?: string[] | null// 标记点
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  min: 0,
  max: 100,
  disabled: false,
  range: false,
  step: 1,
  formatTooltip: (value: number) => value,
  tooltip: false,
  value: 0,
  track: false,
  opacity: 1,
  marks: null
})
const transition = ref(false)
const timer = ref()
const left = ref(0) // 左滑块距离滑动条左端的距离
const right = ref(0) // 右滑动距离滑动条左端的距离
const slider = ref()
const sliderWidth = ref()
const leftHandle = ref() // left handle 模板引用
const leftTooltip = ref() // left tooltip 模板应用
const rightHandle = ref() // right handler 模板引用
const rightTooltip = ref() // right tooltip 模板引用
const precision = computed(() => {
  // 获取 step 数值精度
  const strNumArr = props.step.toString().split('.')
  return strNumArr[1]?.length ?? 0
})
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const sliderValue = computed(() => {
  let high
  if (right.value === sliderWidth.value) {
    high = props.max
  } else {
    high = fixedDigit(pixelStepOperation(right.value, '/') * props.step + props.min, precision.value)
    if (props.step > 1) {
      high = Math.round(high / props.step) * props.step
    }
  }
  if (props.range) {
    let low = fixedDigit(pixelStepOperation(left.value, '/') * props.step + props.min, precision.value)
    if (props.step > 1) {
      low = Math.round(low / props.step) * props.step
    }
    return [low, high]
  }
  return high
})
const leftValue = computed(() => {
  if (props.range) {
    return props.formatTooltip((sliderValue.value as number[])[0])
  }
  return null
})
const rightValue = computed(() => {
  if (props.range) {
    return props.formatTooltip((sliderValue.value as number[])[1])
  }
  return props.formatTooltip(sliderValue.value as number)
})
const emits = defineEmits(['update:value', 'change'])
watch(
  () => props.width,
  () => {
    getSliderWidth()
  },
  {
    flush: 'post'
  }
)
watch(
  () => props.value,
  () => {
    getPosition()
  }
)
watch(sliderValue, (to) => {
  emits('update:value', to)
  emits('change', to)
})
onMounted(() => {
  getSliderWidth()
  getPosition()
})
function checkLow(value: number): number {
  if (value < props.min) {
    return props.min
  }
  return value
}
function checkHigh(value: number): number {
  if (value > props.max) {
    return props.max
  }
  return value
}
function checkValue(value: number): number {
  if (value < props.min) {
    return props.min
  }
  if (value > props.max) {
    return props.max
  }
  return value
}
function getSliderWidth() {
  sliderWidth.value = slider.value.offsetWidth
}
function getPosition() {
  if (props.range) {
    // 双滑块模式
    const leftValue = pixelStepOperation((checkLow((props.value as number[])[0]) - props.min) / props.step, '*')
    left.value = fixedDigit(leftValue, 2)
    const rightValue = pixelStepOperation((checkHigh((props.value as number[])[1]) - props.min) / props.step, '*')
    right.value = fixedDigit(rightValue, 2)
  } else {
    const rightValue = pixelStepOperation((checkValue(props.value as number) - props.min) / props.step, '*')
    right.value = fixedDigit(rightValue, 2)
  }
}
function fixedDigit(num: number, precision: number) {
  return parseFloat(num.toFixed(precision))
}
function handlerBlur(tooltip: HTMLElement) {
  tooltip.classList.remove('show-handle-tooltip')
}
function handlerFocus(handler: HTMLElement, tooltip: HTMLElement) {
  handler.focus()
  if (props.tooltip) {
    tooltip.classList.add('show-handle-tooltip')
  }
}
function onClickPoint(e: any) {
  const leftX = slider.value.getBoundingClientRect().left
  // 点击滑动条，移动滑块
  if (transition.value) {
    clearTimeout(timer.value)
    timer.value = null
  } else {
    transition.value = true
  }
  timer.value = setTimeout(() => {
    transition.value = false
  }, 300)
  if (sliderWidth.value === 0) {
    getSliderWidth();
  }
  // 元素是absolute时，e.layerX是相对于自身元素左上角的水平位置
  const value = Math.round(pixelStepOperation(e.clientX - leftX, '/'))
  const targetX = fixedDigit(pixelStepOperation(value, '*'), 2) // 鼠标点击位置距离滑动输入条左端的水平距离
  if (props.range) {
    // 双滑块模式
    if (targetX <= left.value) {
      left.value = targetX
      handlerFocus(leftHandle.value, leftTooltip.value)
    } else if (targetX >= right.value) {
      right.value = targetX
      handlerFocus(rightHandle.value, rightTooltip.value)
    } else {
      if (targetX - left.value < right.value - targetX) {
        left.value = targetX
        handlerFocus(leftHandle.value, leftTooltip.value)
      } else {
        right.value = targetX
        handlerFocus(rightHandle.value, rightTooltip.value)
      }
    }
  } else {
    // 单滑块模式
    right.value = targetX
    handlerFocus(rightHandle.value, rightTooltip.value)
  }
}
function onLeftMouseDown() {
  // 在滚动条上拖动左滑块
  const leftX = slider.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  document.onmousemove = (e: MouseEvent) => {
    if (props.tooltip) {
      leftTooltip.value.classList.add('show-handle-tooltip')
    }
    if (sliderWidth.value === 0) {
      getSliderWidth();
    }
    // e.clientX返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    const value = Math.round(pixelStepOperation(e.clientX - leftX, '/'))
    const targetX = fixedDigit(pixelStepOperation(value, '*'), 2)
    if (targetX < 0) {
      left.value = 0
    } else if (targetX >= 0 && targetX <= right.value) {
      left.value = targetX
    } else {
      // targetX > right
      left.value = right.value
      rightHandle.value.focus()
      onRightMouseDown()
    }
  }
  document.onmouseup = () => {
    if (props.tooltip) {
      if (rightTooltip.value) {
        leftTooltip.value.classList.remove('show-handle-tooltip');
      }
    }
    document.onmousemove = null
  }
}
function onRightMouseDown() {
  // 在滚动条上拖动右滑块
  const leftX = slider.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  document.onmousemove = (e: MouseEvent) => {
    if (props.tooltip) {
      rightTooltip.value.classList.add('show-handle-tooltip')
    }
    if (sliderWidth.value === 0) {
      getSliderWidth();
    }
    // e.clientX返回事件被触发时鼠标指针相对于浏览器可视窗口的水平坐标
    const value = Math.round(pixelStepOperation(e.clientX - leftX, '/'))
    const targetX = fixedDigit(pixelStepOperation(value, '*'), 2)
    if (targetX > sliderWidth.value) {
      right.value = sliderWidth.value
    } else if (left.value <= targetX && targetX <= sliderWidth.value) {
      right.value = targetX
    } else {
      // targetX < left
      right.value = left.value
      if (props.range) {
        leftHandle.value.focus()
        onLeftMouseDown()
      }
    }
  }
  document.onmouseup = () => {
    if (props.tooltip) {
      if (rightTooltip.value) {
        rightTooltip.value.classList.remove('show-handle-tooltip');
      }
    }
    document.onmousemove = null
  }
}
function onLeftSlide(source: number, place: string) {
  const targetX = pixelStepOperation(source, '-')
  if (place === 'left') {
    // 左滑块左移
    if (targetX < 0) {
      left.value = 0
    } else {
      left.value = targetX
    }
  } else {
    // 右滑块左移
    if (targetX >= left.value) {
      right.value = targetX
    } else {
      right.value = left.value
      left.value = targetX
      leftHandle.value.focus()
    }
  }
}
function onRightSlide(source: number, place: string) {
  const targetX = pixelStepOperation(source, '+')
  if (place === 'right') {
    // 右滑块右移
    if (targetX > sliderWidth.value) {
      right.value = sliderWidth.value
    } else {
      right.value = targetX
    }
  } else {
    // 左滑块右移
    if (targetX <= right.value) {
      left.value = targetX
    } else {
      left.value = right.value
      right.value = targetX
      rightHandle.value.focus()
    }
  }
}
function pixelStepOperation(target: number, operator: '+' | '-' | '*' | '/'): number {
  if (operator === '+') {
    return target + (sliderWidth.value * props.step) / (props.max - props.min)
  }
  if (operator === '-') {
    return target - (sliderWidth.value * props.step) / (props.max - props.min)
  }
  if (operator === '*') {
    return (target * sliderWidth.value * props.step) / (props.max - props.min)
  }
  if (operator === '/') {
    return (target * (props.max - props.min)) / (sliderWidth.value * props.step)
  }
  return target
}
</script>
<template>
  <div :class="['m-slider', { disabled: disabled }]" ref="slider" :style="`width: ${totalWidth};`">
    <div class="u-slider-rail" @click.self="disabled ? () => false : onClickPoint($event)"
    :style="`opacity: ${opacity};`">
    </div>
    <div class="u-slider-range"
    v-for="(item, index) in marks"
    :style="`left: ${ index === 0 ? index * sliderWidth * step / 100 : index * sliderWidth * step / 100 - 3}px;opacity: ${opacity};`">
      <div class="slider-range-marks">
        {{ item }}
      </div>
    </div>
    <div
      class="u-slider-track"
      :class="{ trackTransition: transition }"
      :style="`left: ${left}px; right: auto; width: ${right - left}px;`"
      v-if="track"
    ></div>
    <div
      v-if="range"
      tabindex="0"
      ref="leftHandle"
      class="m-slider-handle"
      :class="{ handleTransition: transition }"
      :style="`left: ${left}px; right: auto; transform: translate(-50%, -50%);`"
      @keydown.left.prevent="disabled ? () => false : onLeftSlide(left, 'left')"
      @keydown.right.prevent="disabled ? () => false : onRightSlide(left, 'left')"
      @keydown.down.prevent="disabled ? () => false : onLeftSlide(left, 'left')"
      @keydown.up.prevent="disabled ? () => false : onRightSlide(left, 'left')"
      @mousedown="disabled ? () => false : onLeftMouseDown()"
      @blur="tooltip && !disabled ? handlerBlur(leftTooltip) : () => false"
    >
      <div v-if="tooltip" ref="leftTooltip" class="m-handle-tooltip">
        {{ leftValue }}
        <div class="m-arrow"></div>
      </div>
    </div>
    <div
      tabindex="0"
      ref="rightHandle"
      class="m-slider-handle"
      :class="{ handleTransition: transition }"
      :style="`left: ${right}px; right: auto; transform: translate(-50%, -50%);`"
      @keydown.left.prevent="disabled ? () => false : onLeftSlide(right, 'right')"
      @keydown.right.prevent="disabled ? () => false : onRightSlide(right, 'right')"
      @keydown.down.prevent="disabled ? () => false : onLeftSlide(right, 'right')"
      @keydown.up.prevent="disabled ? () => false : onRightSlide(right, 'right')"
      @mousedown="disabled ? () => false : onRightMouseDown()"
      @blur="tooltip && !disabled ? handlerBlur(rightTooltip) : () => false"
    >
      <div v-if="tooltip" ref="rightTooltip" class="m-handle-tooltip">
        {{ rightValue }}
        <div class="m-arrow"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.m-slider {
  display: inline-block;
  height: 2px;
  position: relative;
  z-index: 9;
  touch-action: none; // 禁用元素上的所有手势,使用自己的拖动和缩放api
  .u-slider-rail {
    // 灰色未选择滑动条背景色
    position: absolute;
    z-index: 101;
    height: 2px;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 2px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .u-slider-range {
    position: absolute;
    top: -2px;
    // left: 20px;
    height: 6px;
    width: 3px;
    background-color: #ffffff;
    cursor: pointer;
    z-index: 100;
    .slider-range-marks {
      position: absolute;
      height: 20px;
      width: 30px;
      top: 160%;
      //right: -50%;
      transform: translateX(-25%);
      font-size: 10px;
      color: #ffffff;
      display: inline;
      font-family: 'HarmonyOS_Sans_SC_Medium';
    }
  }
  .u-slider-track {
    // 蓝色已选择滑动条背景色
    position: absolute;
    z-index: 101;
    border-radius: 4px;
    height: 2px;
    cursor: pointer;
    transition: background 0.3s;
    pointer-events: none;
  }
  .trackTransition {
    transition:
      left 0.2s,
      width 0.2s,
      background 0.3s;
  }
  &:hover {
    .u-slider-rail {
      // 灰色未选择滑动条背景色
      background: #e3e3e3;
    }
    .u-slider-track {
      // 蓝色已选择滑动条背景色
      background: $theme-color;
    }
  }
  .m-slider-handle {
    // 滑块
    position: absolute;
    z-index: 999;
    width: 12px;
    height: 12px;
    top: 50%;
    background: $theme-color;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    transition:
      width 0.3s,
      height 0.3s,
      border-color 0.3s,
      border-width 0.3s,
      transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    .m-handle-tooltip {
      position: relative;
      display: inline-block;
      padding: 6px 8px;
      font-size: 14px;
      color: #fff;
      line-height: 20px;
      text-align: center;
      min-width: 32px;
      border-radius: 6px;
      transform: translate(-50%, -50%) scale(0.8);
      top: -32px;
      left: 50%;
      background: rgba(0, 0, 0, 0.85);
      box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
      pointer-events: none;
      user-select: none;
      outline: none;
      opacity: 0;
      transition:
        transform 0.25s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        opacity 0.25s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      .m-arrow {
        position: absolute;
        z-index: 9;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%) translateY(100%) rotate(180deg);
        display: block;
        pointer-events: none;
        width: 16px;
        height: 16px;
        overflow: hidden;
        &::before {
          position: absolute;
          bottom: 0;
          inset-inline-start: 0;
          width: 16px;
          height: 8px;
          background-color: rgba(0, 0, 0, 0.85);
          clip-path: path(
            'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
          );
          content: '';
        }
        &::after {
          position: absolute;
          width: 8.970562748477143px;
          height: 8.970562748477143px;
          bottom: 0;
          inset-inline: 0;
          margin: auto;
          border-radius: 0 0 2px 0;
          transform: translateY(50%) rotate(-135deg);
          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
          z-index: 0;
          background: transparent;
          content: '';
        }
      }
    }
    .hover-focus-handle {
      width: 20px;
      height: 20px;
      border-width: 4px;
      border-color: $theme-color;
    }
    &:hover,
    &:focus {
        .hover-focus-handle {
            width: 20px;
            height: 20px;
            border-width: 4px;
            border-color: $theme-color;
        }
    }
    .show-handle-tooltip {
      pointer-events: auto;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    &:hover {
      .m-handle-tooltip {
        .show-handle-tooltip {
            pointer-events: auto;
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
      }
    }
  }
  .handleTransition {
    transition: left 0.2s;
  }
}
.disabled {
  .u-slider-rail {
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.06);
  }
  .u-slider-track {
    background: rgba(0, 0, 0, 0.25);
  }
  .m-slider-handle {
    border-color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    &:hover {
      width: 14px;
      height: 14px;
      border-width: 2px;
      border-color: rgba(0, 0, 0, 0.25);
    }
    &:focus {
      width: 14px;
      height: 14px;
      border-width: 2px;
      border-color: rgba(0, 0, 0, 0.25);
    }
  }
  &:hover {
    .u-slider-rail {
      background: rgba(0, 0, 0, 0.06);
    }
    .u-slider-track {
      background: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>