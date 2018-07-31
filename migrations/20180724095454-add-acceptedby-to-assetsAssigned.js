'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('assets_assigneds', 'adminName', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('assets_assigneds', 'adminName');
  }
};
