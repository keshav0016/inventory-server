'use strict';
module.exports = (sequelize, DataTypes) => {
  var type = sequelize.define('type', {
    assetType: {type : DataTypes.STRING, primaryKey : true},
    maxRequest: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        type.hasMany(models.assets, {foreignKey : 'assetType', sourceKey : 'assetType'})
        models.assets.belongsTo(type, {foreignKey : 'assetType', targetKey : 'assetType'})
      }
    }
  });
  return type;
};