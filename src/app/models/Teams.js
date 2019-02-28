module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Teams', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    balance: { type: DataTypes.FLOAT, defaultValue: 0 }
  })

  Team.associate = models => {
    Team.belongsToMany(models.Users, { through: 'PlayersTeams' })
    Team.hasMany(models.Payments, { as: 'Payments' })
    Team.hasMany(models.Incomes, { as: 'Incomes' })
    Team.hasMany(models.Matches, { as: 'home' })
    Team.hasMany(models.Matches, { as: 'away' })
  }

  return Team
}
