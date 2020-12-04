import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import Instructor from '../models/Instructor';
import CreateInstructorService from '../services/CreateInstructorService';
import FindInstructorService from '../services/FindInstructorService';
import UpdateInstructorService from '../services/UpdateInstructorService';
import DeleteInstructorService from '../services/DeleteInstructorService';
import ChangeAvatarInstructorService from '../services/ChangeAvatarInstructorService';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const upload = multer(uploadConfig);
const instructorsRoutes = Router();
instructorsRoutes.use(verifyAuthentication);

instructorsRoutes.get('/', async (request, response) => {
  const instructorRepository = getRepository(Instructor);
  const instructors = await instructorRepository.find();
  response.json(instructors);
});

instructorsRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const findInstructorService = new FindInstructorService();
    const instructor = await findInstructorService.execute({ id });
    response.json(instructor);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

instructorsRoutes.post('/', async (request, response) => {
  try {
    const { name, email, gender, birth, services } = request.body;
    const createUserService = new CreateInstructorService();
    const user = await createUserService.execute({
      name,
      email,
      gender,
      birth,
      services,
    });

    response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

instructorsRoutes.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, gender, services, birth } = request.body;
    const updateInstructorService = new UpdateInstructorService();
    const instructor = await updateInstructorService.execute({
      id,
      name,
      email,
      gender,
      services,
      birth,
    });

    return response.json(instructor);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

instructorsRoutes.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deleteInstructorService = new DeleteInstructorService();
    const instructor = await deleteInstructorService.execute({ id });
    response.status(200).json({ message: 'This is instructor was deleted' });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

instructorsRoutes.patch(
  '/',
  upload.single('avatar'),
  async (request, response) => {
    try {
      const { instructor_id } = request.body;

      const changeAvatarInstructorService = new ChangeAvatarInstructorService();
      const instructor = await changeAvatarInstructorService.execute({
        instructor_id,
        avatarFilename: request.file.filename,
      });

      response.json(instructor);
    } catch (error) {
      response.status(401).json({ message: error.message });
    }
  }
);

export default instructorsRoutes;
