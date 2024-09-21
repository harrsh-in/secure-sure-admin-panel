import { Router } from 'express';
import pingController from '../controllers';

const router = Router();

router.get('/', pingController);

export default router;
