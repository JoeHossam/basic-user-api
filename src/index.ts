import 'express-async-errors'
import express from 'express';
import * as db from './db';
import dotenv from 'dotenv'
import errorHandlerMiddleware from './middlewares';
import appRotuer from './routes';

dotenv.config()

const app = express();

app.use('/api/v1/user', appRotuer);
app.use(errorHandlerMiddleware)

db.pool.connect((err) => {
    if (err) throw err;
    console.log("connected")
});


app.listen(3000);