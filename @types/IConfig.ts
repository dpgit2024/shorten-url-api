export interface IConfig {
    PORT: string 
    APP_NAME: string
    NODE_ENV: string
    LOGGER_LEVEL: string
    RATE_LIMITER: {
        WINDOW_MS: number
        LIMIT_CALL_PER_IP: number
        LEGACY_HEADER: boolean
        STANDARD_HEADER: string
    }
    DB: {
        URI: string
    }
    SALT_ROUNDS: number
    MSG: {
        AUTH_ERROR: string
        AUTH_SUCCESS: string
    }
    JWT: {
        SECRET: string
    }
}