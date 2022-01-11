'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      report.belongsTo(models.user)
      report.belongsTo(models.lounge)
      report.belongsTo(models.radioBox)
    }
  }
  report.init(
    {
      radioBoxId: DataTypes.INTEGER,
      contents: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      loungeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'report',
    }
  )
  return report
}
