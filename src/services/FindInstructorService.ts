import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class FindInstructorService {
  public async execute({ id }: Request): Promise<Instructor | null> {
    const instructorRepository = getRepository(Instructor);

    const findInstructor = await instructorRepository.findOne(id);

    if (!findInstructor) {
      throw new AppError('This instructor does not exists', 400);
    }

    return findInstructor || null;
  }
}

export default FindInstructorService;
