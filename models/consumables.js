'use strict';
module.exports = (sequelize, DataTypes) => {
  var consumables = sequelize.define('consumables', {
    consumable_id: {type : DataTypes.INTEGER, primaryKey : true},
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        consumables.hasMany(models.consumables_assigned)
        consumables.hasMany(models.consumables_purchased)
      }
    }
  });
  return consumables;
};