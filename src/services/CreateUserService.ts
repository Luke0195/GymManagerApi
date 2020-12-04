import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne({ where: { email } });

    if (findUser) {
      throw new AppError('Já existe um usuário com esse email', 400);
    }

    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
