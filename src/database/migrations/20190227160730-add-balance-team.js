'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Teams', 'balance', {
      type: Sequelize.FLOAT
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Teams', 'balance')
  }
}
