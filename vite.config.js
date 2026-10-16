import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standard Vite config for React (no Tailwind plugins needed)
export default defineConfig({
  plugins: [react()],
})