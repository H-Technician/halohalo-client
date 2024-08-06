<template>
    <!-- 弹幕容器 -->
    <div class="player-row-dm-wrap" ref="playerDmWrapRef">
    </div>
</template>
<script setup lang="ts">
import type { Danmaku } from '@/types/danmaku';
import danmuList from '@/assets/json/danmaku.json';
const playerDmWrapRef = ref<HTMLDivElement | null>(null); // 弹幕容器
let lastTimePoint = -1; // 上一个时间点
let timeoutId: ReturnType<typeof setTimeout>; // 定时器id
const dmList = ref<Danmaku[]>(danmuList);
const rollRow = new Array(12).fill(-1); // 滚动弹幕轨道
const topRow = new Array(12).fill(-1); // 顶部弹幕轨道
const bottomRow = new Array(12).fill(-1); // 底部弹幕轨道
// props
const props = withDefaults(defineProps<{
  //dmList: Danmaku[],
  currentTime: number,
  isplaying: boolean,
  displayDanmu: boolean,
  isLoading: boolean
  //dmSetting: { opacity: number, dmSpeed: number, fontSize: number, fontWeight: number }
}>(), {
  //dmList: () => [],
  currentTime: 0,
  isplaying: false,
  displayDanmu: true,
  isLoading: false
  //dmSetting: () => ({ opacity: 100, dmSpeed: 1, fontSize: 25, fontWeight: 700 })
});
// 查询时间点弹幕
const getTimePointDm = (currTimePoint: number) => {
    const danmakuList = dmList.value.filter(danmaku => lastTimePoint < danmaku.timePoint  && danmaku.timePoint <= currTimePoint);
    lastTimePoint = currTimePoint;
    return danmakuList;
};
// 加载展示弹幕
const displayDanmus = (currTimePoint: number) => {
    if (!playerDmWrapRef.value) return;
    const danmakuList = getTimePointDm(currTimePoint);
    // 更新轨道状态
    updateTrackStatus(rollRow, currTimePoint);
    updateTrackStatus(topRow, currTimePoint);
    updateTrackStatus(bottomRow, currTimePoint);
    // 遍历当前时间点的弹幕
    // 创建弹幕元素
    danmakuList.forEach(danmaku => {
        if (!playerDmWrapRef.value) return;
        const danmuElement = createDanmuElement(danmaku);
        playerDmWrapRef.value.appendChild(danmuElement);

        if (danmaku.mode === "scroll") {
            handleScrollDanmu(danmuElement, currTimePoint);
        } else if (danmaku.mode === "top") {
            handleFixedDanmu(danmaku, danmuElement, currTimePoint, topRow);
        } else {
            handleFixedDanmu(danmaku, danmuElement, currTimePoint, bottomRow);
        }

        danmuElement.addEventListener('animationend', () => {
            danmuElement.remove();
        });
    });
};
// 创建弹幕元素
const createDanmuElement = (danmaku: Danmaku) => {
    const danmuElement = document.createElement('div');
    danmuElement.classList.add('hl_dm');
    danmuElement.innerText = danmaku.content;
    danmuElement.style.setProperty('--opacity', `${100 / 100}`);
    danmuElement.style.setProperty('--fontSize', `${16}px`);
    danmuElement.style.setProperty('--color', `${danmaku.color}`);

    return danmuElement;
};
// 处理滚动弹幕
const handleScrollDanmu = (danmuElement: HTMLElement, currTimePoint: number) => {
    danmuElement.classList.add('scroll-mode');
    const contentWidth = danmuElement.offsetWidth;
    if (!playerDmWrapRef.value) return;
    const distance = playerDmWrapRef.value.offsetWidth + contentWidth;
    danmuElement.style.setProperty('--offset', `${playerDmWrapRef.value.offsetWidth}px`);
    danmuElement.style.setProperty('--translateX', `-${distance}px`);
    danmuElement.style.setProperty('--duration', `${distance / (1 * 75)}s`);

    const rowOutTime = (contentWidth + 10) / (1 * 75) + currTimePoint;
    const positionInfo = findAvailablePosition(rollRow, currTimePoint);
    danmuElement.style.setProperty('--top', `${positionInfo.index * 30 + 10}px`);
    rollRow[positionInfo.index] = rowOutTime;
};
// 处理固定弹幕
const handleFixedDanmu = (danmaku: Danmaku, danmuElement: HTMLElement, currTimePoint: number, trackArray: Array<number>) => {
    const duration = danmaku.mode === "bottom" ? 4 : 2;
    danmuElement.classList.add('fixed-mode');
    danmuElement.style.setProperty('--duration', `${duration}s`);
    const rowOutTime = duration + currTimePoint;

    const positionInfo = findAvailablePosition(trackArray, currTimePoint);
    danmuElement.style.setProperty(danmaku.mode === "bottom" ? 'bottom' : 'top', `${positionInfo.index * 30 + (danmaku.mode === "bottom" ? 70 : 10)}px`);
    trackArray[positionInfo.index] = rowOutTime;
};
// 查找空闲轨道
const findAvailablePosition = (trackArray: Array<number>, currTimePoint: number) => {
    let i = 0, min = Infinity, minIndex = 0;
    let foundFreeSlot = false;

    // 更新轨道状态，释放已结束的弹幕轨道
    for (i = 0; i < trackArray.length; i++) {
        if (trackArray[i] < currTimePoint) {
            trackArray[i] = -1; // 标记为可用
        }
    }

    // 查找空闲轨道
    for (i = 0; i < trackArray.length; i++) {
        if (trackArray[i] === -1) { // 如果轨道可用
            foundFreeSlot = true;
            return { index: i, full: false };
        }
        if (trackArray[i] < min && trackArray[i] >= currTimePoint) {
            min = trackArray[i];
            minIndex = i;
        }
    }

    // 如果所有轨道都被占用，寻找上下方的空闲轨道
    if (!foundFreeSlot) {
        const topTrack = Math.max(0, minIndex - 1);
        const bottomTrack = Math.min(trackArray.length - 1, minIndex + 1);

        // 检查上方轨道是否可用
        if (trackArray[topTrack] === -1) {
            return { index: topTrack, full: true };
        }

        // 检查下方轨道是否可用
        if (trackArray[bottomTrack] === -1) {
            return { index: bottomTrack, full: true };
        }
    }

    // 如果所有轨道及上下方轨道都被占用，使用最早结束的轨道
    return { index: minIndex, full: true };
};
// 更新轨道状态
const updateTrackStatus = (trackArray: Array<number>, currTimePoint: number) => {
    for (let i = 0; i < trackArray.length; i++) {
        if (trackArray[i] < currTimePoint) {
            trackArray[i] = -1; // 标记为可用
        }
    }
};
const handleMouseOver = (event: MouseEvent) => {
  const danmaku = event.target as HTMLElement;
  if (danmaku.classList.contains('hl_dm')) {
    danmaku.classList.add('paused');
    timeoutId = setTimeout(() => {
      danmaku.classList.remove('paused');
    }, 3000);
  }
};

