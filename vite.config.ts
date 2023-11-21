import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path"

export default defineConfig({
  base: '/number_methods_laboratories/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
