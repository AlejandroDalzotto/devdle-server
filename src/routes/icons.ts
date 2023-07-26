/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllIcons } from '../controllers/icons'

const router = Router()

router.get('/', getAllIcons)

export default router
