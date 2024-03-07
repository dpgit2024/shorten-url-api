import { Router } from 'express'
import { urlRecordController } from '../controllers/urlRecordController'
import { urlRecordScema } from '../validators/urlRecordSchema'
import { validate } from 'express-validation'

const router = Router()

router.get('/url-record', 
    validate(urlRecordScema),
    urlRecordController)

export default router
