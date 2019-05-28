'use strict';
module.exports = function(sequelize, DataTypes) {
  var Visitor = sequelize.define('Visitor', {
    employeeId: DataTypes.STRING,
    visitorName: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
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