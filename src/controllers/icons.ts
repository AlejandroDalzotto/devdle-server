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
