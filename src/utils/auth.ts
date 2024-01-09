import crypto from 'crypto'

const getSaltAndHash = (password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1, 512, 'sha512').toString('hex')
    return {salt, hash}
}

const isPasswordValid = (password, {salt, hash}) => {
    return (
        hash ===
        crypto.pbkdf2Sync(password, salt, 1, 512, 'sha512').toString('hex')
    )
}

export {getSaltAndHash, isPasswordValid}