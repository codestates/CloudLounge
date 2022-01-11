'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class radioBox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      radioBox.hasMany(models.report)
    }
  }
  radioBox.init(
    {
      states: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'radioBox',
    }
  )
  return radioBox
}
