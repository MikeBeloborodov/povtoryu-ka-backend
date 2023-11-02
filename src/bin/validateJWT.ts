import express from "express";
import { verifyJWT } from "../bin/utils";
import { JWTValidationError } from "../classes/Errors";

require("dotenv").config();

export const validateJWT = (req: express.Request) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  return verifyJWT(token);
};
