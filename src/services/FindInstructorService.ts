import { response } from 'express';
import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';

interface Request {
  id: string;
}
class FindInstructorService {
  public async execute({ id }: Request): Promise<Instructor | null> {
    const instructorRepository = getRepository(Instructor);

    const findInstructor = await instructorRepository.findOne(id);

    if (!findInstructor) {
      throw new Error('This instructor does not exists');
    }

    return findInstructor || null;
  }
}

export default FindInstructorService;
