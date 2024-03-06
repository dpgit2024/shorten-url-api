import { NextFunction, Request, Response } from 'express'
import winston from 'winston'

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
     ),
    transports: [new winston.transports.Console()]
})

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let requestBody = req.body
    if(req.body?.password) { //remove sensitive info from logger
        const {password, ...requestBodyWithoutPassword} = requestBody
        requestBody = requestBodyWithoutPassword
    }
    logger.info({url: req.url, path: req.path, body: requestBody, method: req.method})
    return next()
}