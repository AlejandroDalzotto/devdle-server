/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { signUpUser, getAllUsers, getUserById, updateUser, addIconDiscovered } from '../controllers/users'
import { validateJWT } from '../middlewares/validate-jwt'

const router = Router()

// Get an array of all users.
router.get('/', validateJWT, getAllUsers)

// Get a single user by his id (JWT Required).
router.get('/:identifier', validateJWT, getUserById)

// Register a new user
router.post('/', signUpUser)

// Update user profile (JWT and User id Required).
router.put('/:identifier', validateJWT, updateUser)

router.put('/', validateJWT, addIconDiscovered)

export default router
