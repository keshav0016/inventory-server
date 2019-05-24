'use strict';
module.exports = function(sequelize, DataTypes) {
  var visit = sequelize.define('visit', {
    visitorId: DataTypes.INTEGER,
    entryTime: DataTypes.DATE,
    exitTime: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return visit;
};