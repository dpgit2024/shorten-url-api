import { NextFunction, Request, Response } from 'express'
import { logger } from '../clients/loggerClient'
import { IUserRecord } from 'IUserRecord'
import { createUserRecord } from '../lib/database'

export const registrationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestBody: IUserRecord = req.body
        await createUserRecord(requestBody)
        return res.status(200).send({
            message: 'Account registration successful.'
        })
    } catch (error) {
        const msg = 'Error in registrationController: '
        logger.error(msg, error)
        return next(error)
    }
}

