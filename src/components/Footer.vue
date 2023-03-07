<template>
  <div id="footer" class="container-fluid">
    <p class="one">
      GuangZhou Institute of Geochemistry,Chinese Academy of Sclences
    </p>
    <p class="two">Adress</p>
    <p class="three">
      511 Kehua Street, Wushan, Tianhe District, Guangzhou, China(510640)
    </p>
  </div>
</template>

<script setup name="Footer">
const address = import.meta.env.VITE_APP_ADDRESS
const phone = import.meta.env.VITE_APP_PHONE
const email = import.meta.env.VITE_APP_EMAIL
const qq = import.meta.env.VITE_APP_QQ
const company = import.meta.env.VITE_APP_COMPANYNAME
const blog = import.meta.env.VITE_APP_BLOG
const qqgroup = import.meta.env.VITE_APP_QQGROUP
</script>

<style lang="less" scoped>
#footer {
  height: @height-footer;
  color: @color-text-gray;
  background: @color-primary;
  overflow: hidden;
  text-align: center;
  padding: 10px 0;
  p {
    text-align: center;
    margin: 0;
  }
}

.one {
  margin-bottom: 15px !important;
}
</style>
