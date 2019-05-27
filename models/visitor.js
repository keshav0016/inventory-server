'use strict';
module.exports = function(sequelize, DataTypes) {
  var Visitor = sequelize.define('Visitor', {
    employeeId: DataTypes.STRING,
    visitorName: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    purpose: DataTypes.STRING,
    description: DataTypes.STRING,
    vehicleNumber: DataTypes.STRING,
    approved: {
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        /**
         * Visitor and Visit -> One to many
         */
        Visitor.hasMany(models.visit, {foreignKey: 'visitorId', sourceKey:'id' });
        models.visit.belongsTo(Visitor, {foreignKey: 'visitorId', targetKey: 'id'});
      }
    }
  });
  return Visitor;
};