'use strict';
module.exports = (sequelize, DataTypes) => {
  var ticket = sequelize.define('ticket', {
    user_id: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    ticket_number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    requested_asset_id: DataTypes.INTEGER,
    requested_asset_item: DataTypes.STRING,
    requested_consumable_id: DataTypes.INTEGER,
    requested_consumable_item: DataTypes.STRING,
    item_type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    department: DataTypes.STRING,
    status: DataTypes.STRING
  });
  return ticket;
};