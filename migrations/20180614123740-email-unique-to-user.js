'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'users',
      ['email'],
      {
        indexName: 'SuperDuperIndex',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex('users', 'SuperDuperIndex')
  }
};
