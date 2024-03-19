import { validateToken } from '../../src/lib/authToken'
import { editMiniUrlController } from '../../src/controllers/editMiniUrlController'
import { editMiniUrlRecord } from '../../src/lib/database'

jest.mock('express')
jest.mock('../../src/lib/database')
jest.mock('../../src/clients/loggerClient')
jest.mock('../../config/config')
jest.mock('mongoose')
jest.mock('../../src/lib/authToken')

const editMiniUrlRecordMock = editMiniUrlRecord as jest.Mock
const validateTokenMock = validateToken as jest.Mock

const reqObj = {
    get: jest.fn(),
    body: {
        miniUrl: 'wjkhfdhfdajkhdajk',
        newMiniUrl: 'hjWq' 
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

describe('editMiniUrlController tests-', function() {
    beforeEach(() => {
      
    })

    it('should call editMiniUrlRecord lib function', async function() {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        editMiniUrlRecordMock.mockResolvedValueOnce(mockUrlDBRecord)
        await editMiniUrlController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(editMiniUrlRecordMock).toHaveBeenCalled()
        expect(resObj.status).toHaveBeenCalledWith(200)
    })

    it('should call next function', async function() {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        editMiniUrlRecordMock.mockImplementationOnce(() => {
            throw new Error()
        })
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        await editMiniUrlController(reqObj as any,resObj as any, nextFunctionMock as any) 
        expect(nextFunctionMock).toHaveBeenCalled()

    })


    it('should return status 401 for invalid token', async function() {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockReturnValueOnce(null)
        await editMiniUrlController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(resObj.status).toHaveBeenCalledWith(401)

    })

    it('should return status 400 for missing token', async function() {
        reqObj.get.mockReturnValueOnce(null)
        await editMiniUrlController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(resObj.status).toHaveBeenCalledWith(400)

    })

    it('should return status 400 for miniUrl record issues', async function() {
        reqObj.get.mockReturnValueOnce('Bearer fakeToken')
        validateTokenMock.mockResolvedValueOnce('fakeUser')
        await editMiniUrlController(reqObj as any,resObj as any, nextFunctionMock as any)
        expect(editMiniUrlRecordMock).toHaveBeenCalled()
        expect(resObj.status).toHaveBeenCalledWith(400)

    })
    
})