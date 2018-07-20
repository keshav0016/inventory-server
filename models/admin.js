'use strict';
const argon2 = require('argon2')

module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.ARRAY(DataTypes.TEXT),
    firstLogin: DataTypes.INTEGER
  }, {
    scopes: {
      withoutPassword: {
        attributes: {
          exclude: ['password']
        }
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Admin.beforeCreate((user, opts) => {
    return argon2.hash(user.password, {
      type: argon2.argon2d
    }).then(hash => {
      user.password = hash
    })

  });
  Admin.verifyPassword = function (userSubmittedPassword, user) {
    return argon2.verify(user.password, userSubmittedPassword)
  }

  return Admin;
};