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
    await queryInterface.addColumn("WordCards", "teacherId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Teachers",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("WordCards", "studentId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Students",
        },
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("WordCards", "studentId");
    await queryInterface.removeColumn("WordCards", "teacherId");
  },
};
