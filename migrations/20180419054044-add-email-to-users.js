'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING

      ,validate : {
        isEmail : true
      },
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('users', 'email');
  }
};
