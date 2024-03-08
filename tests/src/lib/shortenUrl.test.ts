import { shortenUrl } from '../../../src/lib/shortenUrl'
import { generateMiniUrlId } from '../../../src/utils/helpers'
import { createUrlRecord } from '.../../../src/lib/database'

jest.mock('.../../../src/lib/database')
jest.mock('../../../src/utils/helpers')

const createUrlRecordMock = createUrlRecord as jest.Mock
const generateMiniUrlIdMock = generateMiniUrlId as jest.Mock

describe('shortenUrl lib tests -', function() {
    it('should call createUrlRecord', async function() {
        const originalUrlMock = 'https://google.com/hjkhkjh'
        const shortUrlIdMock = 'abcd1' 
        generateMiniUrlIdMock.mockReturnValueOnce(shortUrlIdMock)
        await shortenUrl(originalUrlMock)
        expect(createUrlRecordMock).toHaveBeenCalledWith({
            originalUrl: originalUrlMock,
            miniUrl: shortUrlIdMock
        })
    })
})