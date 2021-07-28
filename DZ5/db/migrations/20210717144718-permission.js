'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      settings_C: {
        type: Sequelize.BOOLEAN
      },
      settings_R: {
        type: Sequelize.BOOLEAN
      },
      settings_U: {
        type: Sequelize.BOOLEAN
      },
      settings_D: {
        type: Sequelize.BOOLEAN
      },
      news_C: {
        type: Sequelize.BOOLEAN
      },
      news_R: {
        type: Sequelize.BOOLEAN
      },
      news_U: {
        type: Sequelize.BOOLEAN
      },
      news_D: {
        type: Sequelize.BOOLEAN
      },
      chat_C: {
        type: Sequelize.BOOLEAN
      },
      chat_R: {
        type: Sequelize.BOOLEAN
      },
      chat_U: {
        type: Sequelize.BOOLEAN
      },
      chat_D: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('permissions');
  }
};