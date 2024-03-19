import { NextFunction, Request, Response } from 'express'
import { shortenUrl } from '../lib/shortenUrl'
import { logger } from '../clients/loggerClient'
import { validateToken } from '../lib/authToken'
import xss from 'xss'

export const shortenUrlController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get('Authorization')
        let createdBy
        if(authHeader) {
            const auth = authHeader.split(' ')[1]
            createdBy = validateToken(auth)
            if(!createdBy) {
                res.status(401).send({
                    msg: 'Invalid Token!'
                })
            }
        }

        const cleanUrl = xss(req.body.url)
        const shortUrl = await shortenUrl(cleanUrl, createdBy)
        
        res.status(200).send({
            shortUrlId: shortUrl
        })
    } catch (error) {
        logger.error(error)
        return next(error)
    }
}