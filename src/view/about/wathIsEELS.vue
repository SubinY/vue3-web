<template>
  <div class="container">
    <div class="row center-block">
      <img style="width: 100%" src="/src/assets/img/EELS1.gif" />
    </div>
    <div class="row center-block">
      Lorem ipsum dolor sit amet, consectetur adipiscing edit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus
      et magnis dis partuient montes, nascetur ridiculus mus. Nam fermentum,
      nulla Ictus pharetra vulputate, felis tellus mollis orci, sed rhoncus
      pronin sapien nunc accuan eget.
    </div>
    <div class="row center-block">
      Lorem ipsum dolor sit amet, consectetur adipiscing edit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus
      et magnis dis partuient montes, nascetur ridiculus mus. Nam fermentum,
      nulla Ictus pharetra vulputate, felis tellus mollis orci, sed rhoncus
      pronin sapien nunc accuan eget.
    </div>
  </div>
</template>

<script setup name="wathIsEELS">
import { onMounted } from 'vue'

const softwareList = [
  {
    path: '/software/smartTown',
    name: '智能小镇管理系统'
  },
  {
    path: '/software/bigData',
    name: '大数据管理系统'
  }
]
onMounted(() => {
  // var wow = new WOW()
  // wow.init()
})
</script>

<style lang="less" scoped>
.container {
  min-height: @page-content-min-height;
  padding: 50px 0;
  > div {
    max-width: 600px;
    margin-bottom: 50px;
    font-size: 12px;
  }
}
</style>

