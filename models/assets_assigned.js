'use strict';
module.exports = (sequelize, DataTypes) => {
  var assets_assigned = sequelize.define('assets_assigned', {
    asset_id: {type : DataTypes.INTEGER, foreignKey : true, underscored : true},
    user_id: {type : DataTypes.STRING, foreignKey : true, underscored : true},
    ticket_number: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    expected_recovery: DataTypes.DATE
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.assets.hasMany(assets_assigned, {foreignKey : 'asset_id', sourceKey : 'asset_id',onDelete: 'cascade',hooks: true})
        assets_assigned.belongsTo(models.assets,{foreignKey: 'asset_id', targetKey : 'asset_id',onDelete: 'cascade',hooks: true})
        models.users.hasMany(assets_assigned, {foreignKey : 'user_id', sourceKey : 'user_id',onDelete: 'cascade',hooks: true})
        assets_assigned.belongsTo(models.users,{foreignKey: 'user_id', targetKey : 'user_id',onDelete: 'cascade',hooks: true})
      }
    }
  });
  return assets_assigned;
};