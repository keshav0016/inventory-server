'use strict';
module.exports = (sequelize, DataTypes) => {
  var vendor = sequelize.define('vendor', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: {type: DataTypes.STRING},
    landline: {type: DataTypes.JSON}
  });
  return vendor;
};