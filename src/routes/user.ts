import express from 'express';
import { getUserById, saveUser } from '../db/userRepository';
import { BadRequestError } from '../errors';
import * as z from 'zod'
import userSchema, { IUser } from '../schemas/user';
import { hashSHA1 } from '../utils/hash';
import { createAccessToken } from '../auth/utils';
import authenticationMiddleware from '../middlewares/authentication';

const SALT = process.env.SALT || '450d0b0db2bcf4adde5032eca1a7c416e560cf44'

const router = express.Router();


/**
 * Normally the implementation of the handler functions are done in separate files
 * for simplicity we have merged control layer and service layer into 1 file
 */

// added authentication middleware, to allow only authenticated users to view this code
router.get('/:id', authenticationMiddleware, async (req, res, next) => {
    const id = req.params.id
    const result = await getUserById(id);

    if (result.rowCount === 0) {
        throw new BadRequestError(`User ${id} was not found`)
    }

    const user = result.rows[0];

    // in case we wanted the user to see only his data
    // we would compare the id from {user} and the id from the {req} (that came from the token)
    // if they are not equal we would return {new UnauthorizedError()}

    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        marketingConsent: user.marketingConsent,
        ...(user.marketingConsent && { email: user.email }) // include the email if marketingConsent is true
    })
});

router.post('/', async (req, res) => {
    const user = req.body as IUser;

    // I haven't implemented validation like this method before, I belive there is a better way to handle this.
    // the major problem is how we return the error
    try {
        // zod schema will validate each field and return a message
        userSchema.omit({ id: true }).parse(user);
    } catch (error) {
        const err = error as z.ZodError;
        const errorsArr = err.errors.map((e) => `${e.path}: ${e.message}`)
        throw new BadRequestError(errorsArr.join(','))
    }

    const id = hashSHA1(user.email, SALT);

    const newUser = { ...user, id };

    // there must be a better way to handle database errors
    try {
        await saveUser(newUser);
    } catch (error) {
        // @ts-ignore - I couldn't find the type for the error thrown by pg
        if (error?.code === '23505') {
            throw new BadRequestError("email already exists");
        }
        throw error;
    }
    const token = createAccessToken(newUser)

    res.status(201).json({ id, token })
})


export default router;