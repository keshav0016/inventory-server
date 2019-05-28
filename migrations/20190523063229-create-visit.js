'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('visits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      visitorId: {
        type: Sequelize.INTEGER
      },
      entryTime: {
        type: Sequelize.DATE
      },
      exitTime: {
        type: Sequelize.DATE
      },
      date: {
        type: Sequelize.DATE
      },
      purpose: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      approved: {
        type: Sequelize.BOOLEAN,
      },
      vehicleNumber: {
        type: Sequelize.STRING,
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('visits');
  }
};