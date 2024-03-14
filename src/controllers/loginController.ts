import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Shorten URL API service is running.'
    })
}
