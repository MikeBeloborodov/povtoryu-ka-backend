import { validate } from "class-validator";
import { TokenInfo } from "../classes/Token";
import { TokenReqBody } from "../interfaces/Token";
import express from "express";

export const validateTokenBody = async (req: express.Request) => {
  const tokenBody: TokenReqBody = req.body;
  const token = new TokenInfo(tokenBody);
  const validationErrors = await validate(token);
  if (validationErrors.length > 0) throw validationErrors;
  return token;
};
