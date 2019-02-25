module.exports = (sequelize, DataTypes) => {
  const PlayersTeams = sequelize.define('PlayersTeams', {
    fee: { type: DataTypes.INTEGER, defaultValue: 0 },
    goals: { type: DataTypes.INTEGER, defaultValue: 0 },
    presence: { type: DataTypes.INTEGER, defaultValue: 0 },
    assists: { type: DataTypes.INTEGER, defaultValue: 0 },
    yellow_cards: { type: DataTypes.INTEGER, defaultValue: 0 },
    red_cards: { type: DataTypes.INTEGER, defaultValue: 0 }
  })

  return PlayersTeams
}
