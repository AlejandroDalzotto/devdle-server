/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { saveUser, getAllUsers, getUserById, updateUser } from '../controllers/users'

const router = Router()

router.get('/', getAllUsers)

router.get('/:identifier', getUserById)

router.post('/', saveUser)

router.put('/:identifier', updateUser)

export default router
