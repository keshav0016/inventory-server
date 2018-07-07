'use strict';
module.exports = (sequelize, DataTypes) => {
  var vendor = sequelize.define('vendor', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: {type: DataTypes.STRING, validate: {isNumeric: true,len:[10,10]}},
    landline: {type: DataTypes.JSON}
  });
  return vendor;
};