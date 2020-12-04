import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import authConfig from '../config/authConfig';

interface TokenPayLoad {
  ia: number;
  exp: number;
  sub: string;
}
export default function verifyAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missinI', 401);
  }
  try {
    const [, token] = authHeader.split(' ');

    const data = verify(token, authConfig.jwt.secret);

    const { sub } = data as TokenPayLoad;
    // A requisição terá o id da pessoa

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
