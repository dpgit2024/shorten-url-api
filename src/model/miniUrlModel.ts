import { model, Schema } from 'mongoose'

const miniUrlSchema = new Schema({
    originalUrl: String,
    miniUrl: {
        type: String,
        index: true
    },
    hits: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        index: true
    }
}, { timestamps: true })

//In production we do manual indexing
miniUrlSchema.index({ createdBy: 1, miniUrl: 1 })

export const MiniUrlModel = model('urls', miniUrlSchema)