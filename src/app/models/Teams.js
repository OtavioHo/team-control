module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Teams', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING
  })

  Team.associate = models => {
    Team.belongsToMany(models.Users, { through: models.PlayersTeams })
    Team.hasMany(models.Payments, { as: 'Payments' })
    Team.hasMany(models.Incomes, { as: 'Incomes' })
  }

  return Team
}