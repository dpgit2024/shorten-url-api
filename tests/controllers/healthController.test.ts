import { healthController } from '../../src/controllers/healthController'

const reqObj = {
}

const resObj = { 
    status: jest.fn().mockReturnValue({
        send: jest.fn()
    }), 
    send: jest.fn()
}

describe('healthController tests-', function() {
    it('should call status with 200', async function() {
        await healthController(reqObj as any,resObj as any)
        expect(resObj.status).toHaveBeenCalledWith(200)

    })
})