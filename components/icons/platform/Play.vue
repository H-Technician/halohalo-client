<template>
    <div class="play-icon">
        <svg t="1719192266070" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20680" width="14" height="14">
            <path d="M713.896 393.15l-240-158.691c-80.996-54.004-150-17.987-150 80.996v360c0 98.73 65.703 134.707 150 80.703l240-158.711c80.724-60 80.724-150 0-203.984v-0.313z" p-id="20681"></path>
        </svg>
    </div>
</template>
<style scoped lang="scss">
.play-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: $item-color-hover;
    cursor: pointer;
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        fill: $item-color;
        &:hover {
            fill: $theme-color;
        }
    }
}
</style>