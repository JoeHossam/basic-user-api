import { NextFunction, Request, Response } from "express"
import { UnauthenticatedError } from "../errors"
import { verifyAccessToken } from "../auth/utils"

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Unauthenticated')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = verifyAccessToken(token)
        // normally would inject the user Object on the request for further use.
        next()
    } catch (error) {
        throw new UnauthenticatedError('Unauthenticated')
    }
}

export default authenticationMiddleware