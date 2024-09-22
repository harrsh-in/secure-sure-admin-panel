export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const wait = async (ms: number) => {
    await delay(ms);
};
