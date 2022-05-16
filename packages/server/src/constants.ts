export const IS_PROD = process.env.NODE_ENV === 'production'

export const FRONTEND_URLS = IS_PROD
  ? [
      'https://suf-mern-gql-frontend.vercel.app',
      /https:\/\/suf-mern-gql-frontend(.*-zkindest)?.vercel.app/,
    ]
  : ['http://localhost:3000']
