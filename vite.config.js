import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,          // otomatis buka browser
    host: true,          // bisa diakses dari HP juga
    preview: {           // ini yang bikin full screen saat preview
      open: true
    }
  }
})