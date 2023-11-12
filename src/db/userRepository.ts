import * as db from '.'
import { IUser } from '../schemas/user'

export const getUserById = (id: string) =>
    db.pool.query<IUser>('SELECT * FROM users WHERE id = $1', [id])

export const saveUser = (user: IUser) =>
    db.pool.query(`INSERT INTO users 
        (id, email, "firstName", "lastName", "marketingConsent")
        VALUES
        ($1, $2, $3, $4, $5)`, [user.id, user.email, user.firstName, user.lastName, user.marketingConsent]
    )
