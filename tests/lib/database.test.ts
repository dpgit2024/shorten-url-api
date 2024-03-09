import { MiniUrlModel } from '../../src/model/miniUrlModel'

import { createUrlRecord, getUrlRecord } from '../../src/lib/database'

const mockUrlRecord = {
    originalUrl: 'https://www.google.com/lfsdlkjda',
    miniUrl: 'abdc1'
}

const mockUrlDBRecord = {
    originalUrl: 'https://www.google.com/lfsdlkjda',
    miniUrl: 'abdc1',
    hits: 0,
    save: jest.fn()
}

jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')

const findOneMock = MiniUrlModel.findOne as jest.Mock
const mockSave = new MiniUrlModel().save as jest.Mock
describe('database.ts -', function() {
    beforeEach(() => {
        mockUrlDBRecord.hits = 0
        jest.resetAllMocks()
    })
    describe('createUrlRecord tests -',function() {
        it('should call save', async function() {
            await createUrlRecord(mockUrlRecord)
            expect(mockSave).toHaveBeenCalled()
        })
    })
    describe('getUrlRecord tests -',function() {
        it('should call findOne function', async function() {
            findOneMock.mockResolvedValueOnce(mockUrlDBRecord)
            await getUrlRecord('miniUrl', 'abcd1')
            expect(findOneMock).toHaveBeenCalled()
        })

        it('should return null when no record', async function() {
            findOneMock.mockResolvedValueOnce(null)
            const value = await getUrlRecord('miniUrl', 'abcd1')
            expect(value).toBeNull()
        })

        it('should call save/ update hits', async function() {
            const attribute = 'miniUrl'
            const value = 'abcd1'
            findOneMock.mockResolvedValueOnce(mockUrlDBRecord)
            const record = await getUrlRecord(attribute, value)
            expect(findOneMock).toHaveBeenCalledWith({[attribute]: value})
            expect(mockUrlDBRecord.save).toHaveBeenCalled()
            expect(record?.hits).toBe(1)

        })

        it('should call save/ update hits when attribute undefined', async function() {
            const attribute = 'miniUrl'
            const value = 'abcd1'
            findOneMock.mockResolvedValueOnce(mockUrlDBRecord)
            const record = await getUrlRecord(undefined,value)
            expect(findOneMock).toHaveBeenCalledWith({'miniUrl': value})
            expect(mockUrlDBRecord.save).toHaveBeenCalled()
            expect(record?.hits).toBe(1)

        })
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
})