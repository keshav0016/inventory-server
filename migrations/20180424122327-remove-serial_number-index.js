'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex(
      'assets',
      'serial_number'
    )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'assets',
      {
        fields: ['serial_number'],
        unique: true
      }
    );
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
