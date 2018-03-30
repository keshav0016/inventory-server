'use strict';
module.exports = (sequelize, DataTypes) => {
  var vendor = sequelize.define('vendor', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return vendor;
};