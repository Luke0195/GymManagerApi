import { Router } from 'express';
import instructorsRoutes from './instructorsRoutes';

const routes = Router();

routes.use('/instructors', instructorsRoutes);
export default routes;
