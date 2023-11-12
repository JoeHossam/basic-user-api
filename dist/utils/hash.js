"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashSHA1 = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashSHA1 = (value, salt) => {
    const hash = crypto_1.default.createHash('sha1');
    hash.update(value + salt);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
};
exports.hashSHA1 = hashSHA1;
