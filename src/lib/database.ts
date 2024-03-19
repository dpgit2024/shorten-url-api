import { MiniUrlModel } from '../model/miniUrlModel'
import { IUrlRecord } from '../../@types/IUrlRecord'
import { IUserRecord } from '../../@types/IUserRecord'
import { UserModel } from '../model/userModel'
import { hashPassword } from './password'

export const createUrlRecord = async function (record: IUrlRecord) {
    const urlModel = new MiniUrlModel(record)
    await urlModel.save()
}

export const getUrlRecord = async function (attribute = 'miniUrl', value: string) {

    const record = await MiniUrlModel.findOne({ [attribute]: value })
    if (record) {
        record.hits += 1
        await record.save()
    }

    return record
}

export const createUserRecord = async function (record: IUserRecord) {
    const existingRecord = await UserModel.find({ $or: [{ 'userName': record.userName }, { 'email': record.email }] })
    if (existingRecord?.length) {
        return null
    }
    record.password = await hashPassword(record.password)
    const userModel = new UserModel(record)
    await userModel.save()
    return userModel
}

export const getUserRecord = async function (attribute = 'userName', value: string) {
    const record = await UserModel.findOne({ [attribute]: value })
    if (record) {
        const lastLoginAt = record.lastLoginAt
        record.lastLoginAt = new Date()
        await record.save()
        record.lastLoginAt = lastLoginAt
    }
    return record
}

export const getUrlsCreatedByUsers = async function (createdBy: string) {
    const records = await MiniUrlModel.find({ createdBy: createdBy })
    if (records?.length) {
        return records
    }
    return null
}

export const editMiniUrlRecord = async function (createdBy: string, miniUrl: string, newMiniUrl: string) {
    const record = await MiniUrlModel.findOne({ createdBy: createdBy, miniUrl: miniUrl })
    if (!record) {
        return null
    }
    const checkNewMiniUrlRecord = await MiniUrlModel.findOne({ miniUrl: newMiniUrl })
    if (checkNewMiniUrlRecord) {
        return null
    }
    record.hits = 0
    record.miniUrl = newMiniUrl
    await record.save()
    return record
}
