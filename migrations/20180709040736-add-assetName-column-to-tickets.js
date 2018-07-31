'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tickets', 'asset_name', {
      type : Sequelize.STRING,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tickets', 'asset_name')
  }
};