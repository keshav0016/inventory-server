'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('vendors', 'landline', {
      type : Sequelize.JSON,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vendors', 'landline')
  }
};
