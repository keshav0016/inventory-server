'use strict';
module.exports = (sequelize, DataTypes) => {
  var consumables = sequelize.define('consumables', {
    consumable_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  });
  return consumables;
};