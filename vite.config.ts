import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
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
