'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      unique : true
      ,validate : {
        isEmail : true
      },
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('users', 'email');
  }
};
