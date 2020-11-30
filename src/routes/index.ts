import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Welcome to the gymManger' })
);

export default routes;
