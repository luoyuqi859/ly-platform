import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import * as dotenv from 'dotenv'
import * as fs from 'fs'

const NODE_ENV = process.env.NODE_ENV || 'development'
const envFiles = [
  `.env.${NODE_ENV}`
]
for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],
    //这里进行配置别名
  resolve: {
    alias: {
      '@': path.resolve('./src') // @代替src
    }
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.VITE_CLI_PORT, 10),
    proxy: {
      [process.env.VITE_BASE_API]: { // 需要代理的路径   例如 '/api'
        target: `${process.env.VITE_BASE_PATH}:${process.env.VITE_SERVER_PORT}/`, // 代理到 目标路径
        changeOrigin: true,
      }
    },
  },
  build: {
    // 指定输出目录
    outDir: 'dist',
    // 指定生成的静态资源在 HTML 中的路径
    assetsDir: 'assets',
  },
})
