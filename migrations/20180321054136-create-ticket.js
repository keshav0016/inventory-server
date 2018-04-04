'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        foreignKey:true
      },
      ticket_number: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATE
      },
      requested_asset_id: {
        type: Sequelize.INTEGER
      },
      requested_asset_item: {
        type: Sequelize.STRING
      },
      requested_consumable_id: {
        type: Sequelize.INTEGER
      },
      requested_consumable_item: {
        type: Sequelize.STRING
      },
      item_type: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      department: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('tickets');
  }
};