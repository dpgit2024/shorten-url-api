import { shortenUrl } from '../../src/lib/shortenUrl'
import { generateMiniUrlId } from '../../src/utils/helpers'
import { createUrlRecord } from '.../../../src/lib/database'

jest.mock('../../src/lib/database')
jest.mock('../../src/utils/helpers')
jest.mock('../../src/clients/loggerClient')

const createUrlRecordMock = createUrlRecord as jest.Mock
const generateMiniUrlIdMock = generateMiniUrlId as jest.Mock

const originalUrlMock = 'https://google.com/hjkhkjh'
const shortUrlIdMock = 'abcd1' 
const createdByMock = 'fakeUser'

describe('shortenUrl lib tests -', function() {
    it('should call generateMiniUrlId', async function() {
        generateMiniUrlIdMock.mockReturnValueOnce(shortUrlIdMock)
        await shortenUrl(originalUrlMock, createdByMock)
        expect(generateMiniUrlIdMock).toHaveBeenCalled()
    })

    it('should call createUrlRecord', async function() {
        generateMiniUrlIdMock.mockReturnValueOnce(shortUrlIdMock)
        await shortenUrl(originalUrlMock, createdByMock)
        expect(createUrlRecordMock).toHaveBeenCalledWith({
            originalUrl: originalUrlMock,
            miniUrl: shortUrlIdMock,
            createdBy: createdByMock
        })
    })

    it('should throw error', async function() {
        generateMiniUrlIdMock.mockReturnValueOnce(shortUrlIdMock)
        createUrlRecordMock.mockImplementationOnce(() => {throw new Error()})
        const originalUrlMock = 'https://google.com/hjkhkjh'
        // const shortUrlIdMock = 'abcd1' 
        expect(async () => {
            await shortenUrl(originalUrlMock, undefined)
        }).rejects.toThrow()
    })

    it('should call createUrlRecord', async function() {
        generateMiniUrlIdMock.mockReturnValueOnce(shortUrlIdMock)
        const miniUrlId = await shortenUrl(originalUrlMock, createdByMock)
        expect(miniUrlId).toBe(shortUrlIdMock)
    })
})