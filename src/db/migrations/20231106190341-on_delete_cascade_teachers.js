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
    await queryInterface.changeColumn("Students", "teacherId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Teachers",
        },
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Students", "teacherId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Teachers",
        },
        key: "id",
      },
    });
  },
};
