<template>
  <div class="layout">
      <HeaderBar :OPenHeader="true" :isShadow="true"/>
    <slot />
  </div>
</template>
<style scoped>
.layout {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    max-width: 2560px;
    background-color: #ffffff;
    overflow: auto;
    min-width: 1236px;
}
</style>