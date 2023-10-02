import { defineConfig } from 'vite'
import path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import envCompatible from 'vite-plugin-env-compatible'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'), //eslint-disable-line
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    createVuePlugin({ jsx: true }),
    envCompatible(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'bilibili-comment2png',
        },
      },
    }),
  ],
  base: './',
  build: {},
  server: {
    proxy: {
      '/bili.api': {
        target: 'https://api.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bili.api/, ''),
      },
    },
  },
})
