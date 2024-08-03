<template>
    <div class="play-icon">
        <svg t="1719192515434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24230" width="12" height="12">
            <path d="M511.94 125.24c-118 0-227 54.22-298.6 142.52V85.33H128V469.34h341.33V384H240.67c48.43-104.78 154.16-173.43 271.27-173.43 164.72 0 298.73 134.01 298.73 298.73S676.66 808.03 511.94 808.03c-111.71 0-213.25-61.57-265-160.69l-75.64 39.5c66.51 127.39 197.04 206.52 340.64 206.52C723.71 893.37 896 721.08 896 509.3S723.71 125.24 511.94 125.24z" p-id="24231"></path>
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