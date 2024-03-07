import { Request, Response } from 'express'
import { shortenUrl } from '../lib/shortenUrl'

export const shortenUrlController = async (req: Request, res: Response) => {
    const shortUrl = await shortenUrl(req.body.url)
    res.status(200).send({
        shortUrlId: shortUrl
    })
}