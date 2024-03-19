import { NextFunction, Request, Response } from 'express'
import { logger } from '../clients/loggerClient'
import { validateToken } from '../lib/authToken'
import { getUrlsCreatedByUsers } from '../lib/database'

export const urlsCreatedByUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader: string = req.get('Authorization') as string
        const auth = authHeader.split(' ')[1]
        const createdBy = validateToken(auth)
        if (!createdBy) {
            return res.status(401).send({
                msg: 'Invalid Token!'
            })
        }
        const urls = await getUrlsCreatedByUsers(createdBy)

        return res.status(200).send({
            urls: urls
        })
    } catch (error) {
        logger.error(error)
        return next(error)
    }
}