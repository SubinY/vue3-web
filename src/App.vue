<template>
  <Header :user="userStore"></Header>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <div class="page-container">
    <router-view></router-view>
  </div>
  <Footer></Footer>
  <!-- <GoTop></GoTop> -->
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GoTop from '@/components/GoTop.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { to } from '@/utils/awaitTo'

const userStore = useUserStore()

onMounted(async () => {
  const [err] = await to(userStore.getUserInfo())
  if (err) {
    console.log(err, 'err')
  } else {
    console.log(userStore.userInfo, 2)
  }
})
</script>

<style lang="less" scoped></style>
