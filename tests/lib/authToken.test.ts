import jwt from 'jsonwebtoken'
import { generateToken, validateToken } from '../../src/lib/authToken'
import { logger } from '../../src/clients/loggerClient'
jest.mock('jsonwebtoken')
jest.mock('../../src/clients/loggerClient')

const mockSign = jwt.sign as jest.Mock
const mockVerify = jwt.verify as jest.Mock
const mockLoggerError = logger.error as jest.Mock

describe('authToken tests -', function() {
    it('generateToken - should call sign', function() {
        const value = 'fake'
        mockSign.mockReturnValueOnce(value)
        const token = generateToken('fakeid')
        expect(token).toBe(value)
    })

    it('validateToken - should call verify', function() {
        const arg = 'fakehjhhjhj'
        const mockUserId = 'fakeUser'
        mockVerify.mockReturnValueOnce({userName: mockUserId})
        const value = validateToken(arg)
        expect(value).toBe(mockUserId)
    })

    it('validateToken - should call error logger', function() {
        const arg = 'fakehjhhjhj'
        mockVerify.mockImplementationOnce(() => {
            throw new Error()
        })
        const value = validateToken(arg)
        expect(mockLoggerError).toHaveBeenCalled()
        expect(value).not.toBeDefined()
    })
})