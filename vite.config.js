import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Dev proxy so we can pull live GIF URLs from Tenor search pages
      '/api/tenor': {
        target: 'https://tenor.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tenor/, ''),
      },
    },
  },
})
