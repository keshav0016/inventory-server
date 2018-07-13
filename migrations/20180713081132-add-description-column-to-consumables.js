'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('consumables', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('consumables', 'description');
  }
};
