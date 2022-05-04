import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
