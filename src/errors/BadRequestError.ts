import { CustomAPIError } from "./CustomAPIError";

class BadRequestError extends CustomAPIError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}

export {
    BadRequestError
}