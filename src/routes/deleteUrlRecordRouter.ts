import { Router } from 'express'
import { deleteUrlRecordController } from '../controllers/deleteUrlRecordController'
import { deleteUrlSchema } from '../validators/deleteUrlRecordValidator'
import { validate } from 'express-validation'

const router = Router()

router.delete('/url-record/:miniUrl',
    validate(deleteUrlSchema),
    deleteUrlRecordController)

export default router
