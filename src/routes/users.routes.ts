import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      email,
      password,
    });

    response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default userRouter;
