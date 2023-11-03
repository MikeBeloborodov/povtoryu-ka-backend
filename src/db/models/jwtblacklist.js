'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JWTBlackList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JWTBlackList.init({
    jwt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JWTBlackList',
  });
  return JWTBlackList;
};