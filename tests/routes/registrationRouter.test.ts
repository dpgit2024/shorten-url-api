import app from '../../src/app'
import request from 'supertest'
import { createUserRecord } from '../../src/lib/database' 


jest.mock('../../src/clients/loggerClient')
jest.mock('mongoose')
jest.createMockFromModule('../../src/model/userModel')
jest.mock('../../src/lib/database')
// jest.mock('../../src/controllers/registrationController')

const registrationPayload = {
    firstName: 'fakeFirst',
    lastName: 'fakeLast',
    userName: 'fakeUser',
    email:  'fake@fake.com',
    password: 'fakepassA1!',
    confirmPassword: 'fakepassA1!'
}

const createUserRecordMock = createUserRecord as jest.Mock

describe('registrationRouter tests - ',function() {
    afterEach(() => {
        jest.resetAllMocks()
    })
   
    it('should return 200 for body',async function() {
        const res = await request(app).post('/api/v1/registration').set('x-correlation-id', 'fake').set('Accept', 'application/json').send(registrationPayload)
        
        expect(res.statusCode).toBe(200)
        expect(createUserRecordMock).toHaveBeenCalled()
    })
})