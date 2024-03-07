import { Router } from 'express'
import { shortenUrlController } from '../controllers/shortenUrl'
import { shortenUrlScema } from '../schemas/shortenUrlSchema'
import { validate } from 'express-validation'

const router = Router()

router.post('/url-shortener', 
validate(shortenUrlScema),
shortenUrlController)

export default router