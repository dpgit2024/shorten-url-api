import { NextFunction, Request, Response } from 'express'
import { logger } from '../clients/loggerClient'
import { IUserRecord } from 'IUserRecord'
import { createUserRecord } from '../lib/database'
import { config } from '../../config/config'

export const registrationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: IUserRecord = req.body
        const result = await createUserRecord(requestBody)
        if(!result) {
            return res.status(400).send({
                message: config.MSG.REGISTRATION_ERROR,
                accountAlreadyExists: true
            })
        }
        return res.status(200).send({
            message: 'Account registration successful.'
        })
    } catch (error) {
        const msg = 'Error in registrationController: '
        logger.error(msg, error)
        return next(error)
    }
}

