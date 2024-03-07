import { Joi } from 'express-validation'

export const urlRecordScema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    query: Joi.object({
        miniUrl: Joi.string().trim().required()
    }).unknown(true)
}
