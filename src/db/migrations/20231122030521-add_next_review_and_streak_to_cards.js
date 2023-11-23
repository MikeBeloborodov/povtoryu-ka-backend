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
    await queryInterface.addColumn("WordCards", "nextReview", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("WordCards", "streak", {
      type: Sequelize.INTEGER,
      defaultValue: -1,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("WordCards", "nextReview");
    await queryInterface.removeColumn("WordCards", "streak");
  },
};
