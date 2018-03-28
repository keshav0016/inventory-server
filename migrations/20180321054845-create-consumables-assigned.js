'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('consumables_assigneds', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      consumable_id: {
        type: Sequelize.INTEGER,
        primaryKey : true
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      ticket_number: {
        type: Sequelize.INTEGER
      },
      assigned_date: {
        type: Sequelize.DATE
      },
      quantity: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('consumables_assigneds');
  }
};