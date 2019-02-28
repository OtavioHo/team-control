'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Matches', 'homeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Matches', 'homeId')
  }
}
