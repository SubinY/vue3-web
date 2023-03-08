<template>
  <div class="container-wrap">
    <div class="header-left">
      <img class="logo" src="@/assets/img/logo.png" />
    </div>
    <div class="header-right">
      <el-space v-if="!props?.user?.userInfo?.userName" class="right-top" spacer="/"
        ><router-link to="/login">Login</router-link><router-link to="/register">Register</router-link></el-space
      >
      <el-space v-else class="right-top" spacer="/"
        ><span class="account"
          ><img class="account-img" src="@/assets/img/account.png" /><span>{{
            props?.user?.userInfo?.userName
          }}</span></span
        ><span>Logout</span></el-space
      >
      <div class="right-bottom">
        <ul class="header-nav-wrapper">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="index == navIndex ? 'active' : ''"
            @click="navClick(index, item.name)"
          >
            <router-link :to="item.path">
              {{ item.name }}
              <span v-if="item.children.length > 0" class="glyphicon glyphicon-menu-down"></span>
              <i class="underline"></i>
            </router-link>
            <dl v-if="item.children.length > 0">
              <router-link :to="i.path" v-for="(i, n) in item.children" :key="n">
                <dt>{{ i.name }}</dt></router-link
              >
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { defineProps, ref, reactive, watchEffect } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

console.log(props.user, 'user')

const phone = import.meta.env.VITE_APP_PHONE
const email = import.meta.env.VITE_APP_EMAIL

const route = useRoute()
const navIndex = ref('')
const menuName = ref('首页')
const menuClass = ref('glyphicon glyphicon-menu-down')
const navList = [
  {
    name: 'Home',
    path: '/home',
    children: []
  },
  // {
  //   name: '软件产品',
  //   path: '/software',
  //   children: [
  //     {
  //       name: '智能小镇管理系统',
  //       path: '/software/smartTown'
  //     },
  //     {
  //       name: '大数据管理系统',
  //       path: '/software/bigData'
  //     }
  //   ]
  // },
  {
    name: 'Data Resources',
    path: '/data-resources',
    children: []
  },
  {
    name: 'About Us',
    path: '/about',
    children: [
      {
        name: 'What is EELS?',
        path: '/about/1'
      },
      {
        name: 'About Source',
        path: '/about/2'
      },
      {
        name: 'About Us',
        path: '/about/3'
      }
    ]
  },
  {
    name: 'Question',
    path: '/question',
    children: []
  }
]

// navIndex.value = navList.findIndex(
//   (item) => route.path.indexof(item.path) !== -1
// )

watchEffect(() => {
  navIndex.value = navList.findIndex((item) => {
    return route.path.split('/').includes(item.path.slice(1))
  })
  console.log(navIndex.value, 'navIndex.value')
})

function navClick(index, name) {
  navIndex.value = index
  menuName.value = name
}
function menuClick() {
  if (menuClass.value === 'glyphicon glyphicon-menu-down') {
    menuClass.value = 'glyphicon glyphicon-menu-up'
  } else {
    menuClass.value = 'glyphicon glyphicon-menu-down'
  }
}
</script>

<style lang="less" scoped>
.container-wrap {
  display: flex;
  padding: 10px 20px;
  background-color: @color-primary;
  height: @height-header;
  .header-left {
    width: 300px;
    img {
      position: relative;
      height: 100%;
    }
  }
  .header-right {
    flex: 1;
    text-align: right;
    color: @color-text-gray;
    .right-top a {
      color: @color-text-gray;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .account {
    display: flex;
    .account-img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
}

/* 导航栏 导航容器 */
.header-nav-wrapper {
  line-height: 50px;
}

.header-nav-wrapper {
  float: right;
  margin: 0;
  max-width: 800px;
}

/* 导航栏 每个导航 */
.header-nav-wrapper > li {
  float: left;
  margin: 0 15px;
  position: relative;
}

/* 导航栏 每个导航 */
.header-nav-wrapper > li {
  &:last-child {
    margin-right: 0;
  }
}

/* 导航栏 每个导航下面的 a 链接 */
.header-nav-wrapper > li > a {
  color: @color-text-gray;
  font-size: 15px;
  // font-weight: bold;
  padding: 15px 0;
  position: relative;
  // top: -4px;
}

/* 导航栏 每个导航下面的 a 链接的下划线 */
.header-nav-wrapper > li > a > i {
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  transition: all 0.6s ease;
  background-color: #fff;
}

/* 导航栏 每个导航下面的 a 链接的右侧小三角 */
.header-nav-wrapper > li > a > span {
  font-size: 12px;
  transition: transform ease 0.5s;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去的样式 */
.header-nav-wrapper > li > a:hover {
  color: #fff;
  text-decoration: none;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去下划线的样式 */
.header-nav-wrapper > li > a:hover .underline {
  opacity: 1;
  width: 100%;
  left: 0;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去三角标的样式 */
.header-nav-wrapper > li > a:hover span {
  transform: rotate(180deg);
}

/* 导航栏 每个导航下面的 a 链接 鼠标点击后的样式 */
.header-nav-wrapper > li.active > a {
  text-decoration: none;
  color: #fff;
  border-bottom: 2px solid #fff;
}

/* 导航栏 每个导航下面的二级导航容器 */
.header-nav-wrapper > li > dl {
  display: none;
  position: absolute;
  // width: 168px;
  min-width: 120px;
  top: 80%;
  left: 0;
  z-index: 999999;
  box-shadow: 0 0 3px 1px #ccc;
  background: #fff;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 */
.header-nav-wrapper > li > dl dt {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: @color-primary;
  color: @color-text-gray;
  font-weight: normal;
  text-align: center;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 当鼠标滑上时的样式*/
.header-nav-wrapper > li > dl dt > a:hover {
  text-decoration: none;
}

/* 导航栏 滑上一级导航显示二级导航 */
.header-nav-wrapper > li:hover dl {
  display: block;
}

.header-nav-wrapper > li > dl dt:hover {
  cursor: pointer;
  background: @color-secondary;
}
</style>
