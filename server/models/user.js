'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.comment)
      user.hasMany(models.report)
    }
  }
  user.init(
    {
      email: DataTypes.STRING(30),
      password: DataTypes.STRING(40),
      username: DataTypes.STRING(20),
      oauth: DataTypes.BOOLEAN,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'user',
    }
  )
  return user
}
