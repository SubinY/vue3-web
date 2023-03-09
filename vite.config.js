import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import { createHtmlPlugin } from 'vite-plugin-html'
import visualizer from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    Components({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
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
    // visualizer({ open: true })
  ],
  build: {
    reportCompressedSize: true, // 启用/禁用 gzip 压缩大小报告
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      },
      // manualChunks(id) {
      //   if (id.includes('node_modules')) {
      //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
      //   }
      // }
    },
  },
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
