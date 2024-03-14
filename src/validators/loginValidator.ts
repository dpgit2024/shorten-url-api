import { Joi } from 'express-validation'

export const loginValidationSchema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    body: Joi.object({
        userName: Joi.string().trim().required(),
        password: Joi.string().trim().required()
    })
}
