import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import { createHtmlPlugin } from 'vite-plugin-html'
import visualizer from 'rollup-plugin-visualizer'
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    // Components({
    //   resolvers: [AntDesignVueResolver()]
    // }),
    inject({
      $: 'jquery', // 这里会自动载入 node_modules 中的 jquery
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      ElementPlus: 'ElementPlus'
    }),
    createHtmlPlugin({
      /**
       * 需要注入 index.html ejs 模版的数据
       * https://blog.csdn.net/SilenceJude/article/details/128297371
       */
      inject: {
        data: {
          VITE_APP_VERSION: new Date().toLocaleString()
        }
      }
    }),
    vue(),
    visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 用于全局导入，以避免需要单独导入每个样式文件。
          // reference:  避免重复引用
          hack: `true; @import (reference) "${resolve('src/style/index.less')}";`
          // ↓这行代码下一章讲
          // ...generateModifyVars(),
        },
        javascriptEnabled: true
      }
    }
  }
})
