import { Sequelize } from "sequelize";
require("dotenv").config();

export const sequelize = new Sequelize(
  "povtoryu-ka",
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_URL,
    dialect: "postgres",
  },
);
