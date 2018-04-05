'use strict';
module.exports = (sequelize, DataTypes) => {
  var vendor = sequelize.define('vendor', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  });
  return vendor;
};