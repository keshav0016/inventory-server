'use strict';
module.exports = (sequelize, DataTypes) => {
  var assets_assigned = sequelize.define('assets_assigned', {
    asset_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    ticket_number: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    expected_recovery: DataTypes.DATE
  });
  return assets_assigned;
};