const handleMouseOut = (event: MouseEvent) => {
  const danmaku = event.target as HTMLElement;
  if (danmaku.classList.contains('hl_dm')) {
    clearTimeout(timeoutId);
    danmaku.classList.remove('paused');
  }
};

watch(() => props.currentTime, (currTimePoint) => {
  if ((currTimePoint - lastTimePoint) >= 1 || (currTimePoint - lastTimePoint) <= -1) {
    // 重新定位弹幕索引
    lastTimePoint = currTimePoint - 1;
  };
  if (props.isplaying && props.displayDanmu) {
    displayDanmus(currTimePoint);
  }
});
watch(() => props.isplaying, (newValue) => {
  if (!playerDmWrapRef.value) return;
  if (!newValue) {
    // 暂停
    playerDmWrapRef.value.classList.add('state-paused');
  } else {
    // 播放
    playerDmWrapRef.value.classList.remove('state-paused');
  }
});
watch(() => props.isLoading, (newValue) => {
  if (!playerDmWrapRef.value) return;
  if (newValue) {
    // 暂停
    playerDmWrapRef.value.classList.add('state-paused');
  } else {
    // 播放
    playerDmWrapRef.value.classList.remove('state-paused');
  }
});
// 监听弹幕打开/关闭状态
watch(() => props.displayDanmu, (newValue) => {
  if (!playerDmWrapRef.value) return;
  if (!newValue) {
      // 清空弹幕
      if (playerDmWrapRef.value.childElementCount > 0) {
        // 循环删除所有子弹幕元素
          while (playerDmWrapRef.value.firstChild) {
              playerDmWrapRef.value.removeChild(playerDmWrapRef.value.firstChild);
          }
      }
  } else {
    // 初始化弹幕时间点索引
    lastTimePoint = props.currentTime - 1;
  }
}); 
// 初始化弹幕时间点索引
const initDanMu = () => {
  lastTimePoint = -1;
}
onMounted(() => {
  if (!playerDmWrapRef.value) return;
  initDanMu();
  // playerDmWrapRef.value.addEventListener('mouseover', handleMouseOver);
  // playerDmWrapRef.value.addEventListener('mouseout', handleMouseOut);

});
onBeforeUnmount(() => {
  if (!playerDmWrapRef.value) return;
  // 移除弹幕内容鼠标监听器
  playerDmWrapRef.value.removeEventListener('mouseover', handleMouseOver);
  playerDmWrapRef.value.removeEventListener('mouseout', handleMouseOut);
});
</script>
<style scoped lang="scss">
.player-row-dm-wrap {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 11;
}
</style>