import app from '../../src/app'
import request from 'supertest'


jest.mock('../../src/clients/loggerClient')
jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')
jest.mock('../../src/lib/database')
jest.mock('../../src/controllers/shortenUrlController')
jest.mock('../../src/')





describe('shortenUrlRecordRouter tests - ',function() {
    afterAll(() => {
        jest.clearAllMocks()
    })
   
    it('should return 400 for body url',async function() {
        const res = await request(app).post('/url-record').set('x-correlation-id', 'fake')
        
        expect(res.statusCode).toBe(400)
    })
})