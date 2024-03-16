import { IConfig } from '../../@types/IConfig'

export const config: IConfig = {
    PORT: '3333', //can be a number as well
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
    },
    SALT_ROUNDS: 10,
    MSG: {
        AUTH_ERROR: 'Authentication failed.',
        AUTH_SUCCESS: 'Authentication successful.',
        SERVER_ERROR: 'Internal Server Error.',
        REGISTRATION_ERROR: 'Account registration failed. User already exists.',
        REGISTRATION_SUCCESS: 'Account registration successful.'
    },
    JWT: {
        SECRET: 'fake'
    }
    
}