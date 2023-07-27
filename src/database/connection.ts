import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbUser = process.env.DB_USER ?? 'prueba'
const dbPassword = process.env.DB_PASSWORD

const database = new Sequelize('devdle', dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
})

export default database
