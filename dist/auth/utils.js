"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (data, options) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
        expiresIn: (options === null || options === void 0 ? void 0 : options.expiresIn) || Number(process.env.JWT_LIFETIME),
    });
};
exports.createAccessToken = createAccessToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
