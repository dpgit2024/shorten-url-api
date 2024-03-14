import { Request, Response } from 'express'
import { getUserRecord } from '../lib/database'
import { config } from '../../config/config'
import { comparePassword } from '../lib/password'
import { generateToken } from '../lib/authToken'
import { logger } from '../clients/loggerClient'

export const loginController = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body
        const record = await getUserRecord('userName', userName)
        if(!record) {
            return res.status(401).send({msg: config.MSG.AUTH_ERROR})
        }

        const isMatch = await comparePassword(password, record.password as string)
        if(!isMatch) {
            return res.status(401).send({msg: config.MSG.AUTH_ERROR})
        }

        const accessToken = generateToken(record.userName as string)
        return res.status(200).send({
            msg: config.MSG.AUTH_SUCCESS,
            accessToken: accessToken
        }) 
    } catch (error) {
        const msg = 'Error in loginController'
        logger.error(msg, error)
        throw new Error(msg)
    }
    
}
