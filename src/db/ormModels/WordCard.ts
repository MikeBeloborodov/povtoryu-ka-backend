import { DataTypes } from "sequelize";
import { sequelize as seq } from "../db";

export const WordCard = seq.define("WordCard", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  partOfSpeech: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  partOfSpeechRu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  audio: {
    type: DataTypes.STRING,
  },
  newCard: {
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
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: "Teachers",
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
});
