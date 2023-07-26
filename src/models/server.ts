import express, { type Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import userRouter from '../routes/users'
import iconRouter from '../routes/icons'
import authRouter from '../routes/auth'
import database from '../database/connection'

export default class AppServer {
  app: Application
  port: string
  paths

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '8080'

    this.paths = {
      users: '/api/users/',
      auth: '/api/auth/',
      icons: '/api/icons/'
    }

    void this.connectDB()
    this.middlewares()
    this.routes()
  }

  async connectDB (): Promise<void> {
    try {
      await database.authenticate()
      console.log('Connection has been established successfully.')
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  }

  middlewares (): void {
    this.app.use(bodyParser.json())
    this.app.use(cors())
  }

  routes (): void {
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.users, userRouter)
    this.app.use(this.paths.icons, iconRouter)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log('App corriendo en puerto', this.port)
    })
  }
}
