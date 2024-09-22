import { Router } from 'express';
import adminGetDetailsController from '../../controllers/admin/details/get-details.controller';

const adminDetailsRoute = Router();

adminDetailsRoute.get('/', adminGetDetailsController);

export default adminDetailsRoute;
