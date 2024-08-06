<template>
    <!-- 互动容器 -->
    <div class="player-cmd-dm-wrap" ref="playerCmdDmWrapRef">
        <div class="hl-line-horizontal" :class="lineHorizontalClasses" v-if="props.isUpload"></div>
        <div class="hl-line-vertical" :class="lineVerticalClasses" v-if="props.isUpload"></div>
        <div class="hl-editor" 
        ref="editorRef" 
        v-if="props.like" 
        :class="isShowLike ? '' : 'hl-hide'"
        :style="{top: likeTop + '%', left: likeLeft + '%'}">
            <div class="hl-guide-three" 
            v-if="props.like.type === 1 
            || props.like.type === 2">
                <span class="hl-guide-three-like is_active">
                    <IconsPlayLike class="hl-icon"/>
                </span>
                <span class="hl-guide-three-coin">
                    <IconsPlayCoin class="hl-icon" />
                </span>
                <span class="hl-guide-three-collect">
                    <IconsPlayCollect class="hl-icon" />
                </span>
            </div>
            <div class="hl-guide-follow" 
            v-if="props.like.type === 1 
            || props.like.type === 3">
                <span class="hl-guide-follow-0" v-if="true">
                    <el-icon size="14" color="#ffffff"><ElIconPlus /></el-icon>
                    <span>关注</span>
                </span>
                <span class="hl-guide-follow-1" v-else>已关注</span>
            </div>
        </div>
        <div class="hl-link" 
        ref="linkRef" 
        v-if="props.link" 
        :class="isShowLink ? '' : 'hl-hide'"
        :style="{top: linkTop + '%', left: linkLeft + '%'}">
            <span class="hl-circle">
                <IconsPlayClose :progress="linkProgress"/>
            </span>
            <div class="hl-link-left">
                <div class="hl-link-icon"></div>
                <div class="hl-link-msg">
                    这个视频怎么样呢
                </div>
            </div>
            <div class="hl-link-line"></div>
            <div class="hl-link-right">
                <div class="hl-link-watchlater">
                    <span class="hl-link-watchlater-icon">
                        <IconsVideocardSeeLater class="hl-icon" />
                    </span>
                    <span>稍后再看</span>
                </div>
            </div>
        </div>
        <div class="hl-vote" 
        ref="voteRef"
        v-if="props.vote" 
        :class="isShowVote ? '' : 'hl-hide'"
        :style="{top: voteTop + '%', left: voteLeft + '%'}">
            <span class="hl-circle">
                    <IconsPlayClose :progress="voteProgress"/>
            </span>
            <div class="hl-vote-question">
                {{ props.vote?.question }}
            </div>
            <div class="hl-vote-an hl-vote-flag-1 " v-for="(item, index) in props.vote?.VoteOptions" :key="index">
                <div class="hl-vote-an-bg">
                    <div class="hl-vote-an-bg-buffer">

                    </div>
                </div>
                <div class="hl-vote-an-text">
                    <div class="hl-vote-an-text-index"></div>
                    <div class="hl-vote-an-text-doc">{{ item.option_text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { InteractionLike, InteractionLink, InteractionVote } from '@/types/interaction';
const playerCmdDmWrapRef = ref<HTMLDivElement | null>(null); // 互动容器
const editorRef = ref<HTMLDivElement | null>(null); // 点赞关注容器
const linkRef = ref<HTMLDivElement | null>(null); // 视频链接容器
const voteRef = ref<HTMLDivElement | null>(null); // 投票容器
const likeTop = ref(50); // 关注点赞默认竖直位置
const likeLeft = ref(50); // 关注点赞默认水平位置
const linkTop = ref(50); // 关注点赞默认竖直位置
const linkLeft = ref(50); // 关注点赞默认水平位置
const voteTop = ref(50); // 关注点赞默认竖直位置
const voteLeft = ref(50); // 关注点赞默认水平位置
const lineTopShow = ref(false); // 上边界线段显示
const lineBottomShow = ref(false); // 下边界线段显示
const lineLeftShow = ref(false); // 左边界线段显示
const lineRightShow = ref(false); // 右边界线段显示
const isShowLike = ref(false); // 是否显示点赞
const isShowLink = ref(false); // 是否显示链接
const isShowVote = ref(false); // 是否显示投票
const linkProgress = ref(0); // 链接显示进度
const voteProgress = ref(0); // 投票显示进度
const isCloseLink = ref(false);
const isCloseVote = ref(false);
const emit = defineEmits(['updateLike', 'updateLink', 'updateVote']);
// props
const props = defineProps({
    // 是否为投稿模式 投稿模式下互动引导可以鼠标拖动，视频播放模式无法拖动
    isUpload: {
        type: Boolean,
        default: false
    },
    // 当前视频播放时间
    currentTime: {
        type: Number,
        default: 0
    },
    // 互动引导-点赞
    like: {
        type: Object as () => InteractionLike,
        // default: () => (null),
        default: () => ({
            id: 1,
            vid: 1,
            uid: 1,
            left: 60,
            top: 60,
            type: 1, // 1 三连加关注 2 仅三连 3 仅关注
            timeStart: 10,
            timeEnd: 24
        }),
    },
    // 互动引导-链接
    link: {
        type: Object as () => InteractionLink,
        // default: () => (null),
        default: () => ({
            id: 1,
            vid: 1,
            uid: 1,
            left: 50,
            top: 50,
            timeStart: 28,
            timeEnd: 40,
            link_url: 'https://www.bilibili.com/',
            link_content: 'bilibili'
        }),
    },
    // 互动引导-投票
    vote: {
        type: Object as () => InteractionVote,
        // default: () => (null),
        default: () => ({
            id: 1,
            vid: 1,
            uid: 1,
            left: 40,
            top: 40,
            timeStart: 60,
            timeEnd: 80,
            question: '老吴帅吗？',
            VoteOptions: [
            {
                id: 0,
                voteid: 0,
                option_text: '老吴帅',
                anvote_count: 0,
            },
            {
                id: 0,
                voteid: 0,
                option_text: '老吴很帅',
                anvote_count: 0,
            },
            {
                id: 0,
                voteid: 0,
                option_text: '老吴一般',
                anvote_count: 0,
            },
            {
                id: 0,
                voteid: 0,
                option_text: '其他，请补充',
                anvote_count: 0,
            }
        ]
        }),
    }
});
// 上下左右四条边界线段显示
const lineHorizontalClasses = computed(() => {
  return [
    lineTopShow.value ? 'hl-line-show-0' : '',
    lineBottomShow.value ? 'hl-line-show-1' : ''
  ].filter(Boolean);
});
const lineVerticalClasses = computed(() => {
  return [
    lineLeftShow.value ? 'hl-line-show-0' : '',
    lineRightShow.value ? 'hl-line-show-1' : ''
  ].filter(Boolean);
});
// 显示关注点赞
const displaylike = (currTimePoint: number) => {
    if (currTimePoint < props.like.timeEnd && props.like.timeStart <= currTimePoint) {
        isShowLike.value = true;
    } else if (props.like.timeEnd <= currTimePoint || currTimePoint < props.like.timeStart) {
        isShowLike.value = false;
    }
};
// 显示视频链接链接
const displaylink = (currTimePoint: number) => {
    if (currTimePoint < props.link.timeEnd && props.link.timeStart <= currTimePoint) {
        isShowLink.value = true;
    } else if (props.link.timeEnd <= currTimePoint || currTimePoint < props.link.timeStart) {
        isShowLink.value = false;
    }
    if (isShowLink.value) {
        linkProgress.value = (currTimePoint - props.link.timeStart) / (props.link.timeEnd - props.link.timeStart);
    }
};
// 显示投票
const displayvote = (currTimePoint: number) => {
    if (currTimePoint < props.vote.timeEnd && props.vote.timeStart <= currTimePoint) {
        isShowVote.value = true;
    } else if (props.vote.timeEnd <= currTimePoint || currTimePoint < props.vote.timeStart) {
        isShowVote.value = false;
    }
    if (isShowVote.value) {
        voteProgress.value = (currTimePoint - props.vote.timeStart) / (props.vote.timeEnd - props.vote.timeStart);
    }
};
 //  鼠标按下时拖动事件
const mouseDown = (e: MouseEvent, divElement: HTMLDivElement | null, type: string) => {
    if (!playerCmdDmWrapRef.value) return;
    if (!divElement) return;
    const disX = e.clientX;
    const disY = e.clientY;
    const startX = divElement.offsetLeft; // 元素到窗口左边的距离
    const startY = divElement.offsetTop; // 元素到窗口上边的距离
    //console.log(divElement.offsetLeft, divElement.offsetTop);
    const parentWidth = playerCmdDmWrapRef.value.clientWidth;
    const parentHeight = playerCmdDmWrapRef.value.clientHeight;
    const offsetX = divElement.clientWidth / (2 * parentWidth);
    const offsetY = divElement.clientHeight / (2 * parentHeight);
    const minLeft = offsetX * 100 + 5;
    const minTop = offsetY * 100 + 5;
    const maxLeft = 100 - offsetX * 100 - 5;
    const maxTop = 100 - offsetY * 100 - 15;
    //鼠标移动时
    document.onmousemove = (e: MouseEvent) => {
        const x = e.clientX - disX;
        const y = e.clientY - disY;
        // 边界值判定
        let divElementLeft = (startX + x) / parentWidth * 100;
        let divElementTop = (startY + y) / parentHeight * 100;
        divElementLeft = Math.min(Math.max(minLeft, divElementLeft), maxLeft);
        divElementTop = Math.min(Math.max(minTop, divElementTop), maxTop);
        if (type === 'vote') {
            voteTop.value = divElementTop;
            voteLeft.value = divElementLeft;
            // 将拖动的坐标传给父组件
            emit('updateVote', divElementTop, divElementLeft);
        } else if (type === 'link') {
            linkTop.value = divElementTop;
            linkLeft.value = divElementLeft;
            // 将拖动的坐标传给父组件
            emit('updateLink', divElementTop, divElementLeft);
        } else if (type === 'like') {
            likeTop.value = divElementTop;
            likeLeft.value = divElementLeft;
            // 将拖动的坐标传给父组件
            emit('updateLike', divElementTop, divElementLeft);
        }
        // 当拖动触碰到边界后线段显示
        switch (divElementTop) {
            case minTop:
                lineTopShow.value = true;
                break;
            case maxTop:
                lineBottomShow.value = true;
                break;
            default:
                lineTopShow.value = false;
                lineBottomShow.value = false;
        };
        switch (divElementLeft) {
            case minLeft:
                lineLeftShow.value = true;
                break;
            case maxLeft:
                lineRightShow.value = true;
                break;
            default:
                lineLeftShow.value = false;
                lineRightShow.value = false;
        };
    }
        //鼠标抬起 清除移动和鼠标抬起事件
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
    }
  
};
// 监听视频播放当前时间点
watch(() => props.currentTime, (currTimePoint) => {
    if (props.like !== null) {
        if (likeLeft.value !== props.like.left || likeTop.value !== props.like.top) {
            likeLeft.value = props.like.left;
            likeTop.value = props.like.top;
        }
        displaylike(currTimePoint);
    }
    if (props.link !== null) {
        if (linkLeft.value !== props.link.left || linkTop.value !== props.link.top) {
            linkLeft.value = props.link.left;
            linkTop.value = props.link.top;
        }
        displaylink(currTimePoint);
    }
    if (props.vote !== null) {
        if (voteLeft.value !== props.vote.left || voteTop.value !== props.vote.top) {
            voteLeft.value = props.vote.left;
            voteTop.value = props.vote.top;
        }
        displayvote(currTimePoint);
    }
});
onMounted(() => {
    // 互动引导 当为投稿模式时，绑定鼠标按下事件并监听拖动
    if (props.isUpload) {
        if (!voteRef.value) return;
        voteRef.value.onmousedown = (e: MouseEvent) => mouseDown(e, voteRef.value, 'vote');
        if (!linkRef.value) return;
        linkRef.value.onmousedown = (e: MouseEvent) => mouseDown(e, linkRef.value, 'link');
        if (!editorRef.value) return;
        editorRef.value.onmousedown = (e: MouseEvent) => mouseDown(e, editorRef.value, 'like');
    }
});
</script>
<style lang="scss" scoped>
.player-cmd-dm-wrap {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 12;
    background: transparent;
    .hl-line-horizontal {
        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            left: 0;
            top: 5%;
            background: #858688;
            z-index: 100;
            display: none;
        }
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            left: 0;
            bottom: 15%;
            background: #858688;
            z-index: 100;
            display: none;
        }
    }
    .hl-line-vertical {
        &::before {
            content: "";
            position: absolute;
            width: 1px;
            height: 100%;
            left: 5%;
            top: 0;
            background: #858688;
            z-index: 100;
            display: none;
        }
        &::after {
            content: "";
            position: absolute;
            width: 1px;
            height: 100%;
            right: 5%;
            top: 0;
            background: #858688;
            z-index: 100;
            display: none;
        }
    }
    .hl-line-show-0::before {
        display: block;
    }
    .hl-line-show-1::after {
        display: block;
    } 
    .hl-editor {
        width: auto;
        height: 36px;
        background: rgba(24, 25, 28, .8);
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        pointer-events: auto;
        -webkit-transform: translate(-50%, -50%) scale(1);
        transform: translate(-50%, -50%) scale(1);
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transition: opacity .35s;
        transition: opacity .35s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: absolute;
        color: #FFFFFF;
        fill: #FFFFFF;
        opacity: 1;
        .hl-guide-three {
            border-radius: 8px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            font-size: 0;
            padding: 0 3px;
            width: 142px;
            height: 36px;
            span {
                display: inline-block;
                height: 20px;
                padding: 8px 12.5px;
                width: 20px;
            }
            .is_active {
                fill: $theme-color;
            }
            // 275 45 142 36 78 36
        }
        .hl-guide-follow {
            font-size: 12px;
            height: 24px;
            margin: 0 6px;
            padding: 0;
            width: 66px;
            border-radius: 4px;
            background: $theme-color;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            .hl-guide-follow-0 {
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                span {
                    font-size: 14px;
                }
            }
            .hl-guide-follow-1 {
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                span {
                    font-size: 14px;
                }
            }
        }
    }
    .hl-editor[hidden] {
        opacity: 0;
    }
    .hl-link {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: rgba(33, 33, 33, .8);
        border-radius: 10px 8px 8px 10px;
        color: #fff;
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 12px;
        height: 50px;
        left: 50%;
        pointer-events: auto;
        position: absolute;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) scale(1);
        transform: translate(-50%, -50%) scale(1);
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transition: opacity .35s;
        transition: opacity .35s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        // width: 290px;
        width: auto;
        z-index: 1;
        // 290 50
        .hl-circle {
            width: 20px;
            height: 20px;
            position: absolute;
            right: -16px;
            top: -16px;
        }
        .hl-link-left {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: 100%;
            width: 232px;
            .hl-link-icon {
                background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAodJREFUaEPtWDtsE0EQfXMu6RAS3jlbgooCCA1SKhBdKjqgoAo9Lb8udCBBhQRl0tBAgyhpEKIJRaqAKEGyvWsEokG0N3CSHW3snHfvds/Wyb52Z968N7OzpxlCwz9qOH+sBCy6gstVgcFgsJUkyTUR+UlEz5VSr2NUwBhzXUTuAfgjIh/SNN3yxS1VAa31ewBXxuBEdCNUxIj8Kwvzi1Lq3FwE5EFCREySH5HeY+aLtQgoCFhJRCysUlcoz0qMwDEwDq6cb6lsuxACIb5HcS1dgTFIFSJVfFwJnilAa30if96IaA3ABQAnXYAxzolIA9gD8PV/zBdKqe9FuIUCtNaXALwBcDwGqQCMv1mW3e50OjveV6jf728mSbIdELQO18vM/HESeKoCxphTIvIZwLE6WARg/gZwhpl/2RhHCXgsIndtIxF5lmXZy263+ymAgLer1nqDiJ6KyNkJHk/SNL3jEvBWRK5av/YdpdQt7+gRDY0xuyKybkG+Y+YNl4CBiLAl4PSsVyAi3ymoXq+33mq1dq2DH8zcnilAay22ATNX/lfEEOfiM0XO5RCDVBkMF5/lFWAPN2WHkLwCvv61VcAeboio1BCSC/D1r1NAULO7iI37xGVXuQdcwK5G9fV32a0EjDNd9n/hyuw8rtDBhqKRTez7DBb1gq+/q1KVe8DVpLHOVwLKNmeszNfexLGJFuEt3xUyxhwaaJIkWWu32/vzyrgdZzSffys10BhjDo2UAB4x84MFCdgWkc2yI+XUUE9E+U7m4bxGy+FweD7LspsA7tuJExGvob7Za5VccaMXW9b729zVoiWiucvdRbw6VWIudOdThfCkz0pAjCyGYKwqEJK9GL7/AEbrAk+wbT0GAAAAAElFTkSuQmCC) no-repeat;
                background-position: 50%;
                background-size: 40px;
                border-radius: 8px 0 0 8px;
                height: 50px;
                overflow: hidden;
                position: relative;
                width: 90px;
            }
            .hl-link-msg {
                -webkit-box-orient: vertical;
                //-webkit-line-clamp: 2;
                display: -webkit-box;
                line-height: 17px;
                margin-left: 8px;
                max-height: 34px;
                overflow: hidden;
                pointer-events: none;
                text-overflow: ellipsis;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                white-space: normal;
                width: 134px;
                word-break: break-all;
            }
        }
        .hl-link-line {
            background: hsla(0, 0%, 100%, .5);
            height: 36px;
            margin: 0 8px 0 0;
            width: 1px;
        }
        .hl-link-right {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: 100%;
            font-size: 10px;
            width: 45px;
            .hl-link-watchlater {
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                align-items: center;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-direction: column;
                flex-direction: column;
                justify-content: center;
                .hl-link-watchlater-icon {
                    width: 24px;
                    height: 24px;
                    .hl-icon {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    .hl-vote {
        background: rgba(24, 25, 28, .8);
        border-radius: 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        //left: 50%;
        padding: 12px 10px 4px;
        pointer-events: auto;
        position: absolute;
        //top: 50%;
        -webkit-transform: translate(-50%, -50%) scale(1);
        transform: translate(-50%, -50%) scale(1);
        -webkit-transform-origin: center;
        transform-origin: center;
        width: auto;
        height: auto;
        // 157 
        .hl-circle {
            width: 20px;
            height: 20px;
            position: absolute;
            right: -16px;
            top: -16px;
        }
        .hl-vote-question {
            height: 14px;
            line-height: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 157px;
            font-size: 12px;
        }
        .hl-vote-an {
            color: #fff;
            cursor: pointer;
            position: relative;
            width: 157px;
            height: 26px;
            margin-top: 6px;
            margin-bottom: 6px;
            .hl-vote-an-bg {
                background: hsla(0, 0%, 100%, .2);
                border-radius: 4px;
                top: 0;
                height: 100%;
                left: 0;
                position: absolute;
                width: 100%;
                .hl-vote-an-bg-buffer {
                    height: 100%;
                    left: 0;
                    position: absolute;
                    top: 0;
                    -webkit-transition: width 1s;
                    transition: width 1s;
                    width: 26px;
                }
            }
            .hl-vote-an-text {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                height: 26px;
                line-height: 26px;
                margin: 6px 0;
                padding-right: 20px;
                position: relative;
                width: 100%;
                font-size: 12px;
                .hl-vote-an-text-index {
                    -webkit-box-flex: 0;
                    border-radius: 4px;
                    -ms-flex: none;
                    flex: none;
                    text-align: center;
                    width: 10px;
                }
                .hl-vote-an-text-doc {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100px;
                }
            }
        }
    }
    .hl-hide {
        display: none;
    }
}        
</style>