import type { Request, Response } from 'express'
import User from '../models/user'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../helpers/generate-jwt'
import { getUserPublicData } from '../helpers/clear-user-information'
import { CustomRequest } from '../middlewares/validate-jwt'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    // Email exist in db
    const user = await User.findOne({
      where: {
        email,
        state: true
      }
    })

    if (user === null) {
      res.status(404).json({
        msg: 'Email or password field is incorrect or missing'
      })
      return
    }

    // Verify password
    const userPassword = user.get('password') as string
    const isValidPassword = bcryptjs.compareSync(password, userPassword)
    if (!isValidPassword) {
      res.status(400).json({
        msg: 'Email or password field is incorrect or missing'
      })
      return
    }

    // Generate JWT
    const token = await generateJWT(user.get('id'))

    const userWithoutSensitiveInfo = getUserPublicData(user)

    res.json({ user: userWithoutSensitiveInfo, token })
  } catch (e) {
    res.status(500).json({
      msg: '500: Internal server error'
    })
  }
}

export const renewJWT = async (req: CustomRequest, res: Response): Promise<void> => {
  const { user } = req

  if (user === null || user === undefined) {
    res.status(404).json({
      msg: 'Something went wrong, please try again later.'
    })
    return
  }

  // Generate JWT
  const token = await generateJWT(user.get('id'))

  const userWithoutSensitiveInfo = getUserPublicData(user)
  res.json({ user: userWithoutSensitiveInfo, token })
}
