'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ConfirmedMacthes', {
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference: {
          model: 'Users',
          key: 'id'
        }
      },
      MatchId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference: {
          model: 'Matches',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ConfirmedMatches')
  }
}
