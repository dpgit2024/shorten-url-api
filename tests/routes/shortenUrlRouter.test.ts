import app from '../../src/app'
import request from 'supertest'


jest.mock('../../src/clients/loggerClient')
jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')
jest.mock('../../src/lib/database')
jest.mock('../../src/controllers/shortenUrlController')
jest.mock('../../src/')

const agent = request(app)



describe('shortenUrlRecordRouter tests - ',function() {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it('should return 400 for body url',async function() {
        const res = await agent.post('/url-shortener')
        
        expect(res.statusCode).toBe(400)
    })
})