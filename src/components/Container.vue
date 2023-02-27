<template>
  <div class="container-wrap"><slot></slot></div>
</template>

<script setup></script>

<style lang="less" scoped>
.container-wrap {
  min-height: calc(100vh - @height-header - @height-footer);
}
</style>
