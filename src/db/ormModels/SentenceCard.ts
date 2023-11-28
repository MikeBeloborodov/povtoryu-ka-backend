import { DataTypes } from "sequelize";
import { sequelize as seq } from "../db";
import { Image } from "./Image";

export const SentenceCard = seq.define("SentenceCard", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  sentence: {
    type: DataTypes.STRING,
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
  },
  sentenceTranslation: {
    type: DataTypes.STRING,
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  audio: {
    type: DataTypes.STRING,
  },
  pos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: -1,
  },
  newCard: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nextReview: {
    type: DataTypes.DATE,
  },
});

SentenceCard.hasMany(Image, { foreignKey: "cardId", as: "images" });
Image.belongsTo(SentenceCard, { foreignKey: "cardId" });
