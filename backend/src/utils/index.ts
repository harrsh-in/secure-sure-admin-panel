import bcrypt from 'bcrypt';

const hashString = async (string: string): Promise<string> => {
    return await bcrypt.hash(string, 10);
};

const compareString = async ({
    string,
    hash,
}: {
    string: string;
    hash: string;
}): Promise<boolean> => {
    return await bcrypt.compare(string, hash);
};

export { hashString, compareString };
