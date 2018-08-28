'use strict';
const argon2 = require('argon2')

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    user_id: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: DataTypes.STRING,
    token: DataTypes.ARRAY(DataTypes.TEXT),
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          alpha: [/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/],
          msg: 'designation should be alphabets'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      unique:true
    },
    disable: {
      type: DataTypes.INTEGER
    },
    first_login: {
      type: DataTypes.INTEGER
    },
    idSerialNo: {
      type: DataTypes.STRING
    }
  }, {
    scopes: {
      withoutPassword: {
        attributes: {
          exclude: ['password']
        }
      }
    },
    classMethods: {
      associate: function (models) {
        users.hasMany(models.ticket, {
          foreignKey: 'user_id',
          sourceKey: 'user_id',
          onDelete: 'cascade',
          hooks: true
        });
        models.ticket.belongsTo(users, {
          foreignKey: 'user_id',
          targetKey: 'user_id',
          onDelete: 'cascade',
          hooks: true
        });
        users.hasMany(models.assets_assigned, {
          foreignKey: 'user_id',
          sourceKey: 'user_id',
          onDelete: 'cascade',
          hooks: true
        })
      }
    }
  });
  users.beforeCreate((user, opts) => {
    return argon2.hash(user.password, {
      type: argon2.argon2d
    }).then(hash => {
      user.password = hash
    })

  });
  users.verifyPassword = function (userSubmittedPassword, user) {
    return argon2.verify(user.password, userSubmittedPassword)
  }

  return users;
};