<template>
    <div class="player-sending-area">
        <div class="player-sending-bar">
            <div class="player-video-info">
                <div class="player-video-info-online">
                    <b>23</b>人正在观看，
                </div>
                <div class="player-video-info-dm">
                    已装填100条弹幕
                </div>
            </div>
            <div class="player-dm-send-root">
                <VideoplayerPlayerSendDmInput 
                :isFullscreen="props.fullscreen"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    fullscreen: {
        type: Boolean,
        default: false
    }
});

</script>
<style lang="scss" scoped>
.player-sending-area {
    position: relative;
    height: 46px;
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    .player-sending-bar {
        -webkit-box-flex: 0;
        -webkit-box-pack: justify;
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 12px 0 20px;
        user-select: none;
        white-space: nowrap;
        .player-video-info {
            position: relative;
            min-width: 200px;
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;
            color: #757575;
            .player-video-info-online {
                display: flex;
                align-items: center;
                height: 100%;
                user-select: none;
                white-space: nowrap;
                font-size: 13px;
            }
            .player-video-info-dm {
                display: flex;
                align-items: center;
                height: 100%;
                user-select: none;
                white-space: nowrap;
                font-size: 13px;
            }
        }
        .player-dm-send-root {
            position: relative;
            height: 100%;
            display: flex;
            flex: 1;
        }
    }
}
</style>