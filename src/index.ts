import 'express-async-errors'
import express from 'express';
import dotenv from 'dotenv'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import appRotuer from './routes';
import { setupDB } from './db';

dotenv.config()

const app = express();

app.use(express.json())

app.use('/api/v1/user', appRotuer);
app.use(errorHandlerMiddleware)

// db.pool.connect((err) => {
//     if (err) throw err;
//     console.log("connected")
// });
const port = process.env.PORT || 3000;
setupDB().then(() => {
    app.listen(port, () => {
        console.log(`app listenting on port: ${port}`)
    });
})