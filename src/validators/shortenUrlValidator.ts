import { Joi } from 'express-validation'
import isUrl from 'is-url'

export const shortenUrlScema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    body: Joi.object({
        url: Joi.string().trim().required()
    }).custom(function(value: {url: string}, helpers: any) {
        if(!isUrl(value.url)) {
            return helpers.error('any.invalid', { message: 'Invalid URL.'})
        }
        return value
    })
}
