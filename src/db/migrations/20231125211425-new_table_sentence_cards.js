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
    await queryInterface.createTable("SentenceCards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sentence: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      word: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      answer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sentenceTranslation: {
        type: Sequelize.STRING,
      },
      definition: {
        type: Sequelize.STRING,
      },
      audio: {
        type: Sequelize.STRING,
      },
      pos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      streak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
      },
      newCard: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      studentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Students",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      teacherId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Teachers",
          },
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      nextReview: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("SentenceCards");
  },
};
