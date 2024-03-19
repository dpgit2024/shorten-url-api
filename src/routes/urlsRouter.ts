import { Router } from 'express'
import { urlsCreatedByUserController } from '../controllers/urlsCreatedByUserController'
import { getUrlsSchema } from '../validators/getUrlsValidator'
import { validate } from 'express-validation'

const router = Router()

router.get('/urls',
    validate(getUrlsSchema),
    urlsCreatedByUserController)

export default router
