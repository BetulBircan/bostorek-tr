import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      //vue: 'vue/dist/vue.esm-bundler'  //Burada bunu yazmamızın sebepi main.js de createAPPile vue insatncı oluşturukn içindeki template i sayfaya yansıtması ama biz bunu böyle kullanmıcaz şimdilik
    }
  }
})
