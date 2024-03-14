import { MiniUrlModel } from '../model/miniUrlModel'
import { IUrlRecord } from '../../@types/IUrlRecord'
import { IUserRecord } from '../../@types/IUserRecord'
import { UserModel } from '../model/userModel'
import { hashPassword } from './password'

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

export const createUserRecord = async function(record: IUserRecord) {
    record.password = await hashPassword(record.password)
    const userModel = new UserModel(record)
    await userModel.save()
}

export const getUserRecord = async function(attribute = 'userName', value: string) {
    const record = await UserModel.findOne({[attribute]: value})
    if(record) {
        record.lastLoginAt = new Date()
        await record.save()
    }
    return record
}
