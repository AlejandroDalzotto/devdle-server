import type { Request, Response } from 'express'
import Icon, { Icontypes } from '../models/icon'

export const getAllIcons = async (_req: Request, res: Response): Promise<void> => {
  try {
    const icons = await Icon.findAll()
    res.status(200).json(icons)
  } catch (e) {
    res.status(500).json({
      msg: 'Something went wrong, please try again later.'
    })
  }
}

export const saveIcon = async (req: Request, res: Response): Promise<any> => {
  const { title, name, url, color, description, type, docs, usage } = req.body

  try {
    const icon = await Icon.findOne({
      where: {
        name
      }
    })

    if (icon !== null) {
      throw new Error('Icon already exist in the database')
    }

    const isValidType = await Icontypes.findOne({
      where: {
        name: type
      }
    })

    if (isValidType === null) {
      throw new Error('Some properties are not acceptable')
    }

    const result = await Icon.create({ title, name, url, color, description, icon_type: type, docs, usage })
    res.status(201).json({
      msg: 'Icon submitted to database',
      icon: result
    })
  } catch (error) {
    return res.status(400).json({
      msg: (error as Error).message
    })
  }
}
