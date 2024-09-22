const getEnv = (key: string, isOptional?: boolean): string => {
    const value = import.meta.env[key];

    if (!value) {
        if (isOptional) {
            return '';
        }
        throw new Error(`Environment variable ${key} not set`);
    }

    return value;
};

export const isDevMode = getEnv('DEV');
export const serverUrl = getEnv('VITE_SERVER_URL') + getEnv('VITE_API_PREFIX');
