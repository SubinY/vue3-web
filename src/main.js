import { createApp } from 'vue'
import { createRouter } from '@/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/element-variables.less'

/* swiper */
// import 'swiper/swiper.min.css'

/* 重置样式 */
import './assets/css/reset.min.css'

// import 'jquery'

import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min.js'

/* animate.css */
import 'wow.js/css/libs/animate.css'

import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const router = createRouter()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(createPinia())

app.use(router).mount('#app')
