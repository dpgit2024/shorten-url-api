import { validateToken } from '../../src/lib/authToken'
import { shortenUrlController } from '../../src/controllers/shortenUrlController'
import { shortenUrl } from '../../src/lib/shortenUrl'

jest.mock('express')
jest.mock('../../src/lib/shortenUrl')
jest.mock('../../src/clients/loggerClient')
jest.mock('../../config/config')
jest.mock('mongoose')
jest.mock('../../src/lib/authToken')

const shortenUrlMock = shortenUrl as jest.Mock
const validateTokenMock = validateToken as jest.Mock

const reqObj = {
    get: jest.fn(),
    body: {
        url: 'https://www.google.com/wjkhfdhfdajkhdajk'
    }
}

const resObj = { 
    status: jest.fn().mockReturnValue({
        send: jest.fn()
    }), 
    send: jest.fn()
}

const nextFunctionMock = jest.fn()

describe('shortenUrlController tests-', function() {
    it('should call shortenUrl lib function', async function() {
        await shortenUrlController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(shortenUrlMock).toHaveBeenCalled()

    })

    it('should call next function', async function() {
        shortenUrlMock.mockImplementationOnce(() => {
            throw new Error()
        })
        await shortenUrlController(reqObj as any,resObj as any, nextFunctionMock as any) 
        expect(nextFunctionMock).toHaveBeenCalled()

    })

    it('should save createdBy when valid token provided', async function() {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockReturnValueOnce('fakeUser')
        await shortenUrlController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(shortenUrlMock).toHaveBeenCalledWith(reqObj.body.url, 'fakeUser')

    })

    it('should return status 401 for invalid token', async function() {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockReturnValueOnce(null)
        await shortenUrlController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(resObj.status).toHaveBeenCalledWith(401)

    })

    
})