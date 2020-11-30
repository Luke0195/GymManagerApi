import { Router } from 'express';

const instructorsRoutes = Router();

instructorsRoutes.get('/', (request, response) => {
  return response.json({ message: 'Route of instructors' });
});

export default instructorsRoutes;
