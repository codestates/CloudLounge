'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin',
        password: 'admin',
        username: '관리자',
        oauth: false,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'kimchulsu@test.com',
        password: '1234',
        username: '김철수',
        oauth: false,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'kimyounghee@test.com',
        password: '5678',
        username: '김영희',
        oauth: false,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
