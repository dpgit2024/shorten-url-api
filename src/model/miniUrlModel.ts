import { Schema } from 'mongoose'

export const miniUrlSchema = new Schema({
    originalUrl: String,
    miniUrl: String,
    hits: Number,
    createdBy: String
}, { timestamps: true })
