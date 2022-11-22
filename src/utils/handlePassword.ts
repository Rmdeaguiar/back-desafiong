import bcrypt from 'bcrypt'

export function encryptPasswordValue(password: string) {
    return bcrypt.hash(password, 10);
}

export function comparePasswords(firstPass: string, secondPass: string) {
    return bcrypt.compare(firstPass, secondPass)
}
