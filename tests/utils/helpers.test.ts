import { generateMiniUrlId } from '../../src/utils/helpers'
import { nanoid } from 'nanoid'

jest.mock('nanoid')

const nanoidMock = nanoid as jest.Mock

const idMock = 'abcd1'
describe('utils tests -', function() {
    it('should call nanoid', async function() {
       nanoid.mockReturnValueOnce(idMock)
       const value = generateMiniUrlId()
       expect(value).toBe(idMock)
    })
})