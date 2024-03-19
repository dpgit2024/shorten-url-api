import { Joi } from 'express-validation'

export const getUrlsSchema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    query: Joi.object({
        userName: Joi.string().min(2).max(50).trim().required()
    }).unknown(true)
}
