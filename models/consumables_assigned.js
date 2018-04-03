'use strict';
module.exports = (sequelize, DataTypes) => {
  var consumables_assigned = sequelize.define('consumables_assigned', {
    consumable_id: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    ticket_number: DataTypes.INTEGER,
    assigned_date: DataTypes.DATE,
    quantity: DataTypes.INTEGER
  });
  return consumables_assigned;
};