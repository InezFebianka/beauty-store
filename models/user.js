'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Product)
    }

    static getAllSeller(){
      return User.findAll({
        where: {
          role: 'seller'
        }
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Username can not be null'
        },
        notEmpty:{
          msg: 'Username can not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email can not be null'
        },
        notEmpty:{
          msg: 'Email can not be empty'
        },
        isEmail: {
          msg: 'input is not an email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password can not be null'
        },
        notEmpty:{
          msg: 'password can not be empty'
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'role can not be null'
        },
        notEmpty:{
          msg: 'role can not be empty'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(instance, option){
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(instance.password, salt);

          instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};