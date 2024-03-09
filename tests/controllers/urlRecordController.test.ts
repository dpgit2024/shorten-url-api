import { urlRecordController } from '../../src/controllers/urlRecordController'
import { getUrlRecord } from '../../src/lib/database'

jest.mock('express')
jest.mock('../../src/lib/database')
jest.mock('../../src/clients/loggerClient')
jest.mock('../../config/config')
jest.mock('mongoose')

const getUrlRecordMock = getUrlRecord as jest.Mock

const reqObj = {
    query: {
        miniUrl: 'abcd1'
    }
}

const resObj = { 
    status: jest.fn().mockReturnValue({
        send: jest.fn()
    }), 
    send: jest.fn()
}

const mockUrlDBRecord = {
    originalUrl: 'https://www.google.com/lfsdlkjda',
    miniUrl: 'abdc1',
    hits: 0,
    save: jest.fn()
}

describe('urlRecordController tests-', function() {
    it('should call getUrlRecord lib function', async function() {
        await urlRecordController(reqObj as any,resObj as any)
        expect(getUrlRecordMock).toHaveBeenCalled()

    })

    it('should status 404', async function() {
        getUrlRecordMock.mockResolvedValueOnce(null)
        await urlRecordController(reqObj as any,resObj as any)
        expect(resObj.status).toHaveBeenCalledWith(404)

    })

    it('should status 200', async function() {
        getUrlRecordMock.mockResolvedValueOnce(mockUrlDBRecord)
        await urlRecordController(reqObj as any,resObj as any)
        expect(resObj.status).toHaveBeenCalledWith(200)

    })

    it('should throw error', async function() {
        getUrlRecordMock.mockImplementationOnce(() => {
            throw new Error()
        })
        expect(async() => await urlRecordController(reqObj as any,resObj as any)).rejects.toThrow()
    })
})