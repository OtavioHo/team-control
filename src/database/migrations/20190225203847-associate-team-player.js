'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayersTeams', {
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference: {
          model: 'Users',
          key: 'id'
        }
      },
      TeamId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference: {
          model: 'Teams',
          key: 'id'
        }
      },
      fee: {
        type: Sequelize.INTEGER
      },
      goals: {
        type: Sequelize.INTEGER
      },
      presence: {
        type: Sequelize.INTEGER
      },
      assists: {
        type: Sequelize.INTEGER
      },
      yellow_cards: {
        type: Sequelize.INTEGER
      },
      red_cards: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('PlayersTeams')
  }
}
