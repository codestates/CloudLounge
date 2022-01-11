'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class lounge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lounge.hasMany(models.comment)
      lounge.hasMany(models.report)
    }
  }
  lounge.init(
    {
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      avgRating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'lounge',
    }
  )
  return lounge
}
