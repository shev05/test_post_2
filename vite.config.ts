import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/test_post_2/',
  server: {
    proxy: {
      '/users': {
        target: 'https://testtask.public.indev.by',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://testtask.public.indev.by',
        changeOrigin: true,
        secure: false,
      },
      '/post': {
        target: 'https://testtask.public.indev.by',
        changeOrigin: true,
        secure: false,
      },
      '/comments': {
        target: 'https://testtask.public.indev.by',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
