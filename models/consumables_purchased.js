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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        consumables_purchased.belongsTo(models.consumables,{foreignKey: 'consumable_id'})
      }
    }
  });
  return consumables_purchased;
};