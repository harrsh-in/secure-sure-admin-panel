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

export const port = +getEnv('PORT');
