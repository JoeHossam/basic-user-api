import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'saqaya-user-api',
    password: '123456',
    port: 5432,
})

export default client;