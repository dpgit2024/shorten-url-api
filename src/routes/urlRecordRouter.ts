import { Router } from 'express'
import { urlRecordController } from '../controllers/urlRecordController'
import { urlRecordScema } from '../validators/urlRecordValidator'
import { validate } from 'express-validation'

const router = Router()

router.get('/url-record', 
    validate(urlRecordScema),
    urlRecordController)

export default router
