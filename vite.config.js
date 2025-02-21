import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv('all', process.cwd());
const apiUrl =  (env.VITE_API_URL || 'https://qaerp.mifacturaperu.com').split(' ')[0]

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/autoservicios/',
  server: {
    proxy: {
      '/api': apiUrl,
    }
  }
})
