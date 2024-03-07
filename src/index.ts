require('dotenv').config()

import app from './app'
import { config } from '../config/config'
import { logger } from './clients/loggerClient'
import mongoose from 'mongoose'

mongoose.connect(config.DB.URI).then(() => {
    logger.info('MongoDB connected!')
    app.listen(config.PORT, () => {
        logger.info(`App ${config.APP_NAME} listening on port: ${config.PORT}`)
    })
}).catch((err) => {
    logger.error('Error in connecting to MOngoDB..', err)
})

