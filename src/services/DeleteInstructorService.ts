import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}
class DeleteInstructorService {
  public async execute({ id }: Request): Promise<void | null> {
    const instructorRepository = getRepository(Instructor);
    const instructor = await instructorRepository.findOne(id);

    if (!instructor) {
      throw new AppError('This instructor does not exists', 400);
    }

    await instructorRepository.remove(instructor);
  }
}

export default DeleteInstructorService;
