import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  //@ts-ignore
  base: process.env.NODE_ENV === 'production' || import.meta.env.MODE === 'production'
      ? '/number_methods_laboratories/'
      : '/',
})
