"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Cards", "word", {
      allowNull: false,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Cards", "partOfSpeech", {
      allowNull: false,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Cards", "partOfSpeechRu", {
      allowNull: false,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Cards", "definition", {
      allowNull: false,
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Cards", "word", {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Cards", "partOfSpeech", {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Cards", "partOfSpeechRu", {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("Cards", "definition", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },
};
