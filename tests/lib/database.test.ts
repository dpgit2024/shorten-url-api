import { MiniUrlModel } from '../../src/model/miniUrlModel'

import { createUrlRecord, getUrlRecord } from '../../src/lib/database'

const mockUrlRecord = {
    originalUrl: 'https://www.google.com/lfsdlkjda',
    miniUrl: 'abdc1'
}


jest.mock('../../src/model/miniUrlModel')
jest.mock('mongoose')

const findOneMock = MiniUrlModel.findOne as jest.Mock
describe('database.ts -', function() {
    describe('createUrlRecord tests -',function() {
        it('should call MiniUrlModel constructor', async function() {
            await createUrlRecord(mockUrlRecord)
            expect(MiniUrlModel).toHaveBeenCalled()
        })
    })
    describe('getUrlRecord tests -',function() {
        it('should call findOne function', async function() {
            
            await getUrlRecord('miniUrl', 'abcd1')
            expect(findOneMock).toHaveBeenCalled()
        })

        it('should return null when no record', async function() {
            findOneMock.mockResolvedValueOnce(null)
            const value = await getUrlRecord('miniUrl', 'abcd1')
            expect(value).toBeNull()
        })
    })
})