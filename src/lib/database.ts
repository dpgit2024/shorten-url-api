import { MiniUrlModel } from '../model/miniUrlModel'
import { IUrlRecord } from '../../@types/IUrlRecord'

export const createUrlRecord = async function(record: IUrlRecord) {
    const urlModel = new MiniUrlModel(record)
    await urlModel.save()
}

export const getUrlRecord = async function(attribute = 'miniUrl', value: string) {
    
    const record = await MiniUrlModel.findOne({[attribute]: value})
    if(record) {
        record.hits += 1
        await record.save()
    }
    
    return record
}