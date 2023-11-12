import crypto from 'crypto'

const hashSHA1 = (value: string, salt: string) => {
    const hash = crypto.createHash('sha1');
    hash.update(value + salt);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
}

export {
    hashSHA1
}