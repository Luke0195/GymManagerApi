import { Router } from 'express';
import CreateInstructorService from '../services/CreateInstructorService';

const instructorsRoutes = Router();

instructorsRoutes.get('/', (request, response) => {
  return response.json({ message: 'Route of instructors' });
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

export default instructorsRoutes;
