import { Request, Response } from 'express'
import { shortenUrl } from '../lib/shortenUrl'
import { logger } from '../clients/loggerClient'

export const shortenUrlController = async (req: Request, res: Response) => {
    try {
        const shortUrl = await shortenUrl(req.body.url)
        res.status(200).send({
            shortUrlId: shortUrl
        })
    } catch (error) {
        logger.error(error)
        throw new Error('Error in shortenUrlController')
    }
}