import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import StylesUtil from "./src/constant/styles/StylesUtil";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),

    Unocss({
      presets: [],
      rules: [
        StylesUtil.generateReactiveCss([/^font-(\d+)(.+)?$/, match => ({'font-size': `${match[1] || 20}${match[2] || 'px'}`})]),
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
