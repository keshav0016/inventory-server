'use strict';
module.exports = (sequelize, DataTypes) => {
  var consumables_assigned = sequelize.define('consumables_assigned', {
    consumable_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    ticket_number: DataTypes.INTEGER,
    assigned_date: DataTypes.DATE,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        consumables_assigned.belongsTo(models.users,{foreignKey: 'user_id'})
        consumables_assigned.belongsTo(models.ticket,{foreignKey: 'ticket_number'})
        consumables_assigned.belongsTo(models.consumables,{foreignKey: 'consumable_id'})
      }
    }
  });
  return consumables_assigned;
};