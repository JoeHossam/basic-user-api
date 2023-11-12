"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDB = exports.pool = void 0;
const pg_1 = require("pg");
const DB_NAME = process.env.DB_NAME || 'saqaya-user-api';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD || '123456';
const DB_PORT = process.env.DB_PASSWORD || '5432';
// chosen a pool isntead of a client for optimization and concurrent connections
const pool = new pg_1.Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: String(DB_PASSWORD),
    port: Number(DB_PORT),
});
exports.pool = pool;
const setupDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        "id" CHAR(40) UNIQUE PRIMARY KEY,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        "marketingConsent" BOOLEAN DEFAULT FALSE
    );
    `);
});
exports.setupDB = setupDB;
