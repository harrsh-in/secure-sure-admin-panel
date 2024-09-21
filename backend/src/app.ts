import compression from 'compression';
import cors from 'cors';
import express, { query } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import errorHandlerMiddleware from './middlewares/error.middleware';
import successHandlerMiddleware from './middlewares/response.middleware';
import router from './routes';

const app = express();

app.use(
    pinoHttp({
        transport: {
            target: 'pino-pretty',
        },
        serializers: {
            req: (req) => ({
                method: req.method,
                url: req.url,
                query: req.query,
                params: req.params,
                remoteAddress: req.remoteAddress,
                remotePort: req.remotePort,
            }),
            res: (res) => ({
                statusCode: res.statusCode,
            }),
            responseTime: (responseTime) => ({
                responseTime: `${responseTime} ms`,
            }),
        },
    })
);

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
app.use(compression());

app.use(successHandlerMiddleware);
app.use('/api/v1', router);
app.use(errorHandlerMiddleware);

export default app;
