import { Router } from 'express'
import { registrationController } from '../controllers/registrationController'
import { validate } from 'express-validation'
import { registrationValidationSchema } from '../validators/registrationValidator'
const router = Router()

router.post('/registration',
        validate(registrationValidationSchema),
        registrationController)

export default router
