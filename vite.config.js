import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/autoservicios/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000/',
      // '/api': 'https://qaerp.mifacturaperu.com',
    }
  }
})
