import { Request, Response } from 'express'
import { shortenUrl } from '../lib/shortenUrl'

export const shortenUrlController = (req: Request, res: Response) => {
    const shortUrl = shortenUrl(req.body.url, req.protocol as string, req.get('host') as string)
    res.status(200).send({
        shortUrl: shortUrl
    })
}