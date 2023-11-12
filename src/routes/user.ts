import express from 'express';
import { getUserById } from '../db/userRepository';
import { BadRequestError } from '../errors';

const router = express.Router();


/**
 * Normally the implementation of the handler functions are done in separate files
 * for simplicity we have merged control layer and service layer into 1 file
 */


router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await getUserById(id);

    if (result.rowCount === 0) {
        throw new BadRequestError(`User ${id} was not found`)
    }

    const user = result.rows[0];

    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        marketingConsent: user.marketingConsent,
        ...(user.marketingConsent && { email: user.email }) // include the email if marketingConsent is true
    })
});

router.post('/', async () => {

})


export default router;
