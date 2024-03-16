import { loginController } from '../../src/controllers/loginController'
import { comparePassword } from '../../src/lib/password'
import { generateToken } from '../../src/lib/authToken'
import { getUserRecord } from '../../src/lib/database'
import { logger } from '../../src/clients/loggerClient'

jest.mock('../../src/lib/password')
jest.mock('../../src/lib/authToken')
jest.mock('../../src/lib/database')
jest.mock('../../src/clients/loggerClient')
jest.mock('../../config/config')

const mockComparePassword = comparePassword as jest.Mock
const generateTokenMock = generateToken as jest.Mock
const getUserRecordMock = getUserRecord as jest.Mock
const mockErrorLogger = logger.error as jest.Mock

const mockResponseObj = {
    status: jest.fn().mockImplementationOnce(() => {
        return {
            send: jest.fn()
        }
    })
}
const mockRequestObj = {
    body: {
        userName: 'fakeUser',
        password: 'fakePassword'
    }
}

const mockNextFunction = jest.fn()
describe('loginController tests - ', function() {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    it('wrong password provided', async function() {
        getUserRecordMock.mockResolvedValueOnce({
            userName: 'fakeUser'
        })
        mockComparePassword.mockResolvedValueOnce(false)
        await loginController(mockRequestObj as any, mockResponseObj as any, mockNextFunction as any)
        expect(mockComparePassword).toHaveBeenCalled()
        expect(getUserRecordMock).toHaveBeenCalled()
        expect(mockResponseObj.status).toHaveBeenCalledWith(401)
    })

    it('user not found', async function() {
        getUserRecordMock.mockResolvedValueOnce(null)
        await loginController(mockRequestObj as any, mockResponseObj as any, mockNextFunction as any)
        expect(getUserRecordMock).toHaveBeenCalled()
        expect(mockResponseObj.status).toHaveBeenCalledWith(401)
    })

    it('login successful', async function() {
        generateTokenMock.mockReturnValueOnce('fake')
        mockComparePassword.mockResolvedValueOnce(true)
        getUserRecordMock.mockResolvedValueOnce({
            userName: 'fakeUser'
        })
        await loginController(mockRequestObj as any, mockResponseObj as any, mockNextFunction as any)
        expect(getUserRecordMock).toHaveBeenCalled()
        expect(generateTokenMock).toHaveBeenCalledWith('fakeUser')
        expect(mockResponseObj.status).toHaveBeenCalledWith(200)
    })

    it('should throw error', async function() {
        generateTokenMock.mockReturnValueOnce('fake')
        mockComparePassword.mockResolvedValueOnce(true)
        getUserRecordMock.mockImplementationOnce(() => {
            throw new Error()
        })
       await loginController(mockRequestObj as any, mockResponseObj as any, mockNextFunction as any)
       expect(mockErrorLogger).toHaveBeenCalled()
       expect(mockNextFunction).toHaveBeenCalled()  
    })
})
