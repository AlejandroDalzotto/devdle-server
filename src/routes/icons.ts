/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllIcons, getIconByName, createIcon, createIconType } from '../controllers/icons'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

router.get('/', getAllIcons)

router.get('/:icon_name', validateJWT, getIconByName)

router.post('/', validateJWT, createIcon)

router.post('/types', validateJWT, createIconType)

export default router
