import { getCustomRepository } from 'typeorm';
import Member from '../models/Member';
import MemberRepository from '../repository/MemberRepository';

interface Request {
  name: string;
  email: string;
  gender: string;
  birth: Date;
  blood: string;
  weight: number;
  height: number;
  instructor_id: string;
}
class CreateMemberRepository {
  public async execute({
    name,
    email,
    gender,
    birth,
    blood,
    weight,
    height,
    instructor_id,
  }: Request): Promise<Member> {
    const memberRepository = getCustomRepository(MemberRepository);

    const member = memberRepository.create({
      name,
      email,
      gender,
      birth,
      blood,
      weight,
      height,
      instructor_id,
    });

    await memberRepository.save(member);

    return member;
  }
}

export default CreateMemberRepository;
