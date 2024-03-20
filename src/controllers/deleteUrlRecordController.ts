import { NextFunction, Request, Response } from 'express'
import { deleteUrlRecord } from '../lib/database'
import { logger } from '../clients/loggerClient'
import { validateToken } from '../lib/authToken'
import xss from 'xss'

export const deleteUrlRecordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader: string = req.get('Authorization') as string
        if (!authHeader) {
            return res.status(400).send({
                msg: 'Auth token is required!'
            })
        }
        const auth = authHeader.split(' ')[1]
        const createdBy = validateToken(auth)
        if (!createdBy) {
            return res.status(401).send({
                msg: 'Invalid Token!'
            })
        }
        const miniUrl = req.params.miniUrl
        const cleanMiniUrl = xss(miniUrl)

        const urlRecord = await deleteUrlRecord(createdBy, cleanMiniUrl)
        if (!urlRecord) {
            return res.status(404).send({
                msg: 'Record not found!'
            })
        }

        return res.status(200).send({
            msg: 'Delete successful!'
        })
    } catch (error) {
        logger.error(error)
        return next(error)
    }
}