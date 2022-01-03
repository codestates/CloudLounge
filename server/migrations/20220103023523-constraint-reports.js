'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('reports', {
      fields: ['radioBoxId'],
      type: 'foreign key',
      name: 'fk_reports_radioBoxId',
      references: {
        table: 'radioBox',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    await queryInterface.addConstraint('reports', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_reports_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    await queryInterface.addConstraint('reports', {
      fields: ['loungeId'],
      type: 'foreign key',
      name: 'fk_reports_loungeId',
      references: {
        table: 'lounges',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('reports', 'fk_reports_radioBoxId')
    await queryInterface.removeConstraint('reports', 'fk_reports_userId')
    await queryInterface.removeConstraint('reports', 'fk_reports_loungeId')
  },
}
