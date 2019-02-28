const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  User.associate = models => {
    User.belongsToMany(models.Teams, { through: 'PlayersTeams' })
    User.belongsToMany(models.Matches, { through: 'ConfirmedMatches' })
    User.hasMany(models.Incomes, { as: 'Incomes' })
  }

  User.prototype.compareHash = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.generateToken = function ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }

  return User
}
