'use strict';
module.exports = function(sequelize, DataTypes) {
  var visit = sequelize.define('visit', {
    employeeId: DataTypes.STRING,
    visitorId: DataTypes.INTEGER,
    entryTime: DataTypes.DATE,
    exitTime: DataTypes.DATE,
    date:DataTypes.DATE,
    purpose: DataTypes.STRING,
    description: DataTypes.STRING,
    vehicleNumber: DataTypes.STRING,
    approved: {
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return visit;
};