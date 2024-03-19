import { Router } from 'express'
import { shortenUrlController } from '../controllers/shortenUrlController'
import { shortenUrlScema } from '../validators/shortenUrlValidator'
import { validate } from 'express-validation'

const router = Router()

router.post('/url-record',
    validate(shortenUrlScema),
    shortenUrlController)

export default router
