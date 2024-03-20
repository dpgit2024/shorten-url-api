import { validateToken } from '../../src/lib/authToken'
import { deleteUrlRecordController } from '../../src/controllers/deleteUrlRecordController'
import { deleteUrlRecord } from '../../src/lib/database'

jest.mock('express')
jest.mock('../../src/lib/database')
jest.mock('../../src/clients/loggerClient')
jest.mock('../../config/config')
jest.mock('mongoose')
jest.mock('../../src/lib/authToken')

const deleteUrlRecordMock = deleteUrlRecord as jest.Mock
const validateTokenMock = validateToken as jest.Mock

const reqObj = {
    get: jest.fn(),
    params: {
        miniUrl: 'wjkhfdhfdajkhdajk'
    }
}

const resObj = {
    status: jest.fn().mockReturnValue({
        send: jest.fn()
    }),
    send: jest.fn()
}

const nextFunctionMock = jest.fn()
const mockUrlDBRecord = {
    originalUrl: 'https://www.google.com/lfsdlkjda',
    miniUrl: 'abdc1',
    hits: 0,
    save: jest.fn()
}

describe('deleteUrlRecordController tests-', function () {
    it('should call deleteUrlRecord lib function', async function () {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        deleteUrlRecordMock.mockResolvedValueOnce(mockUrlDBRecord)
        await deleteUrlRecordController(reqObj as any, resObj as any, nextFunctionMock as any)
        expect(deleteUrlRecordMock).toHaveBeenCalled()
        expect(resObj.status).toHaveBeenCalledWith(200)
    })

    it('should call next function', async function () {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        deleteUrlRecordMock.mockImplementationOnce(() => {
            throw new Error()
        })
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        await deleteUrlRecordController(reqObj as any, resObj as any, nextFunctionMock as any)
        expect(nextFunctionMock).toHaveBeenCalled()

    })


    it('should return status 401 for invalid token', async function () {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockReturnValueOnce(null)
        await deleteUrlRecordController(reqObj as any, resObj as any, nextFunctionMock as any)
        expect(resObj.status).toHaveBeenCalledWith(401)

    })

    it('should return status 400 for missing token', async function () {
        reqObj.get.mockReturnValueOnce(null)
        await deleteUrlRecordController(reqObj as any, resObj as any, nextFunctionMock as any)
        expect(resObj.status).toHaveBeenCalledWith(400)

    })

    it('should return status 404 for Url record not found', async function () {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        await deleteUrlRecordController(reqObj as any, resObj as any, nextFunctionMock as any)
        expect(deleteUrlRecordMock).toHaveBeenCalled()
        expect(resObj.status).toHaveBeenCalledWith(404)

    })

})