import { DataTypes } from 'sequelize'
import database from '../database/connection'

const User = database.define('User', {
  name: {
    type: DataTypes.STRING({ length: 18 }),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING({ length: 50 }),
    allowNull: false,
    unique: {
      name: 'email_idx',
      msg: ''
    }
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN(),
    defaultValue: true,
    allowNull: false
  },
  icons: {
    type: DataTypes.ARRAY(DataTypes.STRING()),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'users'
})

export default User
