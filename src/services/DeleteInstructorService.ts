import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';

interface Request {
  id: string;
}
class DeleteInstructorService {
  public async execute({ id }: Request): Promise<void | null> {
    const instructorRepository = getRepository(Instructor);
    const instructor = await instructorRepository.findOne(id);

    if (!instructor) {
      throw new Error('This instructor does not exists');
    }

    await instructorRepository.remove(instructor);
  }
}

export default DeleteInstructorService;
