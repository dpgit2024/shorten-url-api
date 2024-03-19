import app from '../../src/app'
import request from 'supertest'


jest.mock('../../src/clients/loggerClient')
jest.mock('mongoose')
jest.createMockFromModule('../../src/model/miniUrlModel')
jest.mock('../../src/lib/database')
jest.mock('../../src/controllers/urlsCreatedByUserController')

const agent = request(app)



describe('urlsRouter tests - ', function () {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it('should return 400 for missing query param', async function () {
        const res = await agent.get('/api/v1/urls')

        expect(res.statusCode).toBe(400)
    })
})