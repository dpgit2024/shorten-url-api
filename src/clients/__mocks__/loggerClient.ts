//mock file for unit test
export const logger: any = {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
}

export const requestLoggerMiddleware = jest.fn().mockImplementationOnce((req, res, next) => {
    return next()
})