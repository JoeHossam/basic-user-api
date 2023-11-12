
import jwt from 'jsonwebtoken';

const createAccessToken = (data: string | object | Buffer, options?: { expiresIn?: string | number }) => {
    return jwt.sign(
        data,
        process.env.JWT_SECRET!,
        {
            expiresIn: options?.expiresIn || Number(process.env.JWT_LIFETIME),
        }
    )
}

const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!)
}

export {
    createAccessToken,
    verifyAccessToken
}