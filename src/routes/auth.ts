/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { login, renewJWT } from '../controllers/auth'
import { checkFields, isEmailAndString, isValidPassword, validateFields } from '../middlewares/validate-fields'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', validateJWT, renewJWT)

router.post('/login', [checkFields(['email', 'password']), isEmailAndString(), isValidPassword(), validateFields], login)

export default router
