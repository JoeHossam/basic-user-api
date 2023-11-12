import { Pool } from 'pg';

const DB_NAME: string = process.env.DB_NAME || 'saqaya-user-api';
const DB_USER: string = process.env.DB_USER || 'postgres';
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '123456';
const DB_PORT: string = process.env.DB_PASSWORD || '5432';

// chosen a pool isntead of a client for optimization and concurrent connections
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: String(DB_PASSWORD), // it read the password as a number
    port: Number(DB_PORT),
})

export { pool }