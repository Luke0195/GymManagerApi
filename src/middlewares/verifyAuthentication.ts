import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UpdateQueryBuilder } from 'typeorm';
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
    throw new Error('JWT is missing');
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
    throw new Error('Invalid JWT Token');
  }
}
