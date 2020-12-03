import { Router } from 'express';
import CreateMemberService from '../services/CreateMemberService';

const membersRoutes = Router();

membersRoutes.get('/', (request, response) => {
  return response.json({ message: 'Rota de membros' });
});

membersRoutes.post('/', async (request, response) => {
  try {
    const {
      instructor_id,
      name,
      email,
      gender,
      birth,
      blood,
      weight,
      height,
    } = request.body;

    const memberService = new CreateMemberService();

    const member = await memberService.execute({
      instructor_id,
      name,
      email,
      gender,
      birth,
      blood,
      weight,
      height,
    });

    response.json(member);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});
export default membersRoutes;
