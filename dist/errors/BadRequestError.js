"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const CustomAPIError_1 = require("./CustomAPIError");
class BadRequestError extends CustomAPIError_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
exports.BadRequestError = BadRequestError;
