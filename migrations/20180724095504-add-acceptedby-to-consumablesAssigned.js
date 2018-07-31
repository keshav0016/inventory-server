'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('consumables_assigneds', 'adminName', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('consumables_assigneds', 'adminName');
  }
};
