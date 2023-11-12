import * as db from '.'

export const getUserById = (id: string) =>
    db.pool.query<IUser>('SELECT * FROM users WHERE id = $1', [id])
