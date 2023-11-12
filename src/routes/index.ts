import express from 'express'
import usersRouter from './user';
const router = express.Router();

router.use(usersRouter);

export default router;