'use strict';
module.exports = (sequelize, DataTypes) => {
  var assets_repair = sequelize.define('assets_repair', {
    asset_id: {type : DataTypes.INTEGER, foreignKey : true, underscored : true},
    vendor: DataTypes.STRING,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    expected_delivery: DataTypes.DATE,
    repair_invoice: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    gst: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.assets.hasMany(assets_repair, {foreignKey : 'asset_id', sourceKey : 'asset_id'})
        assets_repair.belongsTo(models.assets,{foreignKey: 'asset_id', targetKey : 'asset_id'})
      }
    }
  });
  return assets_repair;
};