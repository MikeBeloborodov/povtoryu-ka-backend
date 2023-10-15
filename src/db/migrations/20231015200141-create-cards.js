'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      word: {
        type: Sequelize.STRING
      },
      partOfSpeech: {
        type: Sequelize.STRING
      },
      partOfSpeechRu: {
        type: Sequelize.STRING
      },
      theme: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      audio: {
        type: Sequelize.STRING
      },
      definition: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  }
};