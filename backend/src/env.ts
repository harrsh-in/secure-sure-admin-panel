import * as dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, isOptional?: boolean): string => {
    const value = process.env[key];

    if (!value) {
        if (isOptional) {
            return '';
        }
        throw new Error(`Environment variable ${key} not set`);
    }

    return value;
};

export const nodeEnv = getEnv('NODE_ENV');
export const port = +getEnv('PORT');
export const jwtSecret = getEnv('JWT_SECRET');
export const refreshTokenSecret = getEnv('REFRESH_TOKEN_SECRET');
