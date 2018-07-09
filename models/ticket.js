'use strict';
module.exports = (sequelize, DataTypes) => {
  var ticket = sequelize.define('ticket', {
    user_id: {type:DataTypes.STRING, foreignKey:true, underscored: true},
    ticket_number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    requested_asset_id: DataTypes.INTEGER,
    requested_asset_item: DataTypes.STRING,
    requested_consumable_id: DataTypes.INTEGER,
    requested_consumable_item: DataTypes.STRING,
    item_type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    department: DataTypes.STRING,
    status: DataTypes.STRING,
    reason: DataTypes.STRING,
    asset_name: DataTypes.STRING
  });
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       ticket.belongsTo(models.users,{foreignKey: 'user_id'})
  //       ticket.belongsTo(models.assets,{foreignKey: 'requested_asset_id'})
  //       ticket.belongsTo(models.consumables,{foreignKey: 'requested_consumable_id'})
  //       ticket.hasMany(models.consumables_assigned)
  //     }
  //   }
  // });
  return ticket;
};