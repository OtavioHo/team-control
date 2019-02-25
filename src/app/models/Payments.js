module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payments', {
    description: DataTypes.STRING,
    value: DataTypes.FLOAT
  })

  return Payment
}
