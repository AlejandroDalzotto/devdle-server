import { DataTypes } from 'sequelize'
import database from '../database/connection'

export const Icontypes = database.define('Icontypes', {
  name: {
    primaryKey: true,
    type: DataTypes.STRING({ length: 45 }),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'icontypes'
})

const Icon = database.define('Icon', {
  name: {
    type: DataTypes.STRING({ length: 30 }),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING({ length: 75 }),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING({ length: 7 }),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT(),
    allowNull: false
  },
  icon_type: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  docs: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  usage: {
    type: DataTypes.ARRAY(DataTypes.STRING()),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'icons'
})

Icontypes.hasMany(Icon, {
  foreignKey: 'icon_type'
})
Icon.belongsTo(Icontypes)

export default Icon
