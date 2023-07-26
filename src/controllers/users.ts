import type { Request, Response } from 'express'
import User from '../models/user'
import encryptPassword from '../helpers/encrypt-password'
import { getUserPublicData, getUsersPublicData } from '../helpers/clear-user-information'

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      where: {
        state: true
      }
    })

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
    const { identifier } = req.params

    const user = await User.findByPk(identifier)

    if (user == null) {
      res.status(404).json({
        msg: 'Resource not found'
      })
      return
    }
    const userWithoutSensitiveInfo = getUserPublicData(user)
    res.status(200).json(userWithoutSensitiveInfo)
  } catch (e: any) {
    res.status(400).json({
      msg: e.message
    })
  }
}

export const saveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body
    const existByEmail = await User.findOne({
      where: {
        email,
        state: true
      }
    })

    if (existByEmail !== null) {
      throw new Error('This email is already registered')
    }

    const passwordEncrypted = encryptPassword(password)
    const user = await User.create({ name, email, password: passwordEncrypted })

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
    const { identifier } = req.params
    const { id, state, ...rest } = req.body

    const existById = await User.findByPk(identifier)

    if (existById === null) {
      throw new Error('User not found')
    }

    const [user] = await User.update(rest, {
      where: {
        id: identifier
      }
    })

    res.status(200).json(user)
  } catch (e: any) {
    res.status(404).json({
      msg: e.message
    })
  }
}
