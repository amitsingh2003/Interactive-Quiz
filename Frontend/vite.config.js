import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react() ,  tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    cors: true
  },
 
    theme: {
      extend: {
        fontFamily: {
          'outfit': ['Outfit', 'sans-serif'],
        },
      },
    },
  
})
