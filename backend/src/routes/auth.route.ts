import { Router } from 'express';
import adminStaffLoginController from '../controllers/auth/admin-staff-login.controller';
import { adminStaffLoginRequestBody } from '../controllers/auth/requests';
import validateRequestMiddleware from '../middlewares/validate-request.middleware';

const authRoute = Router();

authRoute.post(
    '/login/admin-staff',
    validateRequestMiddleware({
        body: adminStaffLoginRequestBody,
    }),
    adminStaffLoginController
);

export default authRoute;
