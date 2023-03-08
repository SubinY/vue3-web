import { createApp } from 'vue'
import { createRouter } from '@/router'
import store from '@/store'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './assets/css/bootstrap.min.css'
// import './assets/js/bootstrap.min.js'

import './style/index.less'

import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const router = createRouter()
const app = createApp(App)
app.use(store)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)

app.use(router).mount('#app')
