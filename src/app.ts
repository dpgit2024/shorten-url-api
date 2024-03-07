import express,  { NextFunction, Request, Response }  from 'express'
import healthRouter from './routes/healthRouter'
import shortenUrlRouter from './routes/shortenUrlRouter'
import { logger, requestLoggerMiddleware } from './clients/loggerClient'
import { ValidationError } from 'express-validation'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const app = express()
app.use(helmet())
app.use(limiter)
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