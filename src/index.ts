import express from 'express';
import * as db from './db';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.get('/', (req, res) => {
    res.send("hello");
})

db.pool.connect((err) => {
    if (err) throw err;
    console.log("connected")
});


app.listen(3000);