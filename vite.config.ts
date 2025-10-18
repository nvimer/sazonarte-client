import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // Configurar alias @ para importaciones limpias
  // Ahora puedes hacer: import { Order } from '@/types'
  // En lugar de: import { Order } from '../../../types'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
