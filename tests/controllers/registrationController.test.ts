import { createUserRecord } from '../../src/lib/database'
import { registrationController } from '../../src/controllers/registrationController'
import { logger } from '../../src/clients/loggerClient'

jest.mock('../../src/clients/loggerClient')
jest.mock('../../src/lib/database')

const requestObjectMock = {
    body: {
        firstName: 'fakeFirst',
        lastName: 'fakeLast',
        userName: 'fakeUser',
        password: 'fakePass',
        email: 'fake@fake.com'
    }
}

const responseObjectMock = {
    status: jest.fn().mockImplementation(() => {
        return {
            send: jest.fn()
        }
    })
}

const nextFunction = jest.fn()

const logErrorMock = logger.error as jest.Mock
const createUserRecordMock = createUserRecord as jest.Mock
describe('registrationController tests -', function() {
    it('should call createUserRecord',async function() {
       await registrationController(requestObjectMock as any,responseObjectMock as any,  nextFunction as any)
       expect(createUserRecordMock).toHaveBeenCalled()
       expect(responseObjectMock.status).toHaveBeenCalledWith(200)
    })

    it('should handle error',async function() {
        createUserRecordMock.mockImplementationOnce(() => {
            throw new Error()
        })
        await registrationController(requestObjectMock as any,responseObjectMock as any,  nextFunction as any)
        expect(logErrorMock).toHaveBeenCalled()
        expect(nextFunction).toHaveBeenCalled()
     })
})
