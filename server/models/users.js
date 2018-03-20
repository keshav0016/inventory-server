'use strict';
const argon2 = require('argon2')
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    user_id: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    token: DataTypes.STRING,
    department: DataTypes.STRING
  
  });
  users.beforeCreate((users, opts) => {
   
    return argon2.hash(users.password, {
      type: argon2.argon2d
    }).then(hash => {
      users.password = hash
    })
    
  })
  return users;
};