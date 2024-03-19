import { config } from '../../config/config'
import jwt from 'jsonwebtoken'

export const generateToken = function (id: string): string {
    return jwt.sign({ userName: id }, config.JWT.SECRET, {
        expiresIn: '1h'
    })
}

export const validateToken = function (token: string): string | undefined {
    const decoded = jwt.verify(token, config.JWT.SECRET) as { userName: string }
    const userName = decoded?.userName
    return userName
}
