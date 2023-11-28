import { DataTypes } from "sequelize";
import { sequelize as seq } from "../db";

export const SentenceStat = seq.define("SentenceStat", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  cardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: "SentenceCards",
      },
      key: "id",
    },
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: "Students",
      },
      key: "id",
    },
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctAnswer: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
