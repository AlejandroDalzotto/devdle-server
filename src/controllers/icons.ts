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

export const getIconByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { icon_name: name } = req.params

    const icon = await Icon.findOne({
      where: {
        name
      }
    })

    if (icon === null) {
      throw new Error('Resource not found')
    }

    res.json({ icon })
  } catch (e) {
    res.status(404).json({
      msg: (e as Error).message
    })
  }
}

export const createIcon = async (req: Request, res: Response): Promise<any> => {
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

export const createIconType = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body

    if (name === undefined || name === null) {
      throw new Error('Type name is required')
    }

    if (typeof name !== 'string') {
      throw new Error('Type name must be string')
    }

    const icon = await Icontypes.findOne({
      where: {
        name
      }
    })

    if (icon !== null) {
      throw new Error('Icon type already exist in the database')
    }

    const result = await Icontypes.create({ name })
    res.status(201).json({
      msg: 'Icon submitted to database',
      icon_type: result
    })
  } catch (error) {
    return res.status(400).json({
      msg: (error as Error).message
    })
  }
}
