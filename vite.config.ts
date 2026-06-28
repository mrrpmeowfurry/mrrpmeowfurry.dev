import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // split the heavy deps into their own chunks 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler'))
            return 'react'
          if (id.includes('@material/material-color-utilities')) return 'color-utils'
          if (id.includes('@material/web') || id.includes('node_modules/lit')) return 'material-web'
        },
      },
    },
  },
})
