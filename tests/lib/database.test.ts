import { MiniUrlModel } from '../../src/model/miniUrlModel'
import { UserModel } from '../../src/model/userModel'
import { createUrlRecord, getUrlRecord, createUserRecord } from '../../src/lib/database'
import { hashPassword } from '../../src/lib/password'

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

const mockUserRecord = {
    userName: 'fake',
    email: 'fake@fake.com',
    firstName: 'fake',
    lastName: 'fake',
    password: 'plain'
}

jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')
jest.mock('../../src/lib/password')
jest.mock('bcrypt')

const findOneMock = MiniUrlModel.findOne as jest.Mock
const mockSaveUrl = new MiniUrlModel().save as jest.Mock
const mockHashPassword = hashPassword as jest.Mock
const mockSaveUser = new UserModel().save as jest.Mock


describe('database.ts -', function() {
    beforeEach(() => {
        mockUrlDBRecord.hits = 0
        jest.resetAllMocks()
    })
    describe('createUrlRecord tests -',function() {
        it('should call save', async function() {
            await createUrlRecord(mockUrlRecord)
            expect(mockSaveUrl).toHaveBeenCalled()
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
    describe('createUserRecord tests -', function() {
        it('should call save',async function() {
            mockHashPassword.mockResolvedValueOnce('hashed')
            await createUserRecord(mockUserRecord)
            expect(mockSaveUser).toHaveBeenCalled()
        })
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
})