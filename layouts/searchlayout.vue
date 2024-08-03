<template>
    <div class="search-layout">
        <HeaderBar :OPenHeader="true" :isShadow="true" :isShowCenter="false" />
        <slot />
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.search-layout {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    max-width: 2560px;
    background-color: #ffffff;
    overflow: auto;
    min-width: 1236px;
}
</style>