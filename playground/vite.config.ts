import path from 'path'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
// import UnoCSS from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
export default defineConfig({
  build: {
    outDir: './dist/vite',
  },
  plugins: [
    // UnoCSS(),
    Vue(),
    ElementPlus({}),
    Inspect({
      build: true,
    }),
  ],
  server:{
    fs:{
      allow:['..']
    }
  },
  resolve: {
    alias: [
      {
        find: 'use-element-plus',
        replacement: path.resolve(__dirname, '../src/index.ts'),
      },
    ],
  },
})
