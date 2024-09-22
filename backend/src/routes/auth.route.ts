import { Router } from 'express';
import adminLoginController from '../controllers/auth/admin-login.controller';
import { adminLoginRequestBody } from '../controllers/auth/requests';
import validateRequestMiddleware from '../middlewares/validate-request.middleware';

const authRoute = Router();

authRoute.post(
    '/login/admin',
    validateRequestMiddleware({
        body: adminLoginRequestBody,
    }),
    adminLoginController
);

export default authRoute;
