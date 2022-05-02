import { AuthenticationError } from 'apollo-server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TContext } from '../types'
import { SECRET } from './config'

const authChecker = (context: TContext) => {
  const token = context.req.headers.authorization
  if (!token) {
    throw new AuthenticationError('No auth token found. Authorization denied.')
  }

  if (!SECRET) throw new Error('please provide valid jwt token!')
  try {
    const decodedUser = jwt.verify(token, SECRET)
    return decodedUser as JwtPayload
  } catch (err) {
    if (err instanceof Error) {
      throw new AuthenticationError(err.message)
    } else {
      throw new AuthenticationError(JSON.stringify(err))
    }
  }
}
export default authChecker
