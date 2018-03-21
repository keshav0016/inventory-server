'use strict';
const argon2 = require('argon2')
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    user_id: {type:DataTypes.INTEGER, unique:true, min:5, required:true},
    password: {type:DataTypes.STRING, min:5, max:10, required:true},
    name:{type:DataTypes.STRING},
    role: DataTypes.STRING,
    token: DataTypes.ARRAY(DataTypes.TEXT),
    department: DataTypes.STRING
  
  },{
    classMethods: {
      associate: function(models) {
        users.hasMany(models.assets);
        users.hasMany(models.consumables);
        users.hasMany(models.tickets);
        users.hasMany(models.consumables_purchased);
        users.hasMany(models.consumables_assigned);
        users.hasMany(models.qr);
        users.hasMany(models.asset_repair)
        users.hasMany(models.assets_assigned);
        
      }
    }
  });
  users.beforeCreate((users, opts) => {
   
    return argon2.hash(users.password, {
      type: argon2.argon2d
    }).then(hash => {
      users.password = hash
    })
    
  })
  users.beforeUpdate((users,opts)=>{
    return argon2.hash(users.password, {
      type: argon2.argon2d
    }).then(hash => {
      users.password = hash
    })
  })
  return users;
};