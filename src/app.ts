import express,  { NextFunction, Request, Response }  from 'express'
import healthRouter from './routes/health'
import shortenUrlRouter from './routes/shortenUrl'
import { logger, requestLoggerMiddleware } from './clients/loggerClient'
import { ValidationError } from 'express-validation'
import helmet from 'helmet'

const app = express()
app.use(helmet())
app.use(express.json())
app.use(requestLoggerMiddleware)

app.use(healthRouter)
app.use(shortenUrlRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ValidationError) {
        logger.error(err)
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
}) 

export default app