import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne({ where: { email } });

    if (findUser) {
      throw new Error('Já existe um usuário com esse email');
    }

    const user = userRepository.create({
      email,
      password,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
