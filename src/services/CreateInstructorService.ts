import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  gender: string;
  birth: Date;
  services: string;
}
class CreateInstructorService {
  public async execute({
    name,
    email,
    gender,
    birth,
    services,
  }: Request): Promise<Instructor> {
    const instructorRepository = getRepository(Instructor);

    const user = instructorRepository.create({
      name,
      email,
      gender,
      birth,
      services,
    });

    await instructorRepository.save(user);

    return user;
  }
}

export default CreateInstructorService;
