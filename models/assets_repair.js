'use strict';
module.exports = (sequelize, DataTypes) => {
  var assets_repair = sequelize.define('assets_repair', {
    asset_id: DataTypes.INTEGER,
    vendor: DataTypes.STRING,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    expected_delivery: DataTypes.DATE,
    repair_invoice: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    gst: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  });
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       assets_repair.belongsTo(models.assets,{foreignKey: 'asset_id'})
  //     }
  //   }
  // });
  return assets_repair;
};