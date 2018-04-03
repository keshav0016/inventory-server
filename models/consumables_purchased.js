'use strict';
module.exports = (sequelize, DataTypes) => {
  var consumables_purchased = sequelize.define('consumables_purchased', {
    consumable_id: DataTypes.INTEGER,
    vendor_name: DataTypes.STRING,
    purchase_date: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    item_price: DataTypes.FLOAT,
    whole_price: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    gst: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
  });
  return consumables_purchased;
};