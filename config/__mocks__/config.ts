import { IConfig } from '../../@types/IConfig'

export const config: IConfig = {
    PORT: '5000', //can be a number as well
    APP_NAME: 'shorten-url-backend',
    NODE_ENV: 'dev',
    LOGGER_LEVEL: 'debug',
    RATE_LIMITER: {
        WINDOW_MS: 15 * 60 * 1000,
        LIMIT_CALL_PER_IP: 100,
        LEGACY_HEADER: false,
        STANDARD_HEADER: 'draft-7'
    },
    DB: {
        URI: 'fake'
    }
    
}