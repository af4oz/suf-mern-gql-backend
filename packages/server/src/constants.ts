export const IS_PROD = process.env.NODE_ENV === 'production'

export const FRONTEND_URLS = JSON.parse(
  process.env.FRONTEND_URLS || '[]'
) as string[]
