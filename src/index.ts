import express from 'express';
import db from './db';

const app = express();

app.get('/', (req, res) => {
    res.send("hello");
})

db.connect((err) => {
    if (err) throw err;
    console.log("connected")
})

app.listen(3000);