'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'assets',
      'assets_serial_number_key'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('assets', ['serial_number'], {
      type: 'unique',
      name: 'assets_serial_number_key'
    })
  }
};
