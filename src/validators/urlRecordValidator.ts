import { Joi } from 'express-validation'

export const urlRecordScema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    query: Joi.object({
        miniUrl: Joi.string().min(2).max(10).trim().required()
    }).unknown(true)
}
