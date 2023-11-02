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
    await queryInterface.addColumn("Students", "specialCode", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("StudentCodes", "nickname", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Students", "specialCode");
    await queryInterface.changeColumn("StudentCodes", "nickname", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
