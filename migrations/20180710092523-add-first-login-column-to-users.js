'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'first_login', {
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('users', 'first_login');
  }
};