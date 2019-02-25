module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Incomes', {
    description: DataTypes.STRING,
    value: DataTypes.FLOAT
  })

  return Income
}
