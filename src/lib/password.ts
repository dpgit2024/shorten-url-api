import bcrypt from 'bcrypt'
import { config } from '../../config/config'

export const hashPassword = async function (password: string): Promise<string> {
    return await bcrypt.hash(password, config.SALT_ROUNDS)
}

export const comparePassword = async function (plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
}
