import type { Request, Response } from 'express'
import User from '../models/user'
import encryptPassword from '../helpers/encrypt-password'
import { getUserPublicData, getUsersPublicData } from '../helpers/clear-user-information'

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Find all users with state true (State false means that the user account was disabled).
    const users = await User.findAll({
      where: {
        state: true
      }
    })

    // Clear user information and return only relevant data.
    const usersWithoutSensitiveInfo = getUsersPublicData(users)
    res.status(200).json(usersWithoutSensitiveInfo)
  } catch (e) {
    res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Gets user id from request params to find them.
    const { identifier } = req.params

    // Find user by his id.
    const user = await User.findByPk(identifier)

    // If user doesn't exist, it return an 404 http code.
    if (user == null) {
      res.status(404).json({
        msg: 'Resource not found'
      })
      return
    }
    // Clear user information and return only relevant data.
    const userWithoutSensitiveInfo = getUserPublicData(user)
    res.status(200).json(userWithoutSensitiveInfo)
  } catch (e: any) {
    res.status(400).json({
      msg: e.message
    })
  }
}

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Gets properties from the request body
    const { name, email, password } = req.body

    // Find an user by his email and with state true (State false means that the user account was disabled).
    const existByEmail = await User.findOne({
      where: {
        email,
        state: true
      }
    })

    // If a user exists, that means the email is already registered in the database and you can't create others like it.
    if (existByEmail !== null) {
      throw new Error('This email is already registered')
    }

    // encrypt password to save it.
    const passwordEncrypted = encryptPassword(password)

    // Save user to database with encrypted password and empty initial icon array.
    const user = await User.create({ name, email, password: passwordEncrypted, icons: [] })

    // Clear user information and return only relevant data.
    const userWithoutSensitiveInfo = getUserPublicData(user)
    res.status(201).json(userWithoutSensitiveInfo)
  } catch (e: any) {
    res.status(400).json({
      msg: e.message
    })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Gets user id from request params to find them.
    const { identifier } = req.params

    // Gets the user data (without id and the state) from request body to update it in the database.
    const { id, state, ...rest } = req.body

    // Use the id to find if the user exist.
    const existById = await User.findByPk(identifier)

    // If not exist throw a Error.
    if (existById === null) {
      throw new Error('User not found')
    }

    // Update user data by id an returns it.
    const [user] = await User.update(rest, {
      where: {
        id: identifier
      }
    })

    res.status(200).json(user)
  } catch (e) {
    res.status(404).json({
      msg: (e as Error).message
    })
  }
}
