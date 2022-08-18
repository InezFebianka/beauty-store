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
        notNull:true,
        notEmpty:true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty:true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty:true
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty:true
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