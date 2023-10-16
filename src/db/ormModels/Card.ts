import { Sequelize, DataTypes } from "sequelize";
import { sequelize as seq } from "../db";

export const Card = seq.define("Card", {
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
  theme: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
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
});
