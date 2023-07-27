import type { Request, Response } from 'express'
import Icon from '../models/icon'

export const getAllIcons = async (_req: Request, res: Response): Promise<void> => {
  try {
    const icons = await Icon.findAll()
    res.status(200).json(icons)
  } catch (e) {
    res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

export const saveIcon = async (req: Request, res: Response): Promise<void> => {
  const { title, name, url, color, description, type, docs, usage } = req.body

  try {
    const result = await Icon.create({ title, name, url, color, description, icon_type: type, docs, usage })
    res.status(201).json({
      msg: 'Icon submitted to database',
      icon: result
    })
  } catch (error) {
    res.status(400).json({
      msg: (error as Error).message
    })
  }
}
