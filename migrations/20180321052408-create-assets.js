'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      asset_id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        required: true
      },
      serial_number: {
        type: Sequelize.STRING,
        unique: true,
        required: true
      },
      asset_name: {
        type: Sequelize.STRING,
        required: true
      },
      purchase_date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      invoice_number: {
        type: Sequelize.STRING,
        required: true,
        
      },
      vendor: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      gst: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
      },
      current_status: {
        type: Sequelize.STRING
      },
      category: {
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
    return queryInterface.dropTable('assets');
  }
};