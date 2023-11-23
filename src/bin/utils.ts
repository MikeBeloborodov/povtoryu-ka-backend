import jwt from "jsonwebtoken";
import express from "express";
import { JWTValidationError } from "../classes/Errors";

require("dotenv").config();

export const sleep = async (timeMS: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMS);
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    return decoded;
  } catch (error) {
    throw new JWTValidationError();
  }
};

export const returnDecodedJWT = (req: express.Request) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
  return decoded;
};

export const addDays = (date: Date, days: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
