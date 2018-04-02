'use strict';
const argon2 = require('argon2')
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    user_id : {type:DataTypes.STRING, required: true, unique: true},
    password: {type:DataTypes.STRING, required:true, },
    first_name:{type:DataTypes.STRING,  allowNull: false, validate: {isAlpha: {msg:'first name should be alphabets' }}},
    last_name: {type:DataTypes.STRING,  allowNull: false, validate: {isAlpha: {msg:'last name should be alphabets' }}},
    age: {type:DataTypes.INTEGER,  allowNull: false, validate: { isInt: true,}},
    gender: {type:DataTypes.STRING,  allowNull: false,},
    role: DataTypes.STRING,
    token: DataTypes.ARRAY(DataTypes.TEXT),
    department: {type:DataTypes.STRING,  allowNull: false, },
    designation: {type:DataTypes.STRING,  allowNull: false,validate: {is: {alpha:[/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/], msg:'designation should be alphabets' }}},
  
  });
  // ,{
  //   classMethods: {
  //     associate: function(models) {
  //       //users.hasMany(models.assets);
  //       //users.hasMany(models.consumables);
  //       // users.hasMany(models.ticket);
  //       users.hasMany(models.consumables_purchased);
  //       users.hasMany(models.consumables_assigned);
  //       users.hasMany(models.qr);
  //       // users.hasMany(models.assets_repair)
  //       // users.hasMany(models.assets_assigned);
        
  //     }
  //   }
  // });
  users.beforeCreate((user, opts) => {
   
    return argon2.hash(user.password, {
      type: argon2.argon2d
    }).then(hash => {
      user.password = hash
    })
    
  })
 
  users.verifyPassword = function(userSubmittedPassword, user){
    return argon2.verify(user.password, userSubmittedPassword)
  }

  return users;
};
