import { defineConfig } from 'vitest/config'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [VueJsx(), Vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    // @ts-expect-error
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
})
