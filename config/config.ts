export const config: IConfig = {
    PORT: process.env.PORT as string, //can be a number as well
    APP_NAME: process.env.APP_NAME as string,
    NODE_ENV: process.env.NODE_ENV as string,
    LOGGER_LEVEL: process.env.LOGGER_LEVEL as string
}