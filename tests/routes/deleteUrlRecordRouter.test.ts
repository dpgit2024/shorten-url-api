import app from '../../src/app'
import request from 'supertest'


jest.mock('../../src/clients/loggerClient')
jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')
jest.mock('../../src/lib/database')
jest.mock('../../src/controllers/deleteUrlRecordController')

const agent = request(app)



describe('deleteUrlRecordRouter tests - ',function() {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it('should return 400 for invalid params',async function() {
        const res = await agent.delete('/api/v1/url-record/{ab}')
        
        expect(res.statusCode).toBe(400)
    })
})