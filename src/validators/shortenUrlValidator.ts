import { Joi } from 'express-validation'
import { urlValueValidator } from '../utils/helpers'

export const shortenUrlScema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().max(1000).trim().required()
    }).unknown(true),
    body: Joi.object({
        url: Joi.string().max(1000).trim().required()
    })
        .custom(urlValueValidator)
}
