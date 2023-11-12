"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomAPIError_1 = require("../errors/CustomAPIError");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError_1.CustomAPIError) {
        return res.status(err.status).json({ message: err.message });
    }
    // should add logs here with the error stack etc..
    return res.status(500).json({ message: 'Internal server errosr' });
};
exports.default = errorHandlerMiddleware;
