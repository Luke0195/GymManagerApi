import { EntityRepository, Repository } from 'typeorm';
import Member from '../models/Member';

@EntityRepository(Member)
class MemberRepository extends Repository<Member> {}

export default MemberRepository;
