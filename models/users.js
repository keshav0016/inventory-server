'use strict';
const argon2 = require('argon2')
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    user_id: {type:DataTypes.INTEGER, unique:true, min:5, required:true, primaryKey: true},
    password: {type:DataTypes.STRING, min:5, max:10, required:true},
    first_name:{type:DataTypes.STRING,  allowNull: false,},
    last_name: {type:DataTypes.STRING,  allowNull: false,},
    age: {type:DataTypes.INTEGER,  allowNull: false,},
    gender: {type:DataTypes.STRING,  allowNull: false,},
    role: DataTypes.STRING,
    token: DataTypes.ARRAY(DataTypes.TEXT),
    department: {type:DataTypes.STRING,  allowNull: false,},
    designation: {type:DataTypes.STRING,  allowNull: false,},
  
  },{
    classMethods: {
      associate: function(models) {
        //users.hasMany(models.assets);
        //users.hasMany(models.consumables);
        // users.hasMany(models.ticket);
        users.hasMany(models.consumables_purchased);
        users.hasMany(models.consumables_assigned);
        users.hasMany(models.qr);
        // users.hasMany(models.assets_repair)
        // users.hasMany(models.assets_assigned);
        
      }
    }
  });


  users.beforeCreate((users, opts) => {
    return argon2.hash(users.password)
    .then(hash => {
      users.password = hash
    })
  })
 
  users.verifyPassword = function(userSubmittedPassword, user){
    return argon2.verify(user.password, userSubmittedPassword)
  }

  return users;
};