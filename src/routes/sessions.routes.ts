import { Router } from 'express';
import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateSessionService = new AuthenticateSessionService();
    const { user, token } = await authenticateSessionService.execute({
      email,
      password,
    });

    response.json({ user, token });
  } catch (error) {
    response.status(401).json({ message: error.message });
  }
});

export default sessionsRoutes;
