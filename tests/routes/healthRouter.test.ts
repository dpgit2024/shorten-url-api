import app from '../../src/app'
import request from 'supertest'
import { healthController } from '../../src/controllers/healthController'

jest.mock('../../src/clients/loggerClient')


const agent = request(app)

describe('healthRouter tests - ',function() {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it('should return 200',async function() {
        const res = await agent.get('/api/v1/health')
        expect(res.statusCode).toBe(200)
    })
})