import app from '../../src/app'
import request from 'supertest'
import { getUserRecord } from '../../src/lib/database'
import { comparePassword } from '../../src/lib/password'


jest.mock('../../src/clients/loggerClient')
jest.mock('mongoose')
jest.createMockFromModule('../../src/model/userModel')
jest.mock('../../src/lib/database')
jest.mock('../../src/lib/password')


const loginPayload = {
    userName: 'fakeUser',
    password: 'fakepassA1!',
}

const getUserRecordMock = getUserRecord as jest.Mock
const comparePasswordMock = comparePassword as jest.Mock

describe('loginRouter tests - ',function() {
    afterEach(() => {
        jest.resetAllMocks()
    })
   
    it('should return 200 for body',async function() {
        getUserRecordMock.mockResolvedValueOnce(loginPayload)
        comparePasswordMock.mockReturnValueOnce(true)
        const res = await request(app).post('/api/v1/login').set('x-correlation-id', 'fake').set('Accept', 'application/json').send(loginPayload)
        
        expect(res.statusCode).toBe(200)
        expect(getUserRecordMock).toHaveBeenCalled()
    })
})