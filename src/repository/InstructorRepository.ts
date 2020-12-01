import { EntityRepository, Repository } from 'typeorm';
import Instructor from '../models/Instructor';

interface InstructorDTO {
  id: string;
  name: string;
  email: string;
  gender: string;
  birth: Date;
}
@EntityRepository(Instructor)
class InstructorRepository extends Repository<Instructor> {
  public async update(data: InstructorDTO);
}

export default InstructorRepository;
