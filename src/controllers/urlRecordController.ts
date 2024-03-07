import { Request, Response } from 'express'
import { getUrlRecord } from '../lib/database'
import { logger } from '../clients/loggerClient'

export const urlRecordController = async (req: Request, res: Response) => {
    const urlRecord = await getUrlRecord('miniUrl', req.query.miniUrl as string)
    logger.info(urlRecord)
    if(urlRecord) {
      return  res.status(200).send({
            urlRecord: urlRecord,
            msg: 'Found!'
        })
    }
    return  res.status(404).send({
        msg: 'Record not found!'
    }) 
}
