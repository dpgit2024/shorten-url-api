import { IConfig } from '../@types/IConfig'

export const config: IConfig = {
    PORT: process.env.PORT as string, //can be a number as well
    APP_NAME: process.env.APP_NAME as string,
    NODE_ENV: process.env.NODE_ENV as string,
    LOGGER_LEVEL: process.env.LOGGER_LEVEL as string,
    RATE_LIMITER: {
        WINDOW_MS: 15 * 60 * 1000,
        LIMIT_CALL_PER_IP: 100,
        LEGACY_HEADER: false,
        STANDARD_HEADER: 'draft-7'
    },
    DB: {
        URI: process.env.MONGODB_URI as string
    },
    SALT_ROUNDS: 10,
    MSG: {
        AUTH_ERROR: 'Authentication failed.',
        AUTH_SUCCESS: 'Authentication successful.',
        SERVER_ERROR: 'Internal Server Error.'
    },
    JWT: {
        SECRET: process.env.JWT_SECRET_KEY as string
    }
    
}