import e, { Router } from 'express';
import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';
import CreateInstructorService from '../services/CreateInstructorService';
import FindInstructorService from '../services/FindInstructorService';
import UpdateInstructorService from '../services/UpdateInstructorService';

const instructorsRoutes = Router();

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
export default instructorsRoutes;
