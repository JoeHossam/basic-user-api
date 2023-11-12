import { NextFunction, Request, Response } from "express"
import { CustomAPIError } from "../errors/CustomAPIError"

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.status).json({ message: err.message })
    }

    // should add logs here with the error stack etc..
    return res.status(500).json({ message: 'Internal server error' })
}

export default errorHandlerMiddleware
