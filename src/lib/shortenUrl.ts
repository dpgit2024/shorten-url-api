
import { IUrlRecord } from 'IUrlRecord'
import { generateMiniUrlId } from '../utils/helpers'
import { createUrlRecord } from './database'
import { logger } from '../clients/loggerClient'

export const shortenUrl = async function(originalUrl: string): Promise<string> {
    try {
        const miniUrlId = generateMiniUrlId()
        const urlRecord: IUrlRecord = {
            originalUrl: originalUrl,
            miniUrl: miniUrlId
        }
        await createUrlRecord(urlRecord)
        return miniUrlId
    } catch (error) {
        const msg = 'Error in shortenUrl function'
        logger.error(msg, error)
        throw new Error(msg)
    }
    
}
