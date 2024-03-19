import { NextFunction, Request, Response } from 'express'
import { getUserRecord } from '../lib/database'
import { config } from '../../config/config'
import { comparePassword } from '../lib/password'
import { generateToken } from '../lib/authToken'
import { logger } from '../clients/loggerClient'

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, password } = req.body
        const record = await getUserRecord('userName', userName)
        if (!record) {
            return res.status(401).send({ msg: config.MSG.AUTH_ERROR })
        }

        const isMatch = await comparePassword(password, record.password as string)
        if (!isMatch) {
            return res.status(401).send({ msg: config.MSG.AUTH_ERROR })
        }

        const accessToken = generateToken(record.userName as string)
        record.password = undefined
        return res.status(200).send({
            msg: config.MSG.AUTH_SUCCESS,
            accessToken: accessToken,
            user: record
        })
    } catch (error) {
        const msg = 'Error in loginController'
        logger.error(msg, error)
        return next(error)
    }

}
