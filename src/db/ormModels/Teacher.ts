import { Sequelize, DataTypes } from "sequelize";
import { sequelize as seq } from "../db";

export const Teacher = seq.define(
  "Teacher",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      withoutPassword: {
        attributes: { exclude: ["password"] },
      },
      withPassword: {
        attributes: { include: ["password"] },
      },
    },
    hooks: {
      afterCreate: (teacher, opts) => {
        delete teacher.dataValues.password;
      },
    },
  },
);
