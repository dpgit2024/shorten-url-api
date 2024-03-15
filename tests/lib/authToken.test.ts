import jwt from 'jsonwebtoken'
import { generateToken, validateToken } from '../../src/lib/authToken'

jest.mock('jsonwebtoken')

const mockSign = jwt.sign as jest.Mock
const mockVerify = jwt.verify as jest.Mock

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
})