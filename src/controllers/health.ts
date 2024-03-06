import { Request, Response } from 'express'

export const healthController = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Shorten URL API service is running.'
    })
}