import { generateMiniUrlId, urlValueValidator } from '../../src/utils/helpers'
import { nanoid } from 'nanoid'
import isUrl from 'is-url'

jest.mock('is-url')
jest.mock('nanoid')

const mockHelperJoi = {
    error: jest.fn()
}

const idMock = 'abcd1'
describe('utils tests -', function() {
    it('generateMiniUrlId - should generate id', async function() {
        nanoid.mockReturnValueOnce(idMock)
       const value = generateMiniUrlId()
       expect(value).toBe(idMock)
    })

    it('urlValueValidator - should  return url as is', async function() {
        isUrl.mockReturnValueOnce(true)
        const value = urlValueValidator({url: 'https://xyz.com'}, mockHelperJoi)
        expect(value).toStrictEqual({url: 'https://xyz.com'})
     })

     it('urlValueValidator - should  call error', async function() {
        isUrl.mockReturnValueOnce(false)
        const value = urlValueValidator({url: 'abc'}, mockHelperJoi)
        expect(mockHelperJoi.error).toHaveBeenCalled()
     })

})