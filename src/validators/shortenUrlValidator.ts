import { Joi } from 'express-validation'
import { urlValueValidator } from '../utils/helpers'

export const shortenUrlScema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    body: Joi.object({
        url: Joi.string().trim().required()
    })
        .custom(urlValueValidator)
}
