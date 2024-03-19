import { Router } from 'express'
import { editMiniUrlController } from '../controllers/editMiniUrlController'
import { editMiniUrlSchema } from '../validators/editMiniUrlValidator'
import { validate } from 'express-validation'

const router = Router()

router.put('/url-record',
    validate(editMiniUrlSchema),
    editMiniUrlController)

export default router
