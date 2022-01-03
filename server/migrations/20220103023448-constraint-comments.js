'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_comments_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    await queryInterface.addConstraint('comments', {
      fields: ['loungeId'],
      type: 'foreign key',
      name: 'fk_comments_loungeId',
      references: {
        table: 'lounges',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('comments', 'fk_comments_userId')
    await queryInterface.removeConstraint('comments', 'fk_comments_loungeId')
  },
}
