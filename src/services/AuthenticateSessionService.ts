import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Response {
  user: User;
  token: string;
}
interface Request {
  email: string;
  password: string;
}

class AuthenticateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    // validar o email do usuário
    // validar a senha do úsuario
    // assinar o token JWT
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Combinação incorreta de email/senha', 401);
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new AppError('Combinação incorreta de email/senha', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateSessionService;
