import express  from 'express'
import healthRouter from './routes/health'
import { requestLoggerMiddleware } from './clients/loggerClient'
const app = express()

app.use(requestLoggerMiddleware)
app.use(healthRouter)

export default app