const bcrypt = require('bcrypt')

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
    User.belongsToMany(models.Teams, { through: models.PlayersTeams })
    User.hasMany(models.Incomes, { as: 'Incomes' })
  }

  return User
}