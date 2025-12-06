import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#': resolve(__dirname, './src'),
      '#/components': resolve(__dirname, './src/components'),
      '#/constants': resolve(__dirname, './src/constants'),
      '#/store': resolve(__dirname, './src/store'),
      '#/HOC': resolve(__dirname, './src/HOC'),
      '#/windows': resolve(__dirname, './src/windows'),
    }
  }
})
