import { Joi } from 'express-validation'

export const deleteUrlSchema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    params: Joi.object({
        miniUrl: Joi.string().min(2).max(10).trim().required(),
    })
}
