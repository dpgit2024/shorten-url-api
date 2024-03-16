import { MiniUrlModel } from '../../src/model/miniUrlModel'
import { UserModel } from '../../src/model/userModel'
import { createUrlRecord, getUrlRecord, createUserRecord, getUserRecord } from '../../src/lib/database'
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

const fakeDate = new Date('December 17, 1995 03:24:00')
const mockUserDBRecord = {
    ...mockUserRecord,
    save: jest.fn(),
    lastLoginAt: fakeDate
}

jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')
jest.mock('../../src/lib/password')
jest.mock('bcrypt')

const findOneMock = MiniUrlModel.findOne as jest.Mock
const mockSaveUrl = new MiniUrlModel().save as jest.Mock
const mockHashPassword = hashPassword as jest.Mock
const mockSaveUser = new UserModel().save as jest.Mock
const findOneMockUser = UserModel.findOne as jest.Mock

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
            expect(mockHashPassword).toHaveBeenCalled()
        })
        it('should return null',async function() {
            mockHashPassword.mockResolvedValueOnce('hashed')
            findOneMockUser.mockResolvedValueOnce(mockUserDBRecord)
            const result = await createUserRecord(mockUserRecord)
            expect(mockSaveUser).not.toHaveBeenCalled()
            expect(mockHashPassword).not.toHaveBeenCalled()
            expect(result).toBeNull()
        })
    })
    describe('getUserRecord tests -', function() {
        it('should call findOne function', async function() {
            findOneMockUser.mockResolvedValueOnce(mockUserDBRecord)
            await getUserRecord('userName', 'fake')
            expect(findOneMockUser).toHaveBeenCalled()
        })

        it('should return null when no record', async function() {
            findOneMockUser.mockResolvedValueOnce(null)
            const value = await getUserRecord('userName', 'fake')
            expect(value).toBeNull()
        })

        it('should call save when attribute undefined', async function() {
            const value = 'abcd1'
            findOneMockUser.mockResolvedValueOnce(mockUserDBRecord)
            const record = await getUserRecord(undefined, value)
            expect(findOneMockUser).toHaveBeenCalledWith({'userName': value})
            expect(mockUserDBRecord.save).toHaveBeenCalled()
        })
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
})