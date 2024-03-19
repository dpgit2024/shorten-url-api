import { Joi } from 'express-validation'

export const registrationValidationSchema = {
    headers: Joi.object({
        'x-correlation-id': Joi.string().trim().required()
    }).unknown(true),
    body: Joi.object({
        firstName: Joi.string().alphanum().max(50).trim().required(),
        lastName: Joi.string().trim().alphanum().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().trim().required().min(8).max(20).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().error(new Error('Passwords should match!')),
        userName: Joi.string().alphanum().trim().required().min(4).max(20)
    })
}

