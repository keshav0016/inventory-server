'use strict';
module.exports = (sequelize, DataTypes) => {
  var assets = sequelize.define('assets', {
    asset_id: DataTypes.INTEGER,
    serial_number: DataTypes.STRING,
    asset_name: DataTypes.STRING,
    purchase_date: DataTypes.DATE,
    description: DataTypes.STRING,
    invoice_number: DataTypes.STRING,
    vendor: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    gst: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    current_status: DataTypes.STRING,
    category: DataTypes.STRING,
    condition : DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return assets;
};