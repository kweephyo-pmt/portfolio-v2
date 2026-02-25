import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Force Vite restart to pick up new postcss/tailwind config files
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
