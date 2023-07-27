/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllIcons, getIconByName, saveIcon } from '../controllers/icons'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', getAllIcons)

router.get('/:icon_name', validateJWT, getIconByName)

router.post('/', validateJWT, saveIcon)

export default router
