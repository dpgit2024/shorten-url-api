import { Router } from 'express'
import { loginController } from '../controllers/loginController'
const router = Router()

router.get('/login',
loginController)

export default router
