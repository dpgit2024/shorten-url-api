import { shortenUrlController } from '../../src/controllers/shortenUrlController'
import { shortenUrl } from '../../src/lib/shortenUrl'

jest.mock('express')
jest.mock('../../src/lib/shortenUrl')
jest.mock('../../src/clients/loggerClient')
jest.mock('../../config/config')
jest.mock('mongoose')

const shortenUrlMock = shortenUrl as jest.Mock

const reqObj = {
    body: {
        url: 'https://www.google.com/wjkhfdhfdajkhdajk'
    }
}

const resObj = { 
    status: jest.fn().mockReturnValue({
        send: jest.fn()
    }), 
    send: jest.fn()
}

describe('shortenUrlController tests-', function() {
    it('should call shortenUrl lib function', async function() {
        await shortenUrlController(reqObj as any,resObj as any)
        expect(shortenUrlMock).toHaveBeenCalled()

    })
})