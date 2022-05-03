import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
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
    svgr(),
  ],
  resolve: {
    alias: {
      '~~/': join(__dirname, 'src/'),
    },
  },
})
