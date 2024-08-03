<template>
    <div class="play-icon">
        <svg t="1719191429869" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17307" width="14" height="14">
            <path d="M256 213.333333h170.666667v597.333334H256V213.333333z m341.333333 0h170.666667v597.333334h-170.666667V213.333333z" p-id="17308"></path>
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