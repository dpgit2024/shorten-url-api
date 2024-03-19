import { validateToken } from '../../src/lib/authToken'
import { urlsCreatedByUserController } from '../../src/controllers/urlsCreatedByUserController'
import { getUrlsCreatedByUsers } from '../../src/lib/database'

jest.mock('express')
jest.mock('../../src/lib/database')
jest.mock('../../src/clients/loggerClient')
jest.mock('../../config/config')
jest.mock('mongoose')
jest.mock('../../src/lib/authToken')

const getUrlsCreatedByUsersMock = getUrlsCreatedByUsers as jest.Mock
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

describe('urlsCreatedByUserController tests-', function() {
    beforeEach(() => {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
    })

    it('should call getUrlsCreatedByUsersMock lib function', async function() {
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        await urlsCreatedByUserController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(getUrlsCreatedByUsersMock).toHaveBeenCalled()
        expect(resObj.status).toHaveBeenCalledWith(200)
    })

    it('should call next function', async function() {
        getUrlsCreatedByUsersMock.mockImplementationOnce(() => {
            throw new Error()
        })
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        await urlsCreatedByUserController(reqObj as any,resObj as any, nextFunctionMock as any) 
        expect(nextFunctionMock).toHaveBeenCalled()

    })


    it('should return status 401 for invalid token', async function() {
        validateTokenMock.mockReturnValueOnce(null)
        await urlsCreatedByUserController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(resObj.status).toHaveBeenCalledWith(401)

    })

    
})