export const PORT = process.env.PORT
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/' // TODO: Don't run this in Production
export const JWT_SECRET = process.env.JWT_SECRET || 'RandomJWTSecret' // TODO: Don't run this in Production
