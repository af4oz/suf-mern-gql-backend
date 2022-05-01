import jwt, { JwtPayload } from 'jsonwebtoken';
import { TContext } from '../types';
import { SECRET } from './config';

const getUser = (context: TContext) => {
  const token = context.req.headers.authorization;

  if (!token) {
    return null;
  }
  if (!SECRET) throw new Error('please provide valid jwt token!');
  try {
    const decodedUser = jwt.verify(token, SECRET);
    return decodedUser as JwtPayload;
  } catch (_) {
    return null;
  }
};
export default getUser;
