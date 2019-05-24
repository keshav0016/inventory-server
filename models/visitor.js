'use strict';
module.exports = function(sequelize, DataTypes) {
  var Visitor = sequelize.define('Visitor', {
    employeeId: DataTypes.INTEGER,
    visitorName: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    purpose: DataTypes.STRING,
    description: DataTypes.STRING,
    approved: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Visitor;
};