'use strict';
module.exports = (sequelize, DataTypes) => {
  var ticket = sequelize.define('ticket', {
    user_id: DataTypes.INTEGER,
    ticket_number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    requested_asset_id: DataTypes.INTEGER,
    requested_consumable_id: DataTypes.INTEGER,
    item_type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    department: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ticket.belongsTo(models.users,{foreignKey: 'user_id'})
        ticket.belongsTo(models.assets,{foreignKey: 'requested_asset_id'})
        ticket.belongsTo(models.consumables,{foreignKey: 'requested_consumable_id'})
        ticket.hasMany(models.consumables_assigned)
      }
    }
  });
  return ticket;
};