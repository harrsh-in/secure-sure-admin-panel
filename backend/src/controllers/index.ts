import { Request, Response } from 'express';
import logger from '../utils/logger';

const pingController = async (req: Request, res: Response) => {
    try {
        logger.info('The server is up and running!!!');

        res.status(200).json({
            message: 'The server is up and running!!!',
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export default pingController;
