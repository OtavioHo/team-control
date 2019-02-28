module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Matches', {
    date: DataTypes.DATE,
    homeScore: DataTypes.INTEGER,
    awayScore: DataTypes.INTEGER,
    local: DataTypes.STRING,
    training: { type: DataTypes.BOOLEAN, defaultValue: false }
  })

  Match.associate = models => {
    Match.belongsToMany(models.Users, { through: 'ConfirmedMatches' })
  }

  return Match
}
