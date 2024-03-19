import { Joi } from 'express-validation'

export const getUrlsSchema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true)
}
