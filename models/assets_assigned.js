'use strict';
module.exports = (sequelize, DataTypes) => {
  var assets_assigned = sequelize.define('assets_assigned', {
    asset_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    ticket_number: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    expected_recovery: DataTypes.DATE
  });
  // {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       assets_assigned.belongsTo(models.users,{foreignKey: 'user_id'})
  //       assets_assigned.belongsTo(models.assets,{foreignKey: 'asset_id'})
  //       assets_assigned.belongsTo(models.ticket,{foreignKey: 'ticket_number'})
  //     }
  //   }
  // });
  return assets_assigned;
};