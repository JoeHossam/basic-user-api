"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errorHandlerMiddleware"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/user', routes_1.default);
app.use(errorHandlerMiddleware_1.default);
// db.pool.connect((err) => {
//     if (err) throw err;
//     console.log("connected")
// });
const port = process.env.PORT || 3000;
(0, db_1.setupDB)().then(() => {
    app.listen(port, () => {
        console.log(`app listenting on port: ${port}`);
    });
});
