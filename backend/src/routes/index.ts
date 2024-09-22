import { Role } from '@prisma/client';
import { Router } from 'express';
import pingController from '../controllers';
import authenticateUserMiddleware from '../middlewares/authenticate-user.middleware';
import adminRoute from './admin-staff/admin-staff.route';
import authRoute from './auth.route';

const router = Router();

router.get('/', pingController);

router.use('/auth', authRoute);
router.use(
    '/admin-staff',
    authenticateUserMiddleware([Role.ADMIN]),
    adminRoute
);

export default router;
