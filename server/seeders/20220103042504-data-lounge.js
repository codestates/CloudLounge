'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lounges', [
      {
        address: '서울특별시 광진구 능동로 120 (화양동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 능동로 209 (군자동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 긴고랑로 131 (중곡동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 아차산로 567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 광나루로 480 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 자양로 167 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 구의강변로 38 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 능동로 90 (자양동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 동일로 156 (화양동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 동일로 172 (화양동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 동일로 90, 호텔케이월드 (자양동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 워커힐로 177 (광장동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 자양로 18길 26, 4층 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 천호대로 521 (중곡동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 천호대로 560 (능동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 자양로 165, 송곡회관 1층 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 자양로 283 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 광나루로 36길 56 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 자양로 117(자양동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 능동로 120 (화양동, 건국대학교)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        address: '서울특별시 광진구 강변역로 2 (구의동)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lounges', null, {})
  },
}
