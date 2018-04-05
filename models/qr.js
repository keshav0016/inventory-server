'use strict';
module.exports = (sequelize, DataTypes) => {
  var qr = sequelize.define('qr', {
    asset_id: DataTypes.INTEGER,
    qr_code_link: DataTypes.STRING
  });
  return qr;
};