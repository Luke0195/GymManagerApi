import { Router } from 'express';
import instructorsRoutes from './instructors.routes';
import membersRoutes from './members.routes';
import userRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/instructors', instructorsRoutes);
routes.use('/members', membersRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);
export default routes;
