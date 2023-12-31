import { DataTypes } from "sequelize";
import { sequelize as seq } from "../db";

export const Student = seq.define(
  "Student",
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
    nickname: {
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      teacherScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      studentOwnScope: {
        attributes: {
          exclude: [
            "password",
            "nickname",
            "createdAt",
            "updatedAt",
            "teacherId",
          ],
        },
      },
      withPassword: {
        attributes: {
          include: ["password"],
        },
      },
    },
    hooks: {
      afterCreate: (student, opts) => {
        delete student.dataValues.password;
        delete student.dataValues.specialCode;
      },
    },
  },
);
