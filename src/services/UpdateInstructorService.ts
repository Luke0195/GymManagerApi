import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';

interface Request {
  id: string;
  name: string;
  email: string;
  gender: string;
  services: string;
  birth: Date;
}

class UpdateInstructorService {
  public async execute({
    id,
    name,
    email,
    gender,
    services,
    birth,
  }: Request): Promise<Instructor | null> {
    const instructorRepository = getRepository(Instructor);
    const instructor = await instructorRepository.findOne(id);

    if (!instructor) {
      throw new Error('This instructor does not exists');
    }

    const instructorUpdated = instructorRepository.create({
      name,
      email,
      gender,
      services,
      birth,
    });

    await instructorRepository.update({ id }, instructorUpdated);

    return instructorUpdated || null;
  }
}

export default UpdateInstructorService;
