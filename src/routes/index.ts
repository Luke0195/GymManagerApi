import { Router } from 'express';
import instructorsRoutes from './instructorsRoutes';
import membersRoutes from './membersRoutes';

const routes = Router();

routes.use('/instructors', instructorsRoutes);
routes.use('/members', membersRoutes);
export default routes;
