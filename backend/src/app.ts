import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
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
            }),
            res: (res) => ({
                statusCode: res.statusCode,
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

app.use('/api/v1', router);

export default app;
