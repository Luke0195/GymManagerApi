import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    email,
    password,
  });
  delete user.password;
  response.json(user);
});

export default userRouter;
