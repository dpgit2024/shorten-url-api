import { Joi } from 'express-validation'

export const editMiniUrlSchema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    body: Joi.object({
        miniUrl: Joi.string().min(2).max(10).trim().required(),
        newMiniUrl: Joi.string().min(2).max(10).trim().required()
    })
}
