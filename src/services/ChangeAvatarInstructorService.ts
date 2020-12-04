import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import Instructor from '../models/Instructor';

interface Request {
  instructor_id: string;
  avatarFilename: string;
}
class ChangeAvatarInstructorService {
  public async execute({
    instructor_id,
    avatarFilename,
  }: Request): Promise<Instructor> {
    const instructorRepository = getRepository(Instructor);

    const instructor = await instructorRepository.findOne(instructor_id);

    if (!instructor) {
      throw new Error('Não existe instructor com esse id');
    }

    if (instructor.avatar_url) {
      const instructorAvatarFilePath = path.join(
        uploadConfig.directory,
        instructor.avatar_url
      );

      const instructorAvatarFileExists = await fs.promises.stat(
        instructorAvatarFilePath
      );

      if (instructorAvatarFileExists) {
        await fs.promises.unlink(instructorAvatarFilePath);
      }
    }

    instructor.avatar_url = avatarFilename;

    await instructorRepository.save(instructor);

    return instructor;
  }
}

export default ChangeAvatarInstructorService;
