import { NextFunction, Request, Response } from 'express'
import { editMiniUrlRecord } from '../lib/database'
import { logger } from '../clients/loggerClient'
import { validateToken } from '../lib/authToken'
import xss from 'xss'

export const editMiniUrlController = async (req: Request, res: Response, next: NextFunction) => {
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
        const { miniUrl, newMiniUrl } = req.body
        const cleanMiniUrl = xss(miniUrl)
        const cleanNewMiniUrl = xss(newMiniUrl)

        const urlRecord = await editMiniUrlRecord(createdBy, cleanMiniUrl, cleanNewMiniUrl)
        if (!urlRecord) {
            return res.status(400).send({
                msg: 'Update failed! Please provide a different miniUrl.'
            })
        }

        return res.status(200).send({
            updatedUrlRecord: urlRecord
        })
    } catch (error) {
        logger.error(error)
        return next(error)
    }
}