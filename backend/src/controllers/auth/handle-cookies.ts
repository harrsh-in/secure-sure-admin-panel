import { Response } from 'express';
import { nodeEnv } from '../../env';
import { generateUniqueDeviceId } from '../../utils';
import {
    generateAccessToken,
    generateRefreshToken,
    storeRefreshToken,
} from '../../utils/token';

const saveLoginCookies = async (res: Response, id: string) => {
    const accessToken = generateAccessToken({
        id,
    });
    const refreshToken = generateRefreshToken({
        id,
    });
    const deviceId = generateUniqueDeviceId();

    await storeRefreshToken({
        refreshToken,
        deviceId,
        userId: id,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.cookie('deviceId', deviceId, {
        httpOnly: true,
        secure: nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.cookie('isUserAuthenticated', 'true', {
        httpOnly: false,
        secure: nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 15,
    });
};

const removeLoginCookies = async (res: Response) => {
    res.clearCookie('refreshToken');
    res.clearCookie('deviceId');
    res.clearCookie('accessToken');
    res.clearCookie('isUserAuthenticated');
};

export { saveLoginCookies, removeLoginCookies };
