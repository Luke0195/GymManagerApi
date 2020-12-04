import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Member from '../models/Member';
import uploadConfig from '../config/upload';

interface Request {
  member_id: string;
  avatar_url: string;
}
class ChangeAvatarMemberService {
  public async execute({ member_id, avatar_url }: Request): Promise<Member> {
    const memberRepository = getRepository(Member);

    const member = await memberRepository.findOne(member_id);

    if (!member) {
      throw new Error('Esse member não existe');
    }

    if (member.avatar_url) {
      const memberAvatarFilePath = path.join(
        uploadConfig.directory,
        member.avatar_url
      );

      const memberAvatarFileExists = await fs.promises.stat(
        memberAvatarFilePath
      );

      if (memberAvatarFileExists) {
        await fs.promises.unlink(memberAvatarFilePath);
      }
    }
    member.avatar_url = avatar_url;
    await memberRepository.save(member);
    return member;
  }
}

export default ChangeAvatarMemberService;
