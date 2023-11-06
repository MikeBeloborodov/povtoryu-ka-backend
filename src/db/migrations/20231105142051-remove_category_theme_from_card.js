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
    await queryInterface.removeColumn("Cards", "category");
    await queryInterface.removeColumn("Cards", "theme");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("Cards", "category", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Cards", "theme", {
      type: Sequelize.STRING,
    });
  },
};
