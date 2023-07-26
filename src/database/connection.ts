import { Sequelize } from 'sequelize'

const database = new Sequelize('devdle', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export default database
