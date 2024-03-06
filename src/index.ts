require('dotenv').config()

import app from './app'
import { config } from '../config/config'
import { logger } from './clients/loggerClient'

app.listen(config.PORT, () => {
    logger.info(`${config.APP_NAME} server started..`)
})