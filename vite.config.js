import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/autoservicios/',
  server: {
    proxy: {
     '/api': 'https://qaerp.mifacturaperu.com',
    }
  }
})
