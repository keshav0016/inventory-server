'use strict';
module.exports = (sequelize, DataTypes) => {
  var consumables_assigned = sequelize.define('consumables_assigned', {
    consumable_id: {type:DataTypes.INTEGER, foreignKey:true, underscored:true},
    user_id: {type:DataTypes.STRING, foreignKey:true, underscored:true},
    ticket_number: DataTypes.INTEGER,
    assigned_date: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    adminName: DataTypes.STRING

  },
   {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.users.hasMany(consumables_assigned,{foreignKey: 'user_id', sourceKey: 'user_id',onDelete: 'cascade',hooks: true})
        consumables_assigned.belongsTo(models.users,{foreignKey: 'user_id', targetKey: 'user_id',onDelete: 'cascade',hooks: true})
        models.consumables.hasMany(consumables_assigned,{foreignKey: 'consumable_id',sourceKey: 'consumable_id',onDelete: 'cascade',hooks: true})
        consumables_assigned.belongsTo(models.consumables,{foreignKey: 'consumable_id',targetKey: 'consumable_id',onDelete: 'cascade',hooks: true})
      }
    }
  });
  return consumables_assigned;
};