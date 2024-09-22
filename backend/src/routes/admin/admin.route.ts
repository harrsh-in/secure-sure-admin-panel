import { Router } from 'express';
import adminDetailsRoute from './details.route';

const adminRoute = Router();

adminRoute.use('/details', adminDetailsRoute);

export default adminRoute;
