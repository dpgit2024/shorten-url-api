import app from '../../src/app'
import request from 'supertest'


jest.mock('../../src/clients/loggerClient')
jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')
jest.mock('../../src/lib/database')
jest.mock('../../src/controllers/editMiniUrlController')

const agent = request(app)



describe('editMiniUrlRouter tests - ',function() {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it('should return 400 for missing body',async function() {
        const res = await agent.put('/api/v1/url-record')
        
        expect(res.statusCode).toBe(400)
    })
})