import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateSessionService {
  public async execute({ email, password }: Request): Promise<User> {
    // validar o email do usuário
    // validar a senha do úsuario
    // assinar o token JWT
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Combinação incorreta de email/senha');
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new Error('Combinação incorreta de email/senha');
    }

    return user;
  }
}

export default AuthenticateSessionService;
