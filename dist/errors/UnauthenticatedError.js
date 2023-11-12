"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomAPIError_1 = require("./CustomAPIError");
class UnauthenticatedError extends CustomAPIError_1.CustomAPIError {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.default = UnauthenticatedError;
