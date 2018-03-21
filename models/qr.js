'use strict';
module.exports = (sequelize, DataTypes) => {
  var qr = sequelize.define('qr', {
    asset_id: DataTypes.STRING,
    qr_code_link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        qr.belongsTo(models.assets,{foreignKey: asset_id})
      }
    }
  });
  return qr;
};