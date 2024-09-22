import bcrypt from 'bcrypt';
import crypto from 'crypto';

const hashString = async (string: string) => {
    return await bcrypt.hash(string, 10);
};

const compareString = async ({
    string,
    hash,
}: {
    string: string;
    hash: string;
}) => {
    return await bcrypt.compare(string, hash);
};

const generateUniqueDeviceId = (): string => {
    return crypto.randomBytes(16).toString('hex');
};

export { compareString, generateUniqueDeviceId, hashString };
