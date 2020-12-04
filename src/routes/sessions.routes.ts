import { Router } from 'express';
import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateSessionService = new AuthenticateSessionService();
  const { user, token } = await authenticateSessionService.execute({
    email,
    password,
  });

  response.json({ user, token });
});

export default sessionsRoutes;
