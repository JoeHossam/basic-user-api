import { CustomAPIError } from "./CustomAPIError";

class UnauthenticatedError extends CustomAPIError {
    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}

export default UnauthenticatedError;