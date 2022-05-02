import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'inline',
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    }),
  ],
  resolve: {
    alias: {
      '~~/': join(__dirname, 'src/'),
    },
  },
})
