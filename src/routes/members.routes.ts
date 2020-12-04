import { Router } from 'express';
import multer from 'multer';
import { ReplSet } from 'typeorm';
import uploadConfig from '../config/upload';
import CreateMemberService from '../services/CreateMemberService';
import ChangeAvatarMemberService from '../services/ChangeAvatarMemberService';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const membersRoutes = Router();
const uploads = multer(uploadConfig);
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

membersRoutes.patch(
  '/avatar',
  verifyAuthentication,
  uploads.single('avatar'),
  async (request, response) => {
    const { member_id } = request.body;
    const changeAvatarMemberService = new ChangeAvatarMemberService();
    const member = await changeAvatarMemberService.execute({
      member_id,
      avatar_url: request.file.filename,
    });
    response.json(member);
  }
);

export default membersRoutes;
