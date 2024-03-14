import { config } from '../../config/config'
import jwt from 'jsonwebtoken'

export const generateToken = function(id: string): string {
    return jwt.sign(id, config.JWT.SECRET, {
        expiresIn: '2h'
    })
}

export const validateToken = function() {

}
