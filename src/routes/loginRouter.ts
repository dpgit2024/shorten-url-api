import { Router } from 'express'
import { loginController } from '../controllers/loginController'
import { validate } from 'express-validation'
import { loginValidationSchema } from '../validators/loginValidator'
const router = Router()

router.post('/login',
    validate(loginValidationSchema),
    loginController)

export default router